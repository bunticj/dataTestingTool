const mongoose = require('mongoose');
const axios = require('axios');
const RequestDoc = require('../models/requests');
const ResponseDoc = require('../models/responses');

//send saved request with requestId  
module.exports.axiosRequest = (req, res, next) => {
    const requestId = req.body.requestId;
    RequestDoc.findById(requestId)
        .then(result => {
            if (result) {
                var resultObj = {};
                //check if user send new Auth token
                if (req.body.Authorization) {
                    resultObj = result;
                    resultObj.headers.Authorization = req.body.Authorization;
                } else {
                    resultObj = result;
                }
                //axios config and send request
                axios.request({
                        method: resultObj.method,
                        url: resultObj.url,
                        headers: resultObj.headers,
                        data: resultObj.body
                    }).then(response => {
                        //save response in db
                        const responseDoc = new ResponseDoc({
                            _id: new mongoose.Types.ObjectId(),
                            responseData: response.data,
                            responseText: response.statusText,
                            responseStatus: response.status,
                            responseCreatedAt: new Date().toISOString(),
                            creatorId: req.userData._id,
                            creatorEmail: req.userData.email,
                            requestId: requestId,
                            isChecked: false,
                        });
                        responseDoc.save((err) => {
                            if (err) {
                                throw err;
                            }
                        });
                        //add responseId to request
                        result.relatedResponses.push(responseDoc._id);
                        result.save();


                        
                        res.status(200).json({
                            message: "Response created",
                            responseDocument: responseDoc,

                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            } else {
                res.status(404).json({
                    message: "Not found"
                })
            }

        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
}