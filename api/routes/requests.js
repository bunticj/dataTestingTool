const express = require('express');
const router = express.Router();
const RequestController = require('../controllers/requests');
const {
    reqValidationRules,
    validate
} = require('../middlewares/validator');
const authCheck = require('../middlewares/auth');


router.post('/', authCheck, reqValidationRules(), validate, RequestController.postRequest);

router.get('/', authCheck, RequestController.getRequest);

router.get('/:requestId', authCheck, RequestController.getSingleRequest);

module.exports = router;