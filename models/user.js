var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	email 	: String, 
	unique_id: Number,
	username: String,
	password: String,
	passwordConf: String,

})


User = mongoose.model('User', userSchema);

module.exports = User;