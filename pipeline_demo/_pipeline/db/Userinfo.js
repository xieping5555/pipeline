var mongoose =require('mongoose');
var db=require('./db.js');

var UserinfoSchema=new mongoose.Schema({
	username:String,
	password:String
});

var Userinfo=db.model('Userinfo',UserinfoSchema);

module.exports=Userinfo;