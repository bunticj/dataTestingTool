const ResponseDoc = require('../models/responses');
const RequestDoc = require('../models/requests');
const mongoose = require('mongoose');

//get all responses
module.exports.getAllResponses = (req, res, next) => {
    const query = {};
    const filters = {
        isChecked: req.query.isChecked,
        verified: req.query.verified,
        verifiedByUser: req.query.verifiedByUser,
        comment: req.query.comment
    };

    //filters
    for (let key in filters) {
        if (filters[key]) {
            query[key] = filters[key];
        }
    }
    //pagination
    const options = {
        page: +req.query.page || 1,
        limit: +req.query.limit || 10,
        sort: req.query.sort || null

    };
    ResponseDoc.paginate(query, options)
        .then(result => {
            // console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


};

//get single response by id
module.exports.getSingleResponse = (req, res, next) => {
    const id = req.params.responseId;
    ResponseDoc.findById(id)
        .exec()
        .then(result => {
            if (result) {


                res.status(200).json({
                    response: result,
                    allResponsesByRequestId: {
                        type: 'GET',
                        url: `${req.headers.host}/requests/${result.requestId}/responses`
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


//get all responses from the same request
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


//update response
module.exports.updateResponse = (req, res, next) => {
    const id = req.params.responseId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;

        if (ops.propName === 'verified') {
            var verifByUser = req.userData._id
            var verifEmail = req.userData.email;
            var verifAt = new Date().toISOString();
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

            if (result.verified == true) {
                //add verified responseId to request
                RequestDoc.findById({
                    _id: result.requestId
                }, (err, doc) => {
                    if (err) {
                        throw new Error('Not found');
                    }
                    doc.verifiedResponseId.push(result._id);
                    doc.responseVerifiedAt = verifAt;
                    doc.responseVerifiedByUser = verifEmail;
                    doc.save();

                })
            }
            result.updatedAt.push(new Date().toISOString());
            result.verifiedByUser = verifByUser || null;
            result.responseVerifiedAt = verifAt || null;
            result.verifiedByUserEmail = verifEmail || null;
            result.isChecked = isChecked || null;
            result.save();
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

//delete response
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