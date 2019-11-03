const ResponseDoc = require('../models/responses');
const mongoose = require('mongoose');


module.exports.getAllResponses = (req,res,next) =>{

    ResponseDoc.find()
    .exec()
    .then(result => {
        const response = {
            totalRecordCount: result.length,
            responses: result.map(doc => {
                return {
                    response: doc,
                    getRequest: {
                        type: 'GET',
                        url: `${req.headers.host}/requests/${doc.requestId}`
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

