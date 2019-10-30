const mongoose = require('mongoose');

const reqSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url : {type : String,required : true},
    host : {type: String, required : true},
    pathname : {type : String, required : true},
    query : {},
    method : {type : String , required : true},
    title : {type : String},
    description : {type : String},
    label : {type : String},
    requestHeaders :  {},
    body : {},
    requestCreatedAt : {type : Date,required : true}
  
    // response  dokument nastaje prije nastanka responseID-a ,naci rjesenje
   // responseId : [{type : mongoose.Schema.Types.ObjectId, ref:'ResponseDoc',required : true}]
    //creatorID dodati nakon tokena ,jer cu iz njega izvuci id
});

module.exports = mongoose.model('RequestDoc',reqSchema);



