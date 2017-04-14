var net=require('net');

//网络配置
//端口号
var port='22000';
//主机ip
var host='192.168.2.10';
//消息类型
//0x87为客户端发送，简称：87包
//0x84为上位机主机发送，简称：84包
var CommandHead='84';
//ALCC命令
var CommandTag='16';
//终端号
//若终端号为506,则数据为0x30 0x30 0x30 0x30 0x30 0x35 0x30 0x36
var TerminalNumber = '3030303030303030';

var commandType={
  NormalUpDateTask:'',        //常规任务更新
  ForceUpDateTask:'',         //强制任务更新
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
var UpDateTask={         
  Tag:1,        //命令节点
  ID:'',
  commandtype:0,
  PlateNumber:'',
  Material:'',
  TaskQuantity:'',
  Heavy:''        
}
exports.UpDateTask=UpDateTask;
 //PC端软件控制台发送某一节点临时增加计划任务量  -02H 
var SingalNodeAdd={      
  Tag:2,
  ID:'',
  TaskQuantity:''
}
exports.SingalNodeAdd=SingalNodeAdd;
//pc端软件控制台发送请求各个节点的完成数量  -03H
var RequestNodeProduction={
	Tag:3,
	ID:255
};

//PC端软件控制台控制产品线情况 -04H
var ControlProductionLine={
  Tag:4,
  ID:'',
  Oper:''          //0x01开启生产线
                   //0x02关闭生产线，任务结束
                   //0x03暂停生产线，任务不结束  
}
exports.ControlProductionLine=ControlProductionLine;
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
};

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

/// PC端软件控制台发送某一节点任务  -01H 
/// NormalUpDateTask,	//常规任务更新
/// ForceUpDateTask,	//强制任务更新
function CommandUpDateTask(){
	var str='';

	str = syncRanNumber();  //4个字节同步随机数

	str += SeriNum();       //1个字节报文序号

	str +=CurrentTime();    //7个字节系统时间

	str += TerminalNumber;  //8个字节终端号

	//var
	var task=UpDateTask;
	var variable = checkString(task.Tag.toString(16),1);   //1个字节Tagt
	console.log("Tagt:"+checkString(task.Tag.toString(16),1))
	variable += checkString(task.ID.toString(16),1);       //1个字节节点ID
	console.log('节点ID:'+checkString(task.ID.toString(16),1))
	variable+=checkString(task.commandtype.toString(16),1);          //1个字节任务控制类型
	console.log('字节任务控制类型：'+checkString(task.commandtype.toString(16),1))
	var plateNumber=task.PlateNumber.toString();
	variable +=checkString((plateNumber.length/2).toString(16),1);       //1个字节车牌长度
	variable +=plateNumber;                   //车牌号
	console.log('车牌号：'+plateNumber);
	console.log('车牌长度:'+checkString((plateNumber.length/2).toString(16),1));
	var material=task.Material.toString();
	variable+=checkString((material.length/2).toString(16),1);         //1个字节物料长度
	variable+=material;          //物料名
	console.log('物料名：'+material);
	console.log('物料长度:'+checkString((material.length/2).toString(16),1));
	variable+=checkString(task.TaskQuantity.toString(16),4);             //4个字节任务数量
	console.log('任务数量:'+checkString(task.TaskQuantity.toString(16),4))
	variable+=checkString(task.Heavy.toString(16),4);             //4个字节件重
	console.log('件重:'+checkString(task.Heavy.toString(16),4))
	var variableLength=checkString((variable.length/2).toString(16),2);

	var extVar = CommandTag;  //1个字节TAG

	extVar += variableLength;         //2个字节length

	extVar += variable;               //variable

	var extVarLen = checkString((extVar.length/2).toString(16),2);

	str += extVarLen;      //2个字节有效数据长度

	str +=extVar;          //2个字节有效数据

	var crc = checkOut(str);   //校验位	

	str = CommandHead + str + crc;

	var strLen = checkString((str.length/2).toString(16),2);   //报文长度

	str = strLen + str;
	console.log(str);
	return str;
}
exports.CommandUpDateTask=CommandUpDateTask;

//PC端软件控制台发送某一节点临时增加计划任务量  -02H 
exports.CommandSingalNodeAdd=function(){
	var str='';

	str = syncRanNumber();               //四个字节同步随机数

    synRanNumber = SeriNum();
    str += synRanNumber;                //一个字节报文序号

    str += CurrentTime();               //七个字节系统时间

    str += TerminalNumber;              //八个字节终端号

    //variable
    var task=SingalNodeAdd;
    var variable = checkString(task.Tag.toString(16),1);   //1个字节Tagt

    variable += checkString(task.ID.toString(16),1);       //1个字节节点ID

    variable+=checkString(task.TaskQuantity.toString(16),4)  //4个字节增加任务量

    var variableLength=checkString((variable.length/2).toString(16),2);

    var extVar = CommandTag; //1个字节TAG

    extVar += variableLength;    //2个字节length

    extVar += variable;          //variable

    var extVarLen = checkString((extVar.length/2).toString(16),2);

	str += extVarLen;      //2个字节有效数据长度

	str +=extVar;          //2个字节有效数据

	var crc = checkOut(str);   //校验位

	str = CommandHead + str + crc;

	var strLen = checkString((str.length/2).toString(16),2);

	str = strLen + str;
	console.log(str);
	return str;
};


//pc端软件控制台发送请求各个节点的完成数量 -03H
function commandRequestNodeProduction(){
	var str='';

	str = syncRanNumber();  //4个字节同步随机数

	str += SeriNum();       //1个字节报文序号

	str +=CurrentTime();    //7个字节系统时间

	str += TerminalNumber;  //8个字节终端号

	//variable
	var task = RequestNodeProduction;
	var variable = checkString(task.Tag.toString(16),1);   //1个字节Tagt

	variable += checkString(task.ID.toString(16),1);       //1个字节节点ID

	var variableLength=checkString((variable.length/2).toString(16),2);

	var extVar = CommandTag;  //1个字节TAG

	extVar += variableLength;         //2个字节length

	extVar += variable;               //variable

	var extVarLen = checkString((extVar.length/2).toString(16),2);

	str += extVarLen;      //2个字节有效数据长度

	str +=extVar;          //2个字节有效数据

	var crc = checkOut(str);   //校验位

	str = CommandHead + str + crc;

	var strLen = checkString((str.length/2).toString(16),2);

	str = strLen + str;

	return str;
};

exports.commandRequestNodeProduction=commandRequestNodeProduction;

//PC端软件控制台控制产品线情况  -04H 
exports.CommandControlProductionLine=function(){
	var str='';

	str = syncRanNumber();  //4个字节同步随机数

	str += SeriNum();       //1个字节报文序号

	str +=CurrentTime();    //7个字节系统时间

	str += TerminalNumber;  //8个字节终端号

	//variable
	var task=ControlProductionLine;
	var variable = checkString(task.Tag.toString(16),1);   //1个字节Tagt

	variable += checkString(task.ID.toString(16),1);       //1个字节节点ID

	variable += checkString(task.Oper.toString(16),1);     //一个字节任务控制类型
	console.log("任务控制类型："+checkString(task.Oper.toString(16),1));
    var variableLength=checkString((variable.length/2).toString(16),2);

    var extVar = CommandTag; //1个字节TAG

    extVar += variableLength;    //2个字节length

    extVar += variable;          //variable

    var extVarLen = checkString((extVar.length/2).toString(16),2);

	str += extVarLen;      //2个字节有效数据长度

	str +=extVar;          //2个字节有效数据

	var crc = checkOut(str);   //校验位

	str = CommandHead + str + crc;

	var strLen = checkString((str.length/2).toString(16),2);

	str = strLen + str;
	console.log(str);
	return str;
}