const mongoose = require('mongoose');

const reqSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url : {type : String,required : true},
    host : {type: String, required : true},
    pathname : {type : String, required : true},
    query : {},
    method : {type : String , required : true},
    body : {},
    requestHeaders :  {},
    requestCreatedAt : {type : Date,required : true}
});

module.exports = mongoose.model('RequestDoc',reqSchema);



