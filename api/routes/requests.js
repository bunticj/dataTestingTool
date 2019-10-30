const express = require('express');
const router = express.Router();
const RequestController = require('../controllers/requests');
const {reqValidationRules,validate} = require('../middlewares/validator');


router.post('/', reqValidationRules(), validate, RequestController.postRequest);

router.get('/', RequestController.getRequest);

module.exports = router;
