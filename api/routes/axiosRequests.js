const express = require('express');
const router = express.Router();
const axiosController = require('../controllers/axiosRequests');
 const authCheck = require('../middlewares/auth');


router.post('/',authCheck,axiosController.getAxios);

module.exports=router;