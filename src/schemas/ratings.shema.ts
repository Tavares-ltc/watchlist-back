import joi from "joi";

const post_rating = joi.object({
    watchlist_id: joi.number().required(),
    stars: joi.number().min(1).max(5).integer().required(),
    comment: joi.string().allow("").required()
});

const patch_rating = joi.object({
    rating_id: joi.number().integer().required(),
    stars: joi.number().min(1).max(5).integer().required()
});

const patch_comment = joi.object({
    rating_id: joi.number().integer().required(),
    comment: joi.string().allow("").required()
});

export {
    post_rating,
    patch_rating,
    patch_comment
};


