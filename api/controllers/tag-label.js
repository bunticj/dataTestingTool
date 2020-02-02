const TagDoc = require('../models/tag-label').tag;
const LabelDoc = require('../models/tag-label').lab;

//get list of labels
module.exports.getLabels = (req, res, next) => {
    LabelDoc.find()
        .select('label')
        .exec()
        .then(result => {
            const response = {
                totalRecordCount: result.length,
                labels: result.map(doc => {
                    return {
                        label: doc,
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

//get list of tags
module.exports.getTags = (req, res, next) => {
    TagDoc.find()
        .select('tag')
        .exec()
        .then(result => {
            const response = {
                totalRecordCount: result.length,
                tag: result.map(doc => {
                    return {
                        tag: doc,

                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};