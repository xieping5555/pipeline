var mongoose=require('mongoose');
var db=require('./db.js');

var crewSchema=new mongoose.Schema({
	crewname:String,
	group:Array
});

var Crew=db.model('Crew',crewSchema);

module.exports=Crew;