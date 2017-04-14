var db=require('./db.js');
var mongoose=require('mongoose');
var PutSchema=new mongoose.Schema({
	warehouse_name:String,
	freight_house:String,
	putstyle:String,
	goods_name:String,
	mount:Number,
	piece_weight:Number,
	weight:Number,
	put_time:String,
	group:String,
	remark:String,
	timestamp:String,
	today:String
});

var Put=db.model('Put',PutSchema);

module.exports=Put;