const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

router.get('/',UserController.getAllUsers);

router.get('/:userId',UserController.getUserById );

router.post('/',UserController.addUser );

router.delete('/:userId',UserController.deleteUser );

router.patch('/:userId',UserController.updateUser );


module.exports = router;