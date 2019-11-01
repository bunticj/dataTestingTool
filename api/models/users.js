const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email :{type : String,required : true},
    password : {type : String, required:  true},
    created_at : {type : Date, default : Date.now, required : true}
},{strict: false});

module.exports = mongoose.model('UserDoc',userSchema);