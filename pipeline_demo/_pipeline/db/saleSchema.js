var mongoose=require('mongoose');
var db=require('./db.js');

var SaleSchema=new mongoose.Schema({
	"sale_kuwei":String,
	"sale_style":String,
	"sale_huowei":String,
	"custom_name":String,
	"car_num":String,
	"sale_num":String,
	"other_num":String,
	"true_num":Number,
	"pieceWeight":Number,
	"sale_pinming":String,
	"sale_banci":String,
	"sanpo":String,
	"fillingStatus":String,
	"sale_remark":String,
	"timestamp":String,
	"today":String
});

var Sale=db.model("Sale",SaleSchema);
module.exports=Sale;