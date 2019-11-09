const express = require('express');
const router = express.Router();
const axiosController = require('../controllers/axiosRequests');
const authCheck = require('../middlewares/auth');


router.get('/', authCheck, (req, res, next) => res.status(200).json({
    message: 'Add requestId to send request'
}));

// send saved request with axios
router.post('/', authCheck, axiosController.axiosRequest);

module.exports = router;