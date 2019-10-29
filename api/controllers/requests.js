const getAxios = require('../axios/axiosGet').getAxios;
const validationResult = require('../middlewares/validator').validationResult;
const checkPostReq = require('../middlewares/validator').checkPostReq;


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
