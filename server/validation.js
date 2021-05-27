const Joi = require('joi');

//VALIDATION
const registerValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        username: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

const postValidation = data => {
    const schema = Joi.object({
        userID: Joi.string().required(),
        image: Joi.required(),
        description: Joi.string().required()
    })
    return schema.validate(data);
}

const commentValidation = data => {
    const schema = Joi.object({
        postID: Joi.string().required(),
        userID: Joi.string().required(),
        commentText: Joi.string().required()
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
module.exports.commentValidation = commentValidation;