var mongoose = require('mongoose');
var db=require('./db.js');


var warehouseSchema=new mongoose.Schema({
	warehousename:String,
	storehouseArr:Array
})

var Warehouse=db.model('Warehouse',warehouseSchema);

module.exports=Warehouse;