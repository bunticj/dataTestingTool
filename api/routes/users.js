const express = require('express');
const router = express.Router();

const {userValidationRules,validate} = require('../middlewares/validator');
const authCheck = require('../middlewares/auth');
const UserController = require('../controllers/users');

router.get('/users',authCheck,UserController.getAllUsers);

router.get('/users/:userId',authCheck,UserController.getUserById );

router.post('/register',userValidationRules(),validate,UserController.addUser );
router.post('/login',UserController.loginUser);
router.delete('/users/:userId',authCheck,UserController.deleteUser );

router.patch('/:userId',authCheck,UserController.updateUser );


module.exports = router;