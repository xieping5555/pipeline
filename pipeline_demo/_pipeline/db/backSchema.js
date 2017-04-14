var mongoose=require('mongoose');
var db=require('./db.js');

var BackSchema=new mongoose.Schema({
	"back_periods":String,
	"back_pinming":String,
	"back_mount":Number,
	"back_jianzhong":Number,
	"back_weight":Number,
	"back_time":String,
	"back_banci":String,
	"back_remark":String,
	"timestamp":String,
	"today":String,
	"Classes":String
});

var Back=db.model('Back',BackSchema);

module.exports=Back;