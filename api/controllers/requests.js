const RequestDoc = require('../models/requests');
const mongoose = require('mongoose');

const url = require('url');


module.exports.postRequest = (req, res, next) => {

    const reqMethod = req.body.method.toLowerCase();
    const reqUrl = req.body.url;
    const reqHeaders = req.body.headers;
    const reqTitle = req.body.title;
    const reqDescription = req.body.description;
    const reqLabel = req.body.label || 'Unsorted';

    const reqQueryString = url.parse(reqUrl).query;
    //check queries in url ,and handle if there is one,none or many
    if (reqQueryString) {
        var reqQueryObj = {};

        if (reqQueryString.indexOf('&') > -1) {
            let splittedQuery = reqQueryString.split('&');
            splittedQuery.forEach(element => {
                let splittedElem = element.split('=');
                console.log(splittedElem, 'splitted in array ')
                reqQueryObj[splittedElem[0]] = splittedElem[1];
            });
        } else {
            let splittedQuery = reqQueryString.split('=');
            reqQueryObj[splittedQuery[0]] = splittedQuery[1];
        }
    }
    //save request in db                     
    const requestDoc = new RequestDoc({
        _id: new mongoose.Types.ObjectId(),
        url: reqUrl,
        baseUrl: url.parse(reqUrl).host,
        path: url.parse(reqUrl).pathname,
        queryParams: reqQueryObj || 0,
        method: reqMethod,
        requestHeaders: reqHeaders,
        requestCreatedAt: new Date().toISOString(),
        title: reqTitle,
        description: reqDescription,
        label: reqLabel,
        creatorId: req.userData._id,
        creatorEmail: req.userData.email
        //responseId : responseDoc._id
    });
    requestDoc.save()
        .exec()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Request created',
                createdRequest : result

            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });



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
                            url: `${req.headers.host}/requests/${doc._id}`
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
                        url: `${req.headers.host}/requests`
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

module.exports.updateRequest = (req, res, next) => {
    const reqId = req.params.requestId

    if (Object.keys(req.body).length > 0) {

        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        RequestDoc.findByIdAndUpdate({
                _id: reqId
            }, {
                $set: updateOps,
                updatedAt: new Date().toISOString()
            }, {
                new: true
            })
            .exec()
            .then(result => {
                // console.log(result);
                res.status(200).json({
                    message: 'Request updated',
                    updatedRequest: result
                })


            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }


}