var mongoose = require('mongoose');
var db=require('./db.js');

var BacklogSchema=new mongoose.Schema({
	distinguishID:String,
	issueInfo:[],
	date:String
});

var Backlog = db.model('Backlog',BacklogSchema);

module.exports=Backlog;