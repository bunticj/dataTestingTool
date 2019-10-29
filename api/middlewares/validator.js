const { check , validationResult } = require('express-validator');

module.exports.checkPostReq =() => {
[
    check('url')
    .not().isEmpty().withMessage('Field is empty'),

    check('method')
    .not().isEmpty().withMessage('Field is empty'),

    check('title')
    .not().isEmpty().withMessage('Field is empty'),

    check('description')
    .not().isEmpty().withMessage('Field is empty')

]
}
module.exports.validationResult = (req) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);

        return res.status(400).json({
            errors : errors.array()
        });
    }
}

  