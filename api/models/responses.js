const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   responseData : {},
   responseText : {type : String,required : true},
   responseStatus : {type : Number,required : true},
   responseHeaders : {},
   responseCreatedAt : {type : Date,required : true},
   requestId : {type : mongoose.Schema.Types.ObjectId, ref:'RequestDoc',required : true }
});

module.exports = mongoose.model('ResponseDoc',responseSchema);



