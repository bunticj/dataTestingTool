const mongoose = require('mongoose');

const labelSchema = mongoose.Schema({
    label: {
        type: String,
        
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date
    }
}, {
    versionKey: false
});

const tagSchema = mongoose.Schema({
    tag: String,
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date
    }
}, {
    versionKey: false
});

module.exports.lab = mongoose.model('LabelDoc', labelSchema);
module.exports.tag = mongoose.model('TagDoc', tagSchema);