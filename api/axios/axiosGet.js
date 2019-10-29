const mongoose = require('mongoose');
const url = require('url');
const axios = require('axios');

const RequestDoc = require('../models/requests');
const ResponseDoc = require('../models/responses');



module.exports.getAxios = (reqUrl,reqHeaders,reqTitle,reqDescription,reqLabel,res) => {
    
//handle axios get request
axios.get(reqUrl, {
    headers: reqHeaders
})
.then(response => {
    const reqQueryString = url.parse(response.config.url).query;
    //check queries in url ,and handle if there is one,none or many
    if (reqQueryString) {
        var reqQueryObj = {};
        
        if (reqQueryString.indexOf('&') > -1) {
            let splittedQuery = reqQueryString.split('&');
            splittedQuery.forEach(element => {
                let splittedElem = element.split('=');
                console.log(splittedElem,'splitted in array ')
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
        url: response.config.url,
        host: url.parse(response.config.url).host,
        pathname: url.parse(response.config.url).pathname,
        query: reqQueryObj || 0,
        method: response.config.method,
        requestHeaders: response.config.headers,
        requestCreatedAt : new Date().toISOString(),
        title : reqTitle,
        description : reqDescription,
        label : reqLabel
    });
    requestDoc.save((err, req) => {
        if (err) {
            
            throw err;
        }
        console.log(req);
    });


    //save response in db
    const responseDoc = new ResponseDoc({
       _id : new mongoose.Types.ObjectId(),
       responseData : response.data,
       responseText : response.statusText,
       responseStatus : response.status,
       responseHeaders : response.headers,
       responseCreatedAt : new Date().toISOString(),
       requestId: requestDoc._id 
    });
    responseDoc.save((err,response)=> {
        if (err){
            throw err;
        }
        console.log(response);
    })

    res.status(200).json({
        responseDocument : responseDoc,
        requestDocument : requestDoc
        
    });
})
.catch(error => console.log(error))

}