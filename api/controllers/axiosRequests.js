const mongoose = require('mongoose');
const axios = require('axios');
const RequestDoc = require('../models/requests');
const ResponseDoc = require('../models/responses');

module.exports.getAxios = (req, res, next) => {
    const requestId = req.body.requestId;
    RequestDoc.findById(requestId)
        .then(result => {
            
            if (result) {

                axios.get(result.url, {
                        headers: result.headers
                    })
                    .then(response => {
                        //save response in db
                        const responseDoc = new ResponseDoc({
                            _id: new mongoose.Types.ObjectId(),
                            responseData: response.data,
                            responseText: response.statusText,
                            responseStatus: response.status,
                            responseCreatedAt: new Date().toISOString(),
                            requestId: requestId
                        });
                        responseDoc.save((err) => {
                            if (err) {
                                throw err;
                            }
                        });
                        result.relatedResponses.push(responseDoc._id);
                        result.save();
                        console.log('result related response', result.relatedResponses);
                        res.status(200).json({
                            responseDocument: responseDoc,
                            //  requestDocument: result

                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });

            } else {
                console.log('Request ID not found');
                res.status(404).json({
                    message: "Not found"
                })
            }

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}