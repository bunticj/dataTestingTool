const express = require('express');
const router = express.Router();
const {
    userValidationRules,
    validate
} = require('../middlewares/validator');
const authCheck = require('../middlewares/auth');
const UserController = require('../controllers/users');


router.get('/',(req,res,next) => res.status(200).send('Log in or register to proceed'));
//register user
router.post('/register', userValidationRules(), validate, UserController.addUser);
router.get('/register', (req,res,next)=> res.status(200).send('Register'));

//login user
router.post('/login', UserController.loginUser);
router.get('/login', (req,res,next)=> res.status(200).send('Log in to proceed..'));

//get all users
router.get('/users', authCheck, UserController.getAllUsers);
//get single user
router.get('/users/:userId', authCheck, UserController.getUserById);
//update user
router.patch('/users/:userId', authCheck, UserController.updateUser);
//delete user
router.delete('/users/:userId', authCheck, UserController.deleteUser);



module.exports = router;