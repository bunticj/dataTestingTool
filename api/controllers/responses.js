const ResponseDoc = require('../models/responses');
const RequestDoc = require('../models/requests');
const mongoose = require('mongoose');


module.exports.getAllResponses = (req, res, next) => {

    ResponseDoc.find()
        .exec()
        .then(result => {
            const response = {
                totalRecordCount: result.length,
                responses: result.map(doc => {
                    return {
                        response: doc,
                        getResponse: {
                            type: 'GET',
                            url: `${req.headers.host}/responses/${doc._id}`
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })

};


module.exports.getSingleResponse = (req, res, next) => {
    const id = req.params.responseId;
    ResponseDoc.findById(id)
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    response: result,
                    allResponses: {
                        type: 'GET',
                        url: `${req.headers.host}/responses`
                    }
                })
            } else {
                res.status(404).json({
                    message: 'Response not found'
                });
            }
        })
        .catch(err => {
            if (err) {
                res.status()
            }
        })
}

module.exports.updateResponse = (req, res, next) => {
    const id = req.params.responseId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;

        if (ops.propName === 'verified') {
            var verifByUser = req.userData._id
            var verifEmail = req.userData.email;
            var verifAt = new Date().toISOString();
            console.log('Usao u if');
            RequestDoc.findById({id :id})
            var isChecked = true ; 

        }
    }
    ResponseDoc.findByIdAndUpdate({
            _id: id
        }, {
            $set: updateOps
        }, {
            new: true
        })
        .exec()
        .then(result => {
            result.updatedAt.push(new Date().toISOString());
            result.verifiedByUser = verifByUser || null;
            result.responseVerifiedAt = verifAt || null;
            result.verifiedByUserEmail = verifEmail || null;
            result.isChecked = isChecked || null;
            res.status(200).json({
                message: 'Response updated',
                updatedRequest: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}