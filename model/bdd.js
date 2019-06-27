var mongoose = require('mongoose');
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
}

mongoose.connect('mongodb+srv://Avila:2222@cluster0-refma.mongodb.net/test?retryWrites=true',
    options,
    function(err) {
     console.log(err);
    }
);

module.exports= mongoose;
