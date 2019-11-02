const {
    body,
    validationResult
} = require('express-validator');
const User = require('../models/users');


module.exports.reqValidationRules = () => {
    return [
        body('url')
        .not().isEmpty().withMessage('Field is empty'),

        body('method')
        .not().isEmpty().withMessage('Field is empty')
        
        
    ]
};
module.exports.userValidationRules = () => {
    return [
        body('email')
        .not().isEmpty().withMessage('Field is empty')
        .isEmail().withMessage('Email is not valid')
        .custom(value => {
            return User.find({
                    email: value
                })
                .then(user => {
                    if (user.length > 0) {
                        throw new Error('Email address already in use');
                    }
                    return true;
                })
        }),

        body('password')
        .not().isEmpty().withMessage('Field is empty')
        .isLength({
            min: 8
        }).withMessage('Password is required to have minimum 8 characters'),

        body('confirmPassword')
        .not().isEmpty().withMessage('Field is empty')
        .custom((value, {
            req
        }) => {

            if (value !== req.body.password) {
                throw new Error(`Passwords don't match`)
            }
            return true;
        })

    ]
}

module.exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    console.log(errors);
    return res.status(400).json({
        errors: errors.array()
    });
}