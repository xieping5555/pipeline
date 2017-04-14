var mongoose=require('mongoose');
var db=require('./db.js');

var materialSchema=new mongoose.Schema({
	material:Array
})

var Material=db.model('Material',materialSchema);

module.exports=Material;