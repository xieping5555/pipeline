var Put=require('../db/putSchema.js');
var Out=require('../db/OutSchema.js');
var Sale=require('../db/SaleSchema.js');
var Truck=require('../db/truckSchema.js');
var Back=require('../db/backSchema.js');
var Shift=require('../db/shiftSchema.js');
var Userinfo=require('../db/Userinfo.js');
var Backlog=require('../db/backlogSchema.js');
var Warehouse=require('../db/warehouseData.js');
var Material=require('../db/material.js');
var Crew=require('../db/crew.js');
var formidable=require('formidable');
var moment=require('moment');
var mongodb=require('mongodb');
var session=require('express-session');
//提交一条库入数据
exports.do_put=function(req,res){
	var form = new formidable.IncomingForm();
	//创建时间戳
	var timestamp=moment(new Date()).format('YYYYMMDDHHmmssssss')+(Math.ceil(Math.random()*90000)+10000);
	//创建日期
	var today=moment(new Date()).format("YYYY-MM-DD");
	form.parse(req,function(err,fields,files){
		Put.create({
			"warehouse_name":fields.kuwei,
			"putstyle":fields.putstyle,
			"freight_house":fields.huowei,
			"goods_name":fields.good,
			"mount":Number(fields.mount),
			"piece_weight":Number(fields.piece_weight),
			"put_time":fields.put_time,
			"group":fields.group,
			"remark":fields.remark,
			"weight":Number(fields.weight),
			"timestamp":timestamp,
			"today":today
		},function(err){
			if(err){
				console.log(err);
				return;
			};
			Put.find({'timestamp':timestamp},function(err,docs){
				if(err){
					console.log(err);
					return;
				};
				res.send({"a":docs});
			})
		})
	})
};

//展示入库信息
exports.showPutInfo=function(req,res){
	var today=moment(new Date()).format("YYYY-MM-DD");
	var Classes=req.query.Classes;
	Put.find({"group":Classes},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		console.log(docs);
		res.send(docs);
	})
}
//修改入库数据
exports.changeInfo=function(req,res){
	var form=new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		Put.findOneAndUpdate({_id:fields._id},{
			"_id":fields._id,
			"warehouse_name":fields.warehouse_name,
			"freight_house":fields.freight_house,
			"goods_name":fields.goods_name,
			"mount":fields.mount,
			"piece_weight":fields.piece_weight,
			"group":fields.group,
			"remark":fields.remark,
			"weight":fields.weight,
			"put_time":fields.put_time
		},function(){
			res.send(fields);
		})
	})
};

//删除一条入库数据
exports.deleteInfo=function(req,res){
	var _id=req.query._id;
	Put.remove({"_id":_id},function(err){
		if(err){
			console.log(err);
			return;
		};
		res.send('remove success');
	})
};


var url='mongodb://localhost:27017/oriangal';
var oriangal_data={};
mongodb.connect(url,function(err,db){
	if(err){
		console.log('连接oriangal出错');
		return;
	}
	oriangal_data=db.collection('oriangal_data');
})
//得到各个库中的原始数据
exports.getOriangalData=function(req,res){
	oriangal_data.find({}).toArray(function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		res.send(docs)  //将原始数据送给home
	})
};
//原始数据增加
exports.oriangalIncrease=function(req,res){
	var kuming=req.query.kuming;
	var cangming=req.query.cangming;
	var huoming=req.query.huoming;
	var mount=req.query.mount;
	var hIndex=''; //货位索引
	var gIndex=''; //货物索引
	oriangal_data.find({name:kuming}).toArray(function(err,docs){
		docs[0].data.forEach(function(item,index,array){
			for(var props in item){
				if(props == cangming){
					hIndex=index;
					item[props].forEach(function(oitem,oindex,oarray){
						if(oitem.name == huoming){
							gIndex=oindex;
							oriangal_data.update({name:kuming},{$inc:{[`data.${hIndex}.${cangming}.${gIndex}.num`]:Number(`${mount}`)}});   //使用es6变量书写方式才行，另外值要用number函数转换成num类型
							res.send('原始数据增加');
						}
					})
				}
			}
		})
	});
};
//原始数据减少
exports.oriangaldecrease=function(req,res){
	var kuming=req.query.kuming;
	var cangming=req.query.cangming;
	var huoming=req.query.huoming;
	var mount=req.query.mount;
	var hIndex=''; //货位索引
	var gIndex=''; //货物索引
	oriangal_data.find({name:kuming}).toArray(function(err,docs){
		docs[0].data.forEach(function(item,index,array){
			for(var props in item){
				if(props == cangming){
					hIndex=index;
					item[props].forEach(function(oitem,oindex,oarray){
						if(oitem.name == huoming){
							gIndex=oindex;
							oriangal_data.update({name:kuming},{$inc:{[`data.${hIndex}.${cangming}.${gIndex}.num`]:-Number(`${mount}`)}});   //使用es6变量书写方式才行，另外值要用number函数转换成num类型
							res.send('原始数据减少');
						}
					})
				}
			}
		})
	});
};

//提交一条出库数据
exports.do_out=function(req,res){
	var form=new formidable.IncomingForm();
	//创建时间戳
	var timestamp=moment(new Date()).format('YYYYMMDDHHmmssssss')+(Math.ceil(Math.random()*90000)+10000);
	//创建日期
	var today=moment(new Date()).format("YYYY-MM-DD");
	form.parse(req,function(err,fields,files){
		Out.create({
			"out_kuwei":fields.out_kuwei,
			"out_style":fields.out_style,
			"out_huowei":fields.out_huowei,
			"out_zhonglei":fields.out_zhonglei,
			"out_num":fields.out_num,
			"out_jianzhong":fields.out_jianzhong,
			"out_zhongliang":fields.out_zhongliang,
			"out_banci":fields.out_banci,
			"out_beizhu":fields.out_beizhu,
			"out_time":fields.out_time,
			"timestamp":timestamp,
			"today":today
		},function(err){
			if(err){
				console.log(err);
				return;
			};
			Out.find({'timestamp':timestamp},function(err,docs){
				if(err){
					console.log(err);
					return;
				};
				res.send(docs);
			})
		})
	})
};
//修改出库数据
exports.changeOutInfo=function(req,res){
	var form=new formidable.IncomingForm();

	form.parse(req,function(err,fields,files){
		if(err){
			console.log(err);
			return;
		};
		Out.findOneAndUpdate({'_id':fields._id},{
			"out_kuwei":fields.out_kuwei,
			"out_style":fields.out_style,
			"out_huowei":fields.out_huowei,
			"out_zhonglei":fields.out_zhonglei,
			"out_jianzhong":fields.out_jianzhong,
			"out_time":fields.out_time,
			"out_banci":fields.out_banci,
			"out_num":fields.out_num,
			"out_beizhu":fields.out_beizhu
		},function(){
			res.send(fields);
		})

	})
}

//显示出库数据
exports.showOutInfo=function(req,res){
	var Classes=req.query.Classes;
	Out.find({"out_banci":Classes},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		res.send(docs);
	})
}


//提交一条装车数据
exports.sale_submit=function(req,res){
	var form=new formidable.IncomingForm();
	var timestamp=moment(new Date()).format('YYYYMMDDHHmmssssss')+(Math.ceil(Math.random()*90000)+10000);
	//创建日期
	var today=moment(new Date()).format("YYYY-MM-DD");
	form.parse(req,function(err,fields,files){
		Sale.create({
			"sale_kuwei":fields.sale_kuwei,
			"sale_style":fields.sale_style,
			"sale_huowei":fields.sale_huowei,
			"custom_name":fields.custom_name,
			"car_num":fields.car_num,
			"sale_num":fields.sale_num,
			"other_num":fields.other_num,
			"true_num":fields.true_num,
			"pieceWeight":fields.pieceWeight,
			"sale_pinming":fields.sale_pinming,
			"sale_banci":fields.sale_banci,
			"sanpo":fields.sanpo,
			"fillingStatus":'准备装车',
			"sale_remark":fields.sale_remark,
			"timestamp":timestamp,
			"today":today
		},function(err){
			if(err){
				console.log(err);
				return;
			};
			Sale.find({'timestamp':timestamp},function(err,docs){
				if(err){
					console.log(err);
					return;
				};
				res.send(docs);
			})
		})
	})
}

//展示装车数据
exports.showSaleInfo=function(req,res){
	var Classes=req.query.Classes;
	Sale.find({"sale_banci":Classes},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		res.send(docs);
	})
}

//修改装车数据
exports.saleInfoChange=function(req,res){
	var form=new formidable.IncomingForm();

	form.parse(req,function(err,fields,files){
		if(err){
			console(err);
			return;
		};
		Sale.findOneAndUpdate({"_id":fields._id},{
			"sale_kuwei":fields.sale_kuwei,
			"sale_style":fields.sale_style,
			"sale_huowei":fields.sale_huowei,
			"custom_name":fields.custom_name,
			"car_num":fields.car_num,
			"sale_num":fields.sale_num,
			"other_num":fields.other_num,
			"true_num":fields.true_num,
			"sale_pinming":fields.sale_pinming,
			"sale_banci":fields.sale_banci,
			"sanpo":fields.sanpo,
			"sale_remark":fields.sale_remark
		},function(){
			Sale.find({"_id":fields._id},function(err,docs){
				if(err){
					console.log(err);
					return;
				};
				res.send(docs);
			})
		})
	})
}
//提交一条兑车数据
exports.carpush_data=function(req,res){
	var form=new formidable.IncomingForm();
	var timestamp=moment(new Date()).format('YYYYMMDDHHmmssssss')+(Math.ceil(Math.random()*90000)+10000);
	//创建日期
	var today=moment(new Date()).format("YYYY-MM-DD");
	form.parse(req,function(err,fields,files){
		Truck.create({
			"periods":fields.periods,
			"truck_pinming":fields.truck_pinming,
			"truck_custom":fields.truck_custom,
			"truck_methods":fields.truck_methods,
			"truck_car":fields.truck_car,
			"truck_salenum":fields.truck_salenum,
			"truck_ordernum":fields.truck_ordernum,
			"truck_truenum":fields.truck_truenum,
			"truck_pieceWeight":fields.truck_pieceWeight,
			"truck_weight":fields.truck_weight,
			"truck_time":fields.truck_time,
			"truck_people":fields.truck_people,
			"truck_remark":fields.truck_remark,
			"truck_fillingStatus":'准备装车',
			"timestamp":timestamp,
			"today":today,
			"Classes":fields.Classes
		},function(err){
			if(err){
				console.log(err);
				return;
			};
			Truck.find({"timestamp":timestamp},function(err,docs){
				if(err){
					console.log(err);
					return;
				};
				res.send(docs);
			})
		})
	})
}
//显示兑车数据
exports.showTruckInfo=function(req,res){
	var Classes=req.query.Classes;
	Truck.find({"Classes":Classes},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		console.log(docs);
		res.send(docs);
	})
}
//修改兑车数据
exports.truckInfoChange=function(req,res){
	var form = new formidable.IncomingForm();

	form.parse(req,function(err,fields,files){
		Truck.findOneAndUpdate({'_id':fields._id},{
			"periods":fields.periods,
			"truck_pinming":fields.truck_pinming,
			"truck_custom":fields.truck_custom,
			"truck_car":fields.truck_car,
			"truck_salenum":fields.truck_salenum,
			"truck_ordernum":fields.truck_ordernum,
			"truck_truenum":fields.truck_truenum,
			"truck_weight":fields.truck_weight,
			"truck_time":fields.truck_time,
			"truck_people":fields.truck_people,
			"truck_remark":fields.truck_remark
		},function(){
			Truck.find({"_id":fields._id},function(err,docs){
				if(err){
					console.log(err);
					return;
				};
				res.send(docs);
			})
		})
	})
}

//提交回填数据
exports.submitBackData=function(req,res){
	var form=new formidable.IncomingForm();
	var timestamp=moment(new Date()).format('YYYYMMDDHHmmssssss')+(Math.ceil(Math.random()*90000)+10000);
	//创建日期
	var today=moment(new Date()).format("YYYY-MM-DD");
	form.parse(req,function(err,fields,files){
		Back.create({
			"back_periods":fields.back_periods,
			"back_pinming":fields.back_pinming,
			"back_mount":fields.back_mount,
			"back_jianzhong":fields.back_jianzhong,
			"back_weight":fields.back_weight,
			"back_time":fields.back_time,
			"back_banci":fields.back_banci,
			"back_remark":fields.back_remark,
			"timestamp":timestamp,
			"today":today,
			"Classes":fields.Classes
		},function(err){
			if(err){
				console.log(err);
				return;
			};
			Back.find({"timestamp":timestamp},function(err,docs){
				if(err){
					console.log(err);
					return;
				};
				res.send(docs);
			})
		})
	})
};

//显示回填数据
exports.showBackInfo=function(req,res){
	var Classes=req.query.Classes;
	Back.find({"Classes":Classes},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		res.send(docs);
	})
}

//修改回填数据
exports.backInfoChange=function(req,res){
	var  form=new formidable.IncomingForm();

	form.parse(req,function(err,fields,files){
		Back.findOneAndUpdate({'_id':fields._id},{
			"back_periods":fields.back_periods,
			"back_pinming":fields.back_pinming,
			"back_mount":fields.back_mount,
			"back_jianzhong":fields.back_jianzhong,
			"back_weight":fields.back_weight,
			"back_time":fields.back_time,
			"back_banci":fields.back_banci,
			"back_remark":fields.back_remark
		},function(){
			res.send(fields);
		})
	})
}
//根据班次返回当前班次的信息
exports.showWarehouse_dateInfo=function(req,res){
	var Classes=req.query.Classes;  //当前班次
	if(Classes == ''){
		return;
	}else{
		Put.find({"group":Classes},function(err,docs){
			if(err){
				console.log(err);
				return;
			};
			res.send(docs);
		})
	}
}
//根据班次返回当前班次的信息
exports.showOut_dateInfo=function(req,res){
	var Classes=req.query.Classes;
	console.log(Classes);
	if(Classes == ''){
		return;
	}else{
		Out.find({'out_banci':Classes},function(err,docs){
			if(err){
				console.log(err);
				return;
			};
			res.send(docs);
		})
	}
}

//根据班次返回当前班次的装车数据
exports.showSale_dateInfo=function(req,res){
	var Classes=req.query.Classes;
	console.log(Classes);
	if(Classes == ''){
		return;
	}else{
		Sale.find({"sale_banci":Classes},function(err,docs){
			if(err){
				console.log(err);
				return;
			};
			res.send(docs);
		})
	}
}

//根据日期返回当天的兑车数据
exports.showCarpush_dateInfo=function(req,res){
	var Classes=req.query.Classes;
	console.log(Classes);
	if(Classes == ''){
		return;
	}else{
		Truck.find({"Classes":Classes},function(err,docs){
			if(err){
				console.log(err);
				return;
			};
			res.send(docs);
		})
	}
}

//根据日期返回当天的回填数据
exports.showBack_dateInfo=function(req,res){
	var Classes=req.query.Classes;
	console.log(Classes);
	if(Classes == ''){
		return;
	}else{
		Back.find({"Classes":Classes},function(err,docs){
			if(err){
				console.log(err);
				return;
			};
			res.send(docs);
		})
	}
}

//获取调度表中所有的信息
exports.getPutInfo=function(req,res){
	var Classes=req.query.Classes;
	Put.find({"group":Classes},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		res.send(docs);
	});
};
exports.getOutInfo=function(req,res){
	var Classes=req.query.Classes;
	Out.find({"out_banci":Classes},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		res.send(docs);
	});
};
exports.getSaleInfo=function(req,res){
	var Classes=req.query.Classes;
	Sale.find({"sale_banci":Classes},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		res.send(docs);
	});
};
exports.getTruckInfo=function(req,res){
	var Classes=req.query.Classes;
	Truck.find({"Classes":Classes},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		res.send(docs);
	});
};
exports.getBackInfo=function(req,res){
	var Classes=req.query.Classes;
	Back.find({"Classes":Classes},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		res.send(docs);
	});
};




//换班
exports.submitShiftInfo=function(req,res){
	var form=new formidable.IncomingForm();

	form.parse(req,function(err,fields,files){
		Shift.findOneAndUpdate({"ID":"01"},{
			"shiftBanci":fields.shiftBanci,
			"shiftDispatch":fields.shiftDispatch,
			"shiftSecretary":fields.shiftSecretary,
			"shiftMachinery":fields.shiftMachinery,
			"DayOrNight":fields.DayOrNight        
		},function(err){
			if(err){
				console.log(err);
				return;
			}
			res.send(fields);
		})
	})
}
//获得当前班次信息
exports.getShiftInfo=function(req,res){
	Shift.find({"ID":"01"},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		res.send(docs);
	})
}




//验证登陆信息
exports.checkLogin=function(req,res){
	var form=new formidable.IncomingForm();

	form.parse(req,function(err,fields,files){
		Userinfo.find({"username":fields.username},function(err,docs){
			if(err){
				console.log(err);
				return;
			};
			if(docs.length !=0){
				if(docs[0].password != fields.password){
					res.send('-1');   //密码不正确
					return;
				}
			};
			if(docs.length == 0){
				res.send('-2');  //用户名不正确
				return;
			};
			res.cookie('name','11',{path:'http://http://localhost:8082/#/index/home',secure: true,maxAge:9000000});
			res.send('1');    //验证通过
		})
	})
}


//装车状态信息改变
exports.fillingStatusChange=function(req,res){
	var _id=req.query._id;
	Sale.findOneAndUpdate({'_id':_id},{'fillingStatus':'装车完成'},function(err){
		if(err){
			console.log(err);
			return;
		};
		res.send('修改完成');
	})
}

//兑车状态信息改变
exports.truckFillingStatusChange=function(req,res){
	var _id=req.query._id;
	Truck.findOneAndUpdate({'_id':_id},{'truck_fillingStatus':'装车完成'},function(err){
		if(err){
			console.log(err);
			return;
		};
		res.send('修改完成');
	})
}

//提交待办事项信息
exports.submitIssue=function(req,res){
	var form = new formidable.IncomingForm();
	var today=moment(new Date()).format("YYYY-MM-DD");
	form.parse(req,function(err,fields,files){
		Backlog.findOneAndUpdate({"ID":fields.distinguishID},{$push:{issueInfo:fields.issueInfo}},function(err){
			if(err){
				console.log(err);
				return;
			}
			res.send('issue success');
		})
	})
}
//获取待办事项信息
exports.getBacklog=function(req,res){
	Backlog.find({},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		res.send(docs);
	})
}
//清空待办事项
exports.clearBacklog=function(req,res){
	Backlog.findOneAndUpdate({"ID":req.query.distinguishID},{$set:{issueInfo:[]}},function(err){
		if(err){
			console.log(err);
			return;
		}
		res.send('clear success');
	})
}

//获取库位和货位信息
exports.getwarehouseData=function(req,res){
	Warehouse.find({},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		res.send(docs);
	})
}
//获取物料信息
exports.getmaterialData=function(req,res){
	Material.find({},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		res.send(docs);
	})
}
//获取班组信息
exports.getcrewData=function(req,res){
	Crew.find({},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		res.send(docs);
	})
}

//新增库位
exports.warehouseAdd=function(req,res){
	var form = new formidable.IncomingForm();

	form.parse(req,function(err,fields,files){
		Warehouse.create({
			'warehousename':fields.warehouseAddInput,
			'storehouseArr':[]
		},function(err){
			if(err){
				console.log(err);
				return;
			}
			res.send(fields.warehouseAddInput);
		})
	})
}

//修改库位信息
exports.warehouseChangeInput=function(req,res){
	var warehouseOldValue=req.query.warehouseOldValue;
	var warehouseChangeValue=req.query.warehouseChangeValue;
	console.log(warehouseOldValue);
	console.log(warehouseChangeValue);
	Warehouse.findOneAndUpdate({"warehousename":warehouseOldValue},{
		"warehousename":warehouseChangeValue
	},function(err){
		if(err){
			console.log(err);
			return;
		};
		res.send('warehousename change success');
	})
}

//删除一个库位
exports.warehouseInfoDelete=function(req,res){
	var warehousename=req.query.warehousename;
	Warehouse.remove({'warehousename':warehousename},function(err){
		if(err){
			console.log(err);
			return;
		};
		res.send('delete warehouse success');
	})
}

//给一个库增加仓位
exports.storehouseAdd=function(req,res){
	var warehousename=req.query.warehousename,
		storehouseName=req.query.storehouseName;
	Warehouse.findOneAndUpdate({'warehousename':warehousename},{$push:{storehouseArr:storehouseName}},function(err){
		if(err){
			console.log(err);
			return;
		};
		res.send('storehouse add success');
	})
}

//修改一个仓名
exports.storehouseChange=function(req,res){
	var warehousename=req.query.warehousename,
		storehouseOldValue=req.query.storehouseOldValue,
		storehouseChangeValue=req.query.storehouseChangeValue;
	Warehouse.findOne({warehousename:warehousename},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		docs.storehouseArr.forEach(function(item,index,array){
			if(item == storehouseOldValue){
				Warehouse.update({'warehousename':warehousename},{$set:{[`storehouseArr.${index}`]:storehouseChangeValue}},function(err){
					if(err){
						console.log(err);
						return;
					}
					res.send('storehouse change success');
				})	
			}
		})
	})
}

//删除一个仓
exports.storehouseDelete=function(req,res){
	var storehouseValue=req.query.storehouseValue;
	var warehousename=req.query.warehousename;
	Warehouse.findOneAndUpdate({"warehousename":warehousename},{$pull:{"storehouseArr":storehouseValue}},function(err){
		if(err){
			console.log(err);
			return;
		};
		res.send('storehouse delete success');
	})
}
//新增一个物料
exports.materialAdd=function(req,res){
	var materialName=req.query.materialName;
	Material.findOneAndUpdate({},{$push:{material:materialName}},function(err){
		if(err){
			console.log(err);
			return;
		};
		res.send('material add success');
	})
}
//修改物料名
exports.materialChange=function(req,res){
	var materialOldValue=req.query.materialOldValue;
	var materialname=req.query.materialname;
	Material.find({},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		docs[0].material.forEach(function(item,index,array){
			if(item == materialOldValue){
				Material.update({},{$set:{[`material.${index}`]:materialname}},function(err){
					if(err){
						console.log(err);
						return;
					};
					res.send('material change success');
				})
			}
		})
	})
}

//删除一条物料信息
exports.materialDelete=function(req,res){
	var materialname=req.query.materialname;
	Material.find({},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		docs[0].material.forEach(function(item,index,array){
			if(item == materialname){
				Material.update({},{$pull:{"material":materialname}},function(err){
					if(err){
						console.log(err);
						return;
					};
					res.send('material delete success');
				})
			}
		})
	})
}


//新增一个班次
exports.classesAdd=function(req,res){
	var classesValue=req.query.classesValue;
	Crew.create({
		"crewname":classesValue,
		"group":[]
	},function(err){
		if(err){
			console.log(err);
			return;
		};
		res.send('classes add success');
	})
}
//修改班次名
exports.classesChange=function(req,res){
	var classesOldValue=req.query.classesOldValue,
		classesValue=req.query.classesValue;
	Crew.findOneAndUpdate({"crewname":classesOldValue},{"crewname":classesValue},function(err){
		if(err){
			console.log(err);
			return;
		};
		res.send('crewname change success');
	})
}
//删除班次
exports.classesDelete=function(req,res){
	var classesValue=req.query.classesValue;
	Crew.remove({"crewname":classesValue},function(err){
		if(err){
			console.log(err);
			return;
		};
		res.send('crew delete success');
	})
}
//增加一个组
exports.groupAdd=function(req,res){
	var currentClasses=req.query.currentClasses;
	var groupValue=req.query.groupValue;
	Crew.findOneAndUpdate({crewname:currentClasses},{$push:{group:groupValue}},function(err){
		if(err){
			console.log(err);
			return;
		};
		res.send('group add success');
	})
}

//修改组名
exports.groupChange=function(req,res){
	var groupOldValue=req.query.groupOldValue,
		groupChangeValue=req.query.groupChangeValue,
		currentClasses=req.query.currentClasses;
	Crew.findOne({"crewname":currentClasses},function(err,docs){
		if(err){
			console.log(err);
			return;
		};
		docs.group.forEach(function(item,index,array){
			if(item == groupOldValue){
				Crew.update({"crewname":currentClasses},{$set:{[`group.${index}`]:groupChangeValue}},function(err){
					if(err){
						console.log(err);
						return;
					};
					res.send('group change success');
				})
			}
		})
	})
}
//删除一个组
exports.groupDelete=function(req,res){
	var groupValue=req.query.groupValue,
		currentClasses=req.query.currentClasses;
	Crew.findOneAndUpdate({'crewname':currentClasses},{$pull:{"group":groupValue}},function(err){
		if(err){
			console.log(err);
			return;
		};
		res.send('group delete success');
	})
}