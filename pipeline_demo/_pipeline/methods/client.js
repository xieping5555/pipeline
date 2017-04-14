var net=require('net');
var pipelineController=require('./pipelineController.js');
//网络配置
//端口
var port='22000';
//主机ip
var host='192.168.2.10';

//转成buffer
function toBuffer(sendData){
  var strSendData = sendData;
  var dataLength=strSendData.length/2;
  var offset=0;
  var buf=Buffer.alloc(dataLength);
  for(var i=0;i<dataLength;i++){
    var str=strSendData.substr(offset,2);
    buf.write(str,i,1,'hex');
    offset+=2;
  }
  return buf;
};
//校验位
var checkOut=function(data){
    if(data == null || data == ''){
        return '';
    };
    var total = 0;
    var len = data.length;
    var num = 0;
    while(num < len ){
        var s = data.substr(num,2);
        var m=parseInt(s,16);
        total += m;  //此时的total是十进制
        num+=2;
    };
    //用256取余最大是255，即16进制的FF
    var mod=total % 256;
    var hex = mod.toString(16);
    len = hex.length;
    if(len < 2){
        hex = '0' + hex;
    };
    return hex;
};
//验证返回值
function checkMessage(message){
    var messageLen=parseInt(message.substr(0,4),16);
    var date= new Date();
    if(messageLen == message.length/2-2){
      var crc = checkOut(message.substr(6,message.length-8));  //校验位
      if(crc = message.substr(message.length-2,2)){
        return true;
      }
      console.log('>>'+date.toLocaleString() + '返回的数据校验位有错误');
      return false;
    }else{
      console.log('>>'+date.toLocaleString() + '返回的数据长度有错误');
      return false;
    }
};
//处理返回值
function parseMessage(message){
  if(checkMessage(message) == false){
    return ;
  };
  var status;
  //00正常，收发响应正常
  //01发送ID节点没有响应，可能节点没有上电，节点不在线
  //02表示有节点ID重复，需要重新设置分配ID
  //03表示当前节点正在生产，有任务
  //04表示此命令暂不支持
  console.log('返回的报文：'+message);
  var messageLen=parseInt(message.substr(0,4),16);  //报文长度
  var messageTag=message.substr(4,2);               //87：消息类型
  var syncRanNum=message.substr(6,8);               //同步随机数
  var seriNum=message.substr(14,2);                 //报文序号
  var verNum=message.substr(16,12);                 //版本号
  var deviceNum=message.substr(28,16);                     //设备号
  var varLen=parseInt(message.substr(44,4),16);     //var长度
  var tag=message.substr(48,2);                     //16
  var dataLen=parseInt(message.substr(50,4),16);    //数据域长度
  var data=message.substr(54,dataLen*2);            //数据
  var crc=message.substr(message.length-2,2);       //校验位
  var dataTag=data.substr(0,2);   //返回的命令方式
  var nodeNum=data.substr(2,2);  //返回的节点模板数量
  console.log('节点模板数量：'+nodeNum);
  var templateData=data.substr(4,52*Number(nodeNum));   //取出所有节点模板数据
  // var dataID;
  // if(data.length>=4){
  //   dataID=data.substr(2,2);
  // }else{
  //   return;
  // }
  // var coreData;
  // if(data.length>6){
  //   coreData=data.substr(4,dataLen*2-4);
  // }else{
  //   return;
  // }

  // status = coreData;
  var dataArr=[];   //数据的字符串形式数组
  for(var i=0;i<Number(nodeNum);i++){
    dataArr.push(templateData.substr(i*52,52));
  };
  var dataArr1=[];  //数据的对象属性数组
  dataArr.forEach(function(item,index,array){
    var ID=item.substr(0,2);
    var nodeStatus=item.substr(2,2);
    var sensorStatus=item.substr(4,2);
    var lineTask=parseInt(item.substr(6,8),16);
    var lineDone=parseInt(item.substr(14,8),16);
    var totalLine=parseInt(item.substr(22,8),16);
    var addLine=parseInt(item.substr(30,8),16);
    var time=item.substr(38,14); 
    dataArr1.push({
      "ID":ID,
      "nodeStatus":nodeStatus,
      "sensorStatus":sensorStatus,
      "lineTask":lineTask,
      "lineDone":lineDone,
      "totalLine":totalLine,
      "addLine":addLine,
      "time":time
    })
  })
  console.log(dataArr1);
  return dataArr1;
  //console.log(dataArr);
  // var ID=status.substr(0,2);   //ID
  // var nodeStatus=status.substr(2,2);  //表示当前节点状态
  //                                     //00：表示无任务
  //                                     //01：表示产线正在完成
  //                                     //02：表示产线已经完成
  // var sensorStatus=status.substr(4,2);   //传感器状态
  //                                        //0：主/备：OK
  //                                        //1:主-OK,备-NO
  //                                        //2：主-NO,备-OK
  //                                        //3：主-NO,备-NO
  // var lineTask=parseInt(status.substr(6,8),16);  //产线任务量
  // var lineDone=parseInt(status.substr(14,8),16); //产线完成数量(正在生产的数量)
  // var totalLine=parseInt(status.substr(22,8),16); //产线完成总量
  // var addLine=parseInt(status.substr(30,8),16);   //由产线节点发起的加包数量
  // var time=status.substr(38,14);                  //任务时间
  // return {
  //     'ID':ID,
  //     'nodeStatus':nodeStatus,
  //     'sensorStatus':sensorStatus,
  //     'lineTask':lineTask,
  //     'lineDone':lineDone,
  //     'totalLine':totalLine,
  //     'addLine':addLine,
  //     'time':time
  // }
}
var socket = new net.Socket();
socket.connect(port,host,function(){
    var sendData=toBuffer(pipelineController.commandRequestNodeProduction());
    socket.write(sendData);
    socket.on('data',function(data){
         var parseData=data.toString('hex');
         var returnData=parseMessage(parseData);
         process.send(returnData);
    })
})