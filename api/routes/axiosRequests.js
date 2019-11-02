const express = require('express');
const router = express.Router();
const axiosController = require('../controllers/axiosRequests');


router.post('/',axiosController.getAxios);

module.exports=router;