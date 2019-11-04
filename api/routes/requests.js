const express = require('express');
const router = express.Router();
const RequestController = require('../controllers/requests');
const ResponseController=require('../controllers/responses');
const {
    reqValidationRules,
    validate
} = require('../middlewares/validator');
const authCheck = require('../middlewares/auth');


//add new request
router.post('/',  authCheck,reqValidationRules(), validate, RequestController.postRequest);
//get all requests
router.get('/',  authCheck,RequestController.getRequest);
//get single request
router.get('/:requestId', authCheck,RequestController.getSingleRequest);
//get all responses from the same request
router.get('/:requestId/responses',authCheck,ResponseController.getConnectedResponses);
//update request
router.patch('/:requestId',authCheck,RequestController.updateRequest);
//delete request
router.delete('/:requestId',authCheck,RequestController.deleteRequest);

module.exports = router;