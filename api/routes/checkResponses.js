const express = require('express');
const router = express.Router();
const checkResponseController = require('../controllers/checkResponses');
const authCheck = require('../middlewares/auth');

router.get('/',authCheck,(req,res,next) =>res.status(200).json({message : 'Add responseIds in array to check responses'}));

//check if responses data are equal
router.post('/',authCheck,checkResponseController.check);

module.exports = router;