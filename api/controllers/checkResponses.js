const isEqual = require('lodash.isequal');
const get = require('lodash.get');
const ResponseDoc = require('../models/responses');
const RequestDoc = require('../models/requests');
const mongoose = require('mongoose');


module.exports.check = (req, res, next) => {
    const dataKey = req.body.dataKey
    const respCheck = 'Response Checker';
    ResponseDoc.find()
        .where('_id').in(req.body.id)
        .exec().then(result => {


            const x = get(result[0].responseData, dataKey, result[0].responseData);
            const y = get(result[1].responseData, dataKey, result[1].responseData);



            if (isEqual(x, y)) {
                if (result[0].verified) {
                    result[1].verified = true;
                    result[1].verifiedByUser = respCheck;
                    result[1].verifiedByUserEmail = respCheck;
                    result[1].updatedAt.push(new Date().toISOString());
                    result[1].responseVerifiedAt = new Date().toISOString();
                    result[1].isChecked = true;
                    result[1].isCheckedAt = new Date().toISOString();

                } else if (result[1].verified) {
                    result[0].verified = true;
                    result[0].verifiedByUser = respCheck;
                    result[0].verifiedByUserEmail = respCheck;
                    result[0].updatedAt.push(new Date().toISOString());
                    result[0].responseVerifiedAt = new Date().toISOString();
                    result[0].isChecked = true;
                    result[0].isCheckedAt = new Date().toISOString();

                } else {
                    res.status(200).json({
                        message: `Responses are equal!
                        Update verified status manually ,neither response wasn't verified before! `
                    })
                }

                result[0].save();
                result[1].save();
                RequestDoc.findById({
                    _id: result[0].requestId
                }, (err, doc) => {
                    if (err) {
                        throw error;
                    }
                    doc.responseVerifiedAt = new Date().toISOString();
                    doc.responseVerifiedByUser = respCheck;

                    if (doc.verifiedResponseId.indexOf(result[0].id)) {

                        doc.verifiedResponseId.push(result[1]._id)
                    } else {
                        doc.verifiedResponseId.push(result[0]._id)
                    }
                    doc.save();

                });
                res.status(200).json({
                    message: 'Responses are equal!',
                    firstResponse: result[0],
                    secondResponse: result[1]
                });

            } else {

                if (result[0].verified == 'true') {
                    result[1].verified = false;
                    result[1].verifiedByUser = respCheck;
                    result[1].verifiedByUserEmail = respCheck;
                    result[1].updatedAt.push(new Date().toISOString());
                    result[1].responseVerifiedAt = new Date().toISOString();
                    result[1].isChecked = true;
                    result[1].isCheckedAt = new Date().toISOString();

                } else if (result[1].verified == 'true') {
                    result[0].verified = false;
                    result[0].verifiedByUser = respCheck;
                    result[0].verifiedByUserEmail = respCheck;
                    result[0].updatedAt.push(new Date().toISOString());
                    result[0].responseVerifiedAt = new Date().toISOString();
                    result[0].isChecked = true;
                    result[0].isCheckedAt = new Date().toISOString();
                } else {
                    res.status(200).json({
                        message: `Responses are NOT equal!
                        Update verified status manually ,neither response wasn't verified before! `
                    })
                }
                result[0].save();
                result[1].save();
                RequestDoc.findById({
                    _id: result[0].requestId
                }, (err, doc) => {
                    
                    if (err) {
                        throw error;
                    }
                    console.log(doc);
                    doc.responseVerifiedAt = new Date().toISOString();
                    doc.responseVerifiedByUser = respCheck;

                    if (doc.verifiedResponseId.indexOf(result[0].id)) {
                        doc.verifiedResponseId.push(result[1]._id)

                    } else {
                        doc.verifiedResponseId.push(result[0]._id)
                    }
                    doc.save();
                });

                res.status(200).json({
                    message: 'Responses are NOT equal!',
                    firstResponse: result[0],
                    secondResponse: result[1]
                });

            }

        }).catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });

}