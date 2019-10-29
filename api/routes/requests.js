const express = require('express');
const router = express.Router();

const RequestController = require('../controllers/requests');


router.post('/',RequestController.postRequest);

module.exports = router;
