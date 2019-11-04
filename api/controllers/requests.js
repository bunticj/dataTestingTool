const RequestDoc = require('../models/requests');
const ResponseDoc = require('../models/responses');
const mongoose = require('mongoose');

const url = require('url');


module.exports.postRequest = (req, res, next) => {

    const reqMethod = req.body.method.toLowerCase();
    const reqUrl = req.body.url;
    const reqHeaders = req.body.headers;
    const reqTitle = req.body.title;
    const reqDescription = req.body.description;
    const reqLabel = req.body.label || 'Unsorted';
    const reqTag = req.body.tag;
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
    console.log(req.userData, 'userdataaaaaa');
    var requestDoc = new RequestDoc({
        _id: new mongoose.Types.ObjectId(),
        url: reqUrl,
        baseUrl: url.parse(reqUrl).host,
        path: url.parse(reqUrl).pathname,
        queryParams: reqQueryObj || 0,
        method: reqMethod,
        headers: reqHeaders,
        requestCreatedAt: new Date().toISOString(),
        title: reqTitle,
        description: reqDescription,
        label: reqLabel,
        creatorId: req.userData._id,
        creatorEmail: req.userData.email,
        tag: reqTag
        //responseId : responseDoc._id
    });
    requestDoc.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Request created',
                createdRequest: result

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

    const reqId = req.params.requestId;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;

        if (ops.propName === 'verified' && ops.value == 'true') {
            var verifByUser = req.userData._id
            var verifEmail = req.userData.email;
            var verifAt = new Date().toISOString();
            console.log('Usao u if');


        }


    }
    RequestDoc.findByIdAndUpdate({
            _id: reqId
        }, {
            $set: updateOps
        }, {
            new: true
        })
        .exec()
        .then(result => {
            result.updatedAt.push(new Date().toISOString());
            result.verifiedByUser = verifByUser || null;
            result.requestVerifiedAt = verifAt || null;
            result.verifiedByUserEmail = verifEmail || null;
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




module.exports.deleteRequest = (req, res, next) => {

    const reqId = req.params.requestId

    //delete request
    RequestDoc.deleteOne({
            _id: reqId
        })
        .exec()
        .then(result => {

            //delete all responses with deleted requestId
            ResponseDoc.deleteMany({
                requestId: reqId
            }, (err) => {
                if (err) {
                    throw new Error('Unable to delete response');
                }
            });

            res.status(200).json({
                message: 'Request and his response deleted!'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}