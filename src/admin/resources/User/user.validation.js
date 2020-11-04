import Joi from 'joi';

export default {
  
  validateUser(body) {
    const schema = Joi.object().keys({
        firstName: Joi.string().required(''),
        lastName: Joi.string().allow(''),
        dob: Joi.string().allow(''),
        gender: Joi.string().allow(''),
        PhoneNo: Joi.string().allow(''),
        email: Joi.string().email().allow(''),
        submit: Joi.string().allow(''),
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
