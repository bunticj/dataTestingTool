const mongoose = require('mongoose');
const axios = require('axios');
const RequestDoc = require('../models/requests');
const ResponseDoc = require('../models/responses');

module.exports.getAxios = (req,res,next) => {
var requestId = "5dbc69d404e5ec2b2841e801";
    RequestDoc.findById(requestId)
        .exec()
        .then(result => {
           // console.log(result);
console.log(result.url,'result url   ',result.headers,'resul headte');
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
                        responseDoc.save((err, response) => {
                            if (err) {
                                throw err;
                            }
                        });
                        result.relatedResponses.push(responseDoc._id);
                        res.status(200).json({
                            responseDocument: responseDoc,
                          //  requestDocument: result

                        });
                    })
                    .catch(error => console.log(error));

            }
            else {
                console.log('nesto fgdsfdsfdsfdsfds');
            }

        }).catch(error => console.log(error));
}