const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    responseData: {
        type: Array,
        required: true
    },
    responseText: {
        type: String,
        required: true
    },
    responseStatus: {
        type: Number,
        required: true
    },
    responseCreatedAt: {
        type: Date,
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserDoc'
    },
    creatorEmail: {
        type : String,
        required : true,
        ref : 'UserDoc'
    },
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RequestDoc',
        required: true
    },
    verified: {
        type: Boolean,
       
    },
    verifiedByUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDoc'
    },
    verifiedByUserEmail : {
        type : String,
        required : true,
        ref : 'UserDoc'
    },
    updatedAt: {
        type: Array
    },
    responseVerifiedAt: {
        type: Date,
    },
    isChecked : {
        type : Boolean,
        required : true,
        default : false
    },
    comment : {
        type : String
    }

}, {
    versionKey: false
});


module.exports = mongoose.model('ResponseDoc', responseSchema);