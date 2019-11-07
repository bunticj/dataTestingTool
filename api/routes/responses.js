const express = require('express');
const router = express.Router();

const authCheck = require('../middlewares/auth');
const ResponseController = require('../controllers/responses');

//get all responses
router.get('/',authCheck,ResponseController.getAllResponses);
//get response by id
router.get('/:responseId',authCheck,ResponseController.getSingleResponse);
//update response
router.patch('/:responseId',authCheck,ResponseController.updateResponse);
//delete response
router.delete('/:responseId',authCheck,ResponseController.deleteResponse);

module.exports = router;