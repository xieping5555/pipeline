var mongoose=require('mongoose');
var db=mongoose.createConnection('localhost','pipeline');
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
	console.log('success');
})

module.exports=db;