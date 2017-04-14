var mongoose=require('mongoose');
var db=require('./db.js');

var truckSchema=new mongoose.Schema({
	"periods":String,
	"truck_pinming":String,
	"truck_custom":String,
	"truck_methods":String,
	"truck_car":String,
	"truck_salenum":String,
	"truck_ordernum":String,
	"truck_truenum":Number,
	"truck_pieceWeight":Number,
	"truck_weight":Number,
	"truck_time":String,
	"truck_people":String,
	"truck_fillingStatus":String,
	"truck_remark":String,
	"timestamp":String,
	"today":String,
	"Classes":String
});

var Truck=db.model('Truck',truckSchema);

module.exports=Truck;