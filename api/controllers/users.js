const UserDoc = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//add new user and retrieve toke
module.exports.addUser = (req, res, next) => {
    //hash password
    bcrypt.hash(req.body.password, 10, (err, hash) => {

        const user = new UserDoc({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            created_at: new Date().toISOString()

        });
        user.save()
            .then(result => {

                const token = jwt.sign({
                    email: user.email,
                    _id: user._id
                }, process.env.JWT_KEY, {
                    expiresIn: "8h"
                });

                console.log(result);
                res.status(201).json({
                    message: 'User created',
                    createdUser: user,
                    token: token,
                    request: {
                        type: 'GET',
                        description: 'Get single user',
                        url: `${req.headers.host}/users/${result.id}`
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

    })


};

//login user and retrieve token
module.exports.loginUser = (req, res, next) => {
    UserDoc.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            console.log(user);

            //check plain pass with hashed in DB
            bcrypt.compare(req.body.password, user[0].password).then(result => {

                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        _id: user[0]._id
                    }, process.env.JWT_KEY, {
                        expiresIn: "8h"
                    });
                    return res.status(200).json({
                        message: 'Auth succesful',
                        token: token,
                        request: {
                            type: 'GET',
                            url: `${req.headers.host}/users/${user[0]._id}`
                        }
                    });
                }
                return res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}





//get all users
module.exports.getAllUsers = (req, res, next) => {
    //don't show password
    UserDoc.find()
        .select('-password')
        .exec()
        .then(result => {
            const response = {
                totalRecordCount: result.length,
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

//get single user
module.exports.getUserById = (req, res, next) => {
    const id = req.params.userId;
    UserDoc.findById(id)
        .select('-password')

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


//delete user
module.exports.deleteUser = (req, res, next) => {
    const id = req.params.userId;
    if (id === req.userData._id) {
        UserDoc.deleteOne({
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

    } else {
        res.status(401).json({
            message: "Unauthorized!"
        });
    }

};

//In postman : [{"propName":"nameOfkeyToUpdate","value":"valueOfkey" }]
module.exports.updateUser = (req, res, next) => {
    const id = req.params.userId;

    if (id === req.userData._id) {

        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        UserDoc.findOneAndUpdate({
                _id: id
            }, {
                $set: updateOps,
                updatedAt: new Date().toISOString()
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


    } else {
        res.status(401).json({
            message: "Unauthorized!"
        });
    }

};