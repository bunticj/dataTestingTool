const express = require('express');
const router = express.Router();
const axiosController = require('../controllers/axiosRequests');
 const authCheck = require('../middlewares/auth');

// axios request with  "GET" method
router.post('/',authCheck,axiosController.axiosRequest);

module.exports=router;