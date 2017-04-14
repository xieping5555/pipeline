var mongoose =require('mongoose');
var db=require('./db.js');


var OutSchema=new mongoose.Schema({
	"out_kuwei":String,
	"out_style":String,
	"out_huowei":String,
	"out_zhonglei":String,
	"out_num":Number,
	"out_jianzhong":Number,
	"out_zhongliang":Number,
	"out_banci":String,
	"out_beizhu":String,
	"out_time":String,
	"timestamp":String,
	"today":String
});

//发布为model
var Out=db.model('Out',OutSchema);
module.exports=Out;