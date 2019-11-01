const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   responseData : {type : Array,required:true},
   responseText : {type : String,required : true},
   responseStatus : {type : Number,required : true},
   responseCreatedAt : {type : Date,required : true},
   requestId : {type : mongoose.Schema.Types.ObjectId, ref:'RequestDoc',required : true },
   
},{strict: false});


module.exports = mongoose.model('ResponseDoc',responseSchema);



