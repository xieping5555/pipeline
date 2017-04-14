 var net=require('net');
//端口号
var port='22000';
//主机
var host='192.168.2.10';
//消息类型
//0x87为客户端发送,简称：87包
//0x84为主机发送,  简称:84包
var CommandHead = '84';

//ALCC命令
var CommandTag = '16';

//终端号
//若终端号为506,则数据为0x30 0x30 0x30 0x30 0x30 0x35 0x30 0x36
var TerminalNumber = '3030303030303030';

//同步随机数
var syncRanNumber;

var commandType={
  NormalUpDataTask:'',        //常规任务更新
  ForceUpDataTask:'',         //强制任务更新
  SingalNodeAddScheduledProduction:'',      //单个节点增加任务产量
  RequestNodeProduction:'',       //请求单个节点完成数量
  RequestAllNodeProduction:'',    //请求所有节点完成数量
  OpenProductionLine:'',          //开启生产线
  ShutDownProductionLine:'',      //关闭生产线，任务结束
  SuspendProductionLine:'',       //暂停生产线，任务不结束
  WorkerShift:'',                 //工人换班
  UpdataNodeTime:''               //更新节点时间
};

/*命令包内容*/

//PC端软件控制台发送某一节点任务  -01H 
var UpDataTask={         
  Tag:'',        //命令节点
  ID:'',
  commandType:'',
  PlateNumber:'',
  Materiel:'',
  TaskQuantity:'',
  Heavy:''        
}

 //PC端软件控制台发送某一节点临时增加计划任务量  -02H 
var SingalNodeAdd={      
  Tag:'',
  ID:'',
  TaskQuantity:''
}

//pc端软件控制台发送请求各个节点的完成数量  -03H
var RequestNodeProduction={
	Tag:3,
	ID:3
};

//PC端软件控制台控制产品线情况 -04H
var ControlProductionLine={
  Tag:'',
  ID:'',
  Oper:''          //0x01开启生产线
                   //0x02关闭生产线，任务结束
                   //0x03暂停生产线，任务不结束  
}

//PC端软件控制台发送某一节点进行换班  -05H 
var WorkerShiftSchedule={
  Tag:'',
  ID:'',
  SerNumber:'',     //班次编号
  WorkerNumber:'',  //工人编号
  WorkerName:''     //工人姓名
} 

//PC端软件控制台更新所有节点时间  -06H 
var UpdateNodeTime={
  Tag:'',
  ID:''
}
//连接服务器
var socket=new net.Socket();
socket.connect(port,host,function(){
	//连接成功
  console.log('连接成功');
  socket.write(toBuffer());
  socket.on('data',function(data){
    var parseData=data.toString('hex');
    process.on('exit',function(){
      console.log('>>'+new Date().toLocaleString()+'\b'+'进程退出');
    })
    parseMessage(parseData);
  })
});
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
}
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

  var dataTag=data.substr(0,2);   //?
  var dataID;
  if(data.length>=4){
    dataID=data.substr(2,2);
  }else{
    return;
  }
  var coreData;
  if(data.length>6){
    coreData=data.substr(4,dataLen*2-4);
  }else{
    return;
  }

  status = coreData;
  var ID=status.substr(0,2);   //ID
  var nodeStatus=status.substr(2,2);  //表示当前节点状态
                                      //00：表示无任务
                                      //01：表示产线正在完成
                                      //02：表示产线已经完成
  var sensorStatus=status.substr(4,2);   //传感器状态
                                         //0：主/备：OK
                                         //1:主-OK,备-NO
                                         //2：主-NO,备-OK
                                         //3：主-NO,备-NO
  var lineTask=parseInt(status.substr(6,8),16);  //产线任务量
  var lineDone=parseInt(status.substr(14,8),16); //产线完成数量(正在生产的数量)
  var totalLine=parseInt(status.substr(22,8),16); //产线完成总量
  var addLine=parseInt(status.substr(30,8),16);   //由产线节点发起的加包数量
  var time=status.substr(38,14);                  //任务时间
  console.log("ID:"+ID+"\n"+'节点状态:'+nodeStatus+"\n"+"传感器状态:"+sensorStatus+"\n"+
              "产线任务量:"+lineTask+"\n"+"产线完成数量:"+lineDone+"\n"+"产线完成总量"+totalLine+"\n"
            +"由节点发起的加包数量:"+addLine+"\n"+"任务时间:"+time);
}

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
    console.log(hex);
    return hex;
};


//补0函数
function addZero(i){
    var arr = new Array();
    for(var j=0;j<i;j++){
        arr[j]=0;
    };
    var str=arr.join('');
    return str;
};
//生成4个字节的同步随机数
syncRanNumber=function(){
	var hex=0;
	var addLen=0;
	hex=Math.ceil(Math.random()*1000000000).toString(16);
	if(hex.length < 8){
		addLen = 8-hex.length;
	};
	hex=addZero(addLen)+hex;
	return hex;
};

//生成报文序号
var SeriNum=function(){
	var str='';
	str= '11';
	return str;
}

//获取当前系统时间
function CurrentTime(){
	var time='';
	date=new Date();
	time =date.getFullYear()+(date.getMonth()+1>9?date.getMonth()+1:"0"+(date.getMonth()+1))+(date.getDate()>9?date.getDate():"0"+(date.getDate()))+
			(date.getHours()>9?date.getHours():"0"+(date.getHours()))+(date.getMinutes()>9?date.getMinutes():"0"+(date.getMinutes()))+(date.getSeconds()>9?date.getSeconds():"0"+(date.getSeconds()));
	return time;
}

//检查数据长度
function checkString(str,i){
	str = str.toString();
	if(str.length > i*2){
		str = str.substr(0,i*2);
	};
	if(str.length < i*2){
		str = addZero(i*2 - str.length) + str;
	}
	return str;
}


//pc端软件控制台发送请求各个节点的完成数量 -03H
function commandRequestNodeProduction(){
	var str='';

	str = syncRanNumber();  //4个字节同步随机数
  console.log("随机数:"+str);
	str += SeriNum();       //1个字节报文序号
  console.log("报文序号："+SeriNum());
	str +=CurrentTime();    //7个字节系统时间
  console.log("系统时间："+CurrentTime());
	str += TerminalNumber;  //8个字节终端号
  console.log("终端号:"+TerminalNumber)
	//variable
	var task = RequestNodeProduction;
	var variable = checkString(task.Tag.toString(16),1);   //1个字节Tagt
  console.log("Tagt:"+variable)
	variable += checkString(task.ID.toString(16),1);       //1个字节节点ID
  console.log("节点ID:"+task.ID);
	var variableLength=checkString((variable.length/2).toString(16),2);

	var extVar = CommandTag;  //1个字节TAG
  console.log("T:"+extVar);
	extVar += variableLength;         //2个字节length
  console.log("L:"+variableLength)
	extVar += variable;               //variable
  console.log("v:"+variable);
  console.log(extVar.length);
	var extVarLen = checkString((extVar.length/2).toString(16),2);

	str += extVarLen;      //2个字节有效数据长度
  console.log('有效数据长度'+extVarLen)
	str +=extVar;          //2个字节有效数据
  console.log('有效数据'+extVar);
	var crc = checkOut(str);   //校验位
  console.log('校验位：'+crc);
	str = CommandHead + str + crc;

	var strLen = checkString((str.length/2).toString(16),2);
  console.log('报文长度：'+strLen);
	str = strLen + str;

	return str;
};

//转成buffer
function toBuffer(){
	var strSendData = commandRequestNodeProduction();
  console.log(strSendData);
  var dataLength=strSendData.length/2;
  var offset=0;
  var buf=Buffer.alloc(dataLength);
  for(var i=0;i<dataLength;i++){
    var str=strSendData.substr(offset,2);
    buf.write(str,i,1,'hex');
    offset+=2;
  }
  console.log(buf);
  return buf;
};
