import joi from "joi";

const signup_schema = joi.object({
    name: joi.string().required(),
    email: joi.string().max(50).required(),
    password: joi.string().max(50).required(),
    image: joi.string().required()
});

const signin_schema = joi.object({
    email: joi.string().max(50).required(),
    password: joi.string().max(50).required()
});

export {
    signup_schema,
    signin_schema
};