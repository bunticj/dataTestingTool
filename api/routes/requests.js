const express = require('express');
const router = express.Router();
const RequestController = require('../controllers/requests');

//post request , calling method from controller
router.post('/',RequestController.postRequest);

module.exports = router;
