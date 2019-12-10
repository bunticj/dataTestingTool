const express = require('express');
const router = express.Router();

const authCheck = require('../middlewares/auth');
const TagLabelController = require('../controllers/tag-label.js');


router.get('/labels', authCheck, TagLabelController.getLabels);
router.get('/tags', authCheck, TagLabelController.getTags);


module.exports = router;