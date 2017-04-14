var net=require('net');
var pipelineController=require('../methods/pipelineController.js');

//网络配置
//端口号
var port='22000';
//主机ip
var host='192.168.2.10';
//命令类型
var commandType={
  NormalUpDateTask:'NormalUpDateTask',        //常规任务更新
  ForceUpDateTask:'ForceUpDateTask',         //强制任务更新
  SingalNodeAddScheduledProduction:'SingalNodeAddScheduledProduction',      //单个节点增加任务产量
  RequestNodeProduction:'RequestNodeProduction',       //请求单个节点完成数量
  RequestAllNodeProduction:'RequestAllNodeProduction',    //请求所有节点完成数量
  OpenProductionLine:'OpenProductionLine',          //开启生产线
  ShutDownProductionLine:'ShutDownProductionLine',      //关闭生产线，任务结束
  SuspendProductionLine:'SuspendProductionLine',       //暂停生产线，任务不结束
  WorkerShift:'WorkerShift',                 //工人换班
  UpdataNodeTime:'UpdataNodeTime'               //更新节点时间
};
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
    //console.log(hex);
    return hex;
};

var socket=new net.Socket();
var commandTypeVariable={
  commandType:''
};  //定义一个命令类型变量,通过命令类型变量来确定要执行那个命令
exports.commandTypeVariable=commandTypeVariable;
exports.commandFun=function(){
  	socket.connect(port,host,function(){
		//判断命令类型
		switch(commandTypeVariable.commandType)
		{
			case commandType.NormalUpDateTask:
				var sendData=toBuffer(pipelineController.CommandUpDateTask());
				socket.write(sendData);
        socket.on('data',function(data){
            console.log(data.toString('hex'));
        });
        break;
      case commandType.ForceUpDateTask:
        var sendData=toBuffer(pipelineController.CommandUpDateTask());
        socket.write(sendData);
        socket.on('data',function(data){
            console.log(data.toString('hex'));
        });
        break;
      case commandType.SingalNodeAddScheduledProduction:
        var sendData=toBuffer(pipelineController.CommandSingalNodeAdd());
        socket.write(sendData);
        socket.on('data',function(data){
          console.log(data.toString('hex'));
        });
        break;
      case commandType.OpenProductionLine:
        var sendData=toBuffer(pipelineController.CommandControlProductionLine());
        socket.write(sendData);
        socket.on('data',function(data){
          console.log(data.toString('hex'));
        });
        break;
      case commandType.ShutDownProductionLine:
        var sendData=toBuffer(pipelineController.CommandControlProductionLine());
        socket.write(sendData);
        socket.on('data',function(data){
          console.log(data.toString('hex'));
        });
        break;
      case commandType.SuspendProductionLine:
        var sendData=toBuffer(pipelineController.CommandControlProductionLine());
        socket.write(sendData);
        socket.on('data',function(data){
          console.log(data.toString('hex'));
        });
        break;
		}
	})
}