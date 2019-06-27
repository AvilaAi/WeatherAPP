var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// Creation of a new model for our cities
var userModel = mongoose.model('users', userSchema);

module.exports=userModel;
