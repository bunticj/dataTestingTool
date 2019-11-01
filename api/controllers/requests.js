const RequestDoc = require('../models/requests');
const mongoose = require('mongoose');
const getAxios = require('../axios/axiosGet').getAxios;



module.exports.postRequest = (req, res, next) => {

    const reqMethod = req.body.method.toLowerCase();
    const reqUrl = req.body.url;
    const reqHeaders = req.body.headers;
    const reqTitle = req.body.title;
    const reqDescription = req.body.description;
    const reqLabel = req.body.label || 'Unsorted';

    switch (reqMethod) {
        case 'get':
            //call axios get request 
            getAxios(reqUrl, reqHeaders, reqTitle, reqDescription, reqLabel, res);
            break;
        case 'post':

            break;
    }
}

//get all requests
module.exports.getRequest = (req, res, next) => {
    RequestDoc.find()
        .exec().then(result => {
            const response = {
                totalRecordCount: result.length,
                requests: result.map(doc => {
                    return {
                        request: doc,
                        singleRequest: {
                            type: 'GET',
                            url: 'http://localhost:4000/requests/' + doc._id
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
        });
};

//get single request
module.exports.getSingleRequest = (req, res, next) => {
    const id = req.params.requestId;
    RequestDoc.findById(id)
        .exec()
        .then(result => {
            if (result) {
                console.log(result);
                res.status(200).json({
                    request: result,
                    allRequests: {
                        type: 'GET',
                        url: 'http://localhost:4000/requests/'

                    }
                })
            } else {
                res.status(404).json({
                    message: 'Request not found'
                });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

};