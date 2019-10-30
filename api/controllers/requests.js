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
                requestNumber: result.length,
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