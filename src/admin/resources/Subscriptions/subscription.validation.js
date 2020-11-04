import Joi from 'joi';

export default {
  
  validateUser(body) {
    const schema = Joi.object().keys({

    });
    const { value, error } = Joi.validate(body, schema, {abortEarly: false});
    if (error && error.details) {
      let data = {error: true, message: error.details[0].message };
      return data;
    } else {
        return value;
    }
},
};
