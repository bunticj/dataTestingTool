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

module.exports.getConnectedResponses = (req, res, next) => {
    const reqId = req.params.requestId;

    ResponseDoc.find({
        requestId: reqId
    }, (err, result) => {
        if (err) {
            res.status(404).json({
                message: 'Not found'
            });
        }
        console.log(result);

        res.status(200).json({
            totalRecordCount: result.length,
            responses: result.map(doc => {
                return {
                    response: doc,

                }
            }),
            getRequest: {
                type: 'GET',
                url: `${req.headers.host}/requests/${reqId}`
            }
        });
    });


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
            var isChecked = true;

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
            console.log(result.verified);

            if (result.verified == true) {
                console.log('jel usao');

                RequestDoc.findById({
                    _id: result.requestId
                }, (err, doc) => {
                    if (err) {
                        throw new Error('Not found');
                    }
                    doc.verifiedResponseId = result._id;
                    doc.save();

                })
            }

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

module.exports.deleteResponse = (req, res, next) => {
    const id = req.params.responseId;
    ResponseDoc.deleteOne({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Response deleted!'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });



}