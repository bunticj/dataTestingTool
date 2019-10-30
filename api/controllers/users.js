const User = require('../models/users');
const mongoose = require('mongoose');


module.exports.getAllUsers = (req, res, next) => {
    User.find()
        .exec()
        .then(result => {
            const response = {
                userNumber: result.length,
                users: result.map(doc => {
                    return {
                        user: doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/users/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

module.exports.getUserById = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            if (result) {
                res.status(200).json({
                    user: result,
                    request: {
                        type: 'GET',
                        description: 'Get all users',
                        url: 'http://localhost:4000/users/'
                    }
                })
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });;
};
module.exports.addUser = (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password,
        created_at: new Date().toISOString()

    });
    user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'User created',
                createdUser: {
                    _id: result._id,
                    email: result.email,
                    password: result.password,
                    created_at: result.created_at,
                    request: {
                        type: 'GET',
                        description : 'Get single user',
                        url: 'http://localhost:4000/users/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

module.exports.deleteUser = (req, res, next) => {
    const id = req.params.userId;
    User.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted!'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
//In postman ,use array of objects with propName:key,propValue:value 
module.exports.updateUser = (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'User updated',
                request: {
                    type: 'GET',
                    description: 'Get user',
                    url: 'http://localhost:4000/users/' + id

                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};