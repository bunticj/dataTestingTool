const { body , validationResult } = require('express-validator');

module.exports.reqValidationRules =  () => {
   return [
    body('url')
    .not().isEmpty().withMessage('Field is empty'),

    body('method')
    .not().isEmpty().withMessage('Field is empty'),

    body('title')
    .not().isEmpty().withMessage('Field is empty'),

    body('description')
    .not().isEmpty().withMessage('Field is empty')

]
}


module.exports.validate= (req,res,next) =>{
    const errors = validationResult(req);
    if (errors.isEmpty()){
        return next()
    }
        return res.status(400).json({
            errors : errors.array()
        });
    }


  