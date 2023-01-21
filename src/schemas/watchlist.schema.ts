import Joi from "joi";

const movie_schema = Joi.object({
    movie_id: Joi.number().required()
});


export {
    movie_schema
};