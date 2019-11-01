const UserDoc = require('../models/users');
const mongoose = require('mongoose');


module.exports.getAllUsers = (req, res, next) => {
    UserDoc.find()
        .exec()
        .then(result => {
            const response = {
                userNumber: result.length,
                users: result.map(doc => {
                    return {
                        user: doc,
                        request: {
                            type: 'GET',
                            url: `${req.headers.host}/users/${doc._id}`
                        }
                    }
                })
            };
            console.log(req.headers.host);
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
    UserDoc.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            if (result) {
                res.status(200).json({
                    user: result,
                    request: {
                        type: 'GET',
                        description: 'Get all users',
                        url: `${req.headers.host}/users/`
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
    const user = new UserDoc({
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
                        url: `${req.headers.host}/users/${result.id}`
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
    UserDoc.remove({
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
    UserDoc.update({
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
                    url: `${req.headers.host}/users/${id}`

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