const mongoose = require('mongoose');

const reqSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url : {type : String,required : true},
    host : {type: String, required : true},
    pathname : {type : String, required : true},
    query : {},
    method : {type : String , required : true},
    title : {type : String, required : true},
    description : {type : String,required :true},
    label : {type : String},
    requestHeaders :  {},
    body : {},
    requestCreatedAt : {type : Date,required : true}
});

module.exports = mongoose.model('RequestDoc',reqSchema);



