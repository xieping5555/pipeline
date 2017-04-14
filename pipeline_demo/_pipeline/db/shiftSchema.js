var mongoose =require('mongoose');
var db=require('./db.js');

var shiftSchema=new mongoose.Schema({
	"ID":String,
	"shiftBanci":String,
	"shiftDispatch":String,
	"shiftSecretary":String,
	"shiftMachinery":String
})

var Shift=db.model('Shift',shiftSchema);

module.exports=Shift;