const getAxios = require('../axios/axiosGet').getAxios;


module.exports.postRequest = (req, res, next) => {

    const reqMethod = req.body.method.toLowerCase();
    const reqUrl = req.body.url;
    const reqHeaders = req.body.headers;

    
    switch (reqMethod) {
        case 'get':
            getAxios(reqUrl, reqHeaders, res);
            break;

        case 'post' :
            
            break;

        default :
        console.log('Invalid method');
        break;
    }



}
