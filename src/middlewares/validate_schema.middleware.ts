
import Joi from "joi";


function validateDataBySchema(data: {}, schema: Joi.ObjectSchema){
    const validation = schema.validate(data, {abortEarly: false});
    if(validation.error) {
       const errors = validation.error.details.map(value => value.message);
       return errors
    } else {
        return false
    }
}

export {validateDataBySchema}