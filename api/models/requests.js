const mongoose = require('mongoose');
const paginator = require('mongoose-paginate-v2');



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
    headers: {},
    body: {}, 
    requestCreatedAt: {
        type: Date,
        required: true
    },
    isChecked: {
        type : Boolean,
        default : false,
        require : true
    },
    verified: {
        type: Boolean,
    },
    verifiedResponseId: {
        type: Array,
        ref: 'ResponseDoc',
    },
    verifiedByUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDoc'
    },
    verifiedByUserEmail: {
        type: String,
        ref: 'UserDoc'
    },
    requestVerifiedAt: {
        type: Date
    },
    responseVerifiedAt: {
        type: Date,
        ref: 'ResponseDoc'
    },
    responseVerifiedByUser : {
        type : String
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
        ref: 'UserDoc'
    },
    updatedAt: {
        type: Array
    },

    tag: {
        type: Array
    }

}, {
    versionKey: false
});

reqSchema.plugin(paginator);


module.exports = mongoose.model('RequestDoc', reqSchema);