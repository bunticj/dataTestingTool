const express = require('express');
const router = express.Router();

const authCheck = require('../middlewares/auth');
const ResponseController = require('../controllers/responses');

//get all responses
router.get('/',authCheck,ResponseController.getAllResponses);


module.exports = router;