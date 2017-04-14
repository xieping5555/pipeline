var app=require('express')();
var server=require('http').Server(app);
var io=require('socket.io')(server);
var router=require('./routes/router.js');
var cp=require('child_process');
var command=require('./routes/command.js');
var pipelineController=require('./methods/pipelineController.js');
var gb2312 = require("encode-gb2312");
var cookieParser=require('cookie-parser');


//CORS跨域请求处理
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
}); 

//使用cookie中间件
app.use(cookieParser());
//使用session中间件

app.post('/put',router.do_put);
app.get('/showPutInfo',router.showPutInfo);
app.post('/submitChange',router.changeInfo);
app.get('/deleteInfo',router.deleteInfo);
app.get('/get_oriangal_data',router.getOriangalData); //得到每个库中的原始数据;
app.get('/increase',router.oriangalIncrease);//原始数据增加
app.get('/decrease',router.oriangaldecrease);//原始数据减少
//出库
app.post('/outData',router.do_out);  //提交出库数据
app.get('/showOutInfo',router.showOutInfo);  //显示出库数据
app.post('/outInfoChange',router.changeOutInfo); //修改出库数据

//装车
app.post('/sale_submit',router.sale_submit);  //提交装车数据
app.get('/showSaleInfo',router.showSaleInfo);  //显示装车数据
app.post('/saleInfoChange',router.saleInfoChange); //修改装车数据

//兑车
app.post('/carpush_data',router.carpush_data); //提交兑车数据
app.get('/showTruckInfo',router.showTruckInfo); //显示兑车数据
app.post('/truckInfoChange',router.truckInfoChange); //修改兑车数据

//回填
app.post('/backData',router.submitBackData); //提交回填数据
app.get('/showBackInfo',router.showBackInfo); //显示回填数据
app.post('/backInfoChange',router.backInfoChange); //修改回填数据

//根据日期返回当天的入库数据
app.get('/warehouse_dateInfo',router.showWarehouse_dateInfo);
//根据日期返回当天的出库数据
app.get('/out_dateInfo',router.showOut_dateInfo);
//根据日期返回当天的装车数据
app.get('/sale_dateInfo',router.showSale_dateInfo);
//根据日期返回当天的兑车数据
app.get('/carpush_dateInfo',router.showCarpush_dateInfo);
//根据日期返回当天的回填数据
app.get('/back_dateInfo',router.showBack_dateInfo);

//获取调度表所需要的信息
app.get('/getPutInfo',router.getPutInfo);
app.get('/getOutInfo',router.getOutInfo);
app.get('/getSaleInfo',router.getSaleInfo);
app.get('/getTruckInfo',router.getTruckInfo);
app.get('/getBackInfo',router.getBackInfo);

//提交换班信息
app.post('/submitShiftInfo',router.submitShiftInfo);
//获得当前班次信息
app.get('/getShiftInfo',router.getShiftInfo);
//验证登陆
app.post('/checkLogin',router.checkLogin);
//装车状态信息改变
app.get('/fillingStatusChange',router.fillingStatusChange);
//兑车状态信息改变
app.get('/truckFillingStatusChange',router.truckFillingStatusChange);
//提交待办事项信息
app.post('/submitIssue',router.submitIssue);
//获取待办事项信息
app.get('/getBacklog',router.getBacklog);
//清空待办事项
app.get('/clearBacklog',router.clearBacklog);
//获取库位和仓位信息
app.get('/getwarehouseData',router.getwarehouseData);
//获取物料信息
app.get('/getmaterialData',router.getmaterialData);
//获取班组信息
app.get('/getcrewData',router.getcrewData);
//新增库位
app.post('/warehouseAdd',router.warehouseAdd);
//修改库位信息
app.get('/warehouseChangeInput',router.warehouseChangeInput);
//删除一个库位
app.get('/warehouseInfoDelete',router.warehouseInfoDelete);
//给一个库增加仓位
app.get('/storehouseAdd',router.storehouseAdd);
//修改仓名
app.get('/storehouseChange',router.storehouseChange);
//删除一个仓
app.get('/storehouseDelete',router.storehouseDelete);
//新增一个物料
app.get('/materialAdd',router.materialAdd);
//修改物料名
app.get('/materialChange',router.materialChange);
//删除一条物料数据
app.get('/materialDelete',router.materialDelete);
//新增一个班次
app.get('/classesAdd',router.classesAdd);
//修改班次名
app.get('/classesChange',router.classesChange);
//删除一个班次
app.get('/classesDelete',router.classesDelete);
//增加一个组
app.get('/groupAdd',router.groupAdd);
//修改一个组名
app.get('/groupChange',router.groupChange);
// //删除一个组
app.get('/groupDelete',router.groupDelete);
var returnData={};    //-03H命令返回的数据
setInterval(function(){
  var child=cp.fork(__dirname+'/methods/client.js');
  child.on('message',function(m){
    returnData=m;
  });
},3000);
var commandFun=command.commandFun;   //命令函数
io.on('connection',function(socket){
	var commandTypeVariable=command.commandTypeVariable;

	//几秒一次接受最新的流水线各个节点的情况
    setInterval(function(){
    	socket.emit('returnData',returnData);
    },3000);

    //发送任务命令-01H
	socket.on('UpdateTask',function(data){    
		var task=pipelineController.UpDateTask;
		if(data.force == 'false'){         //检查命令模式
			commandTypeVariable.commandType = 'NormalUpDateTask';
			task.commandtype=00;    //普通下发命令，如果有任务正在执行则下发失败
		}else{
			commandTypeVariable.commandType = 'ForceUpDateTask';
			task.commandtype=01;	//强制下发命令，不管有没有任务都重新执行
		}
		task.ID=data.nodeID;
		task.PlateNumber=gb2312(data.LicensePlateNumber);
		task.Material=gb2312(data.materialName);
		task.Heavy=parseInt(data.Heavy);
		task.TaskQuantity=parseInt(data.sendOutNum);
		commandFun();
	})

	//发送临时增加节点任务命令-02H
	socket.on('temporaryAdd',function(data){
		var task=pipelineController.SingalNodeAdd;
		commandTypeVariable.commandType = 'SingalNodeAddScheduledProduction';
		task.ID=data.nodeID;
		task.TaskQuantity=parseInt(data.TaskQuantity);
		commandFun();
	})

	//发送控制产品线情况命令-04H
	socket.on('ControlProductionLine',function(data){
		var task=pipelineController.ControlProductionLine;
		console.log(data);
		switch(data.Oper){
			case '1':
				commandTypeVariable.commandType='OpenProductionLine';
				break;
			case '2':
				commandTypeVariable.commandType='ShutDownProductionLine';
				break;
			case '3':
				commandTypeVariable.commandType='SuspendProductionLine';
				break;
		}
		task.ID=data.nodeID;
		task.Oper=parseInt(data.Oper);
		commandFun();
	})
});
server.listen(3000);