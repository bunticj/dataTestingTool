const mongoose = require('mongoose');

const reqSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    method: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },

    baseUrl: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    queryParams: {},

    title: {
        type: String
    },
    description: {
        type: String
    },
    label: {
        type: String,
        required: true
    },
    requestHeaders: {},
    body: {}, //required dodati manualno ako je post req
    requestCreatedAt: {
        type: Date,
        required: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    verifiedResponseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ResponseDoc',
    },
    verifiedByUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDoc'
    },
    requestVerifiedAt: {
        type: Date
    },
    responseVerifiedAt: {
        type: Date,
        ref:'ResponseDoc'
    },
    relatedResponses: {
        type: Array
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDoc',
        required: true
    },
    creatorEmail: {
        type: String,
        required: true,
        ref: 'UserDoc'
    },
    updatedAt: {
        type: Array
    }

}, {
    versionKey: false
});



module.exports = mongoose.model('RequestDoc', reqSchema);