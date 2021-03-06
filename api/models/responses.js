const mongoose = require('mongoose');
const paginator = require('mongoose-paginate-v2');

const responseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    responseData: {
        type: Array,
        required: true,
        immutable : true
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
        type: String,
    },
    verifiedByUserEmail : {
        type : String,
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
    isCheckedAt : {
        type : Date
    },
    comment : {
        type : String
    }

}, {
    versionKey: false
});

responseSchema.plugin(paginator);
module.exports = mongoose.model('ResponseDoc', responseSchema);