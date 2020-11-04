import Joi from 'joi';
export default {
  
    validateLogin (body) {
        console.log("INSIDE THE VALIDATION====================>>>>>>>>>>>>>")

        const schema = Joi.object().keys({
            email: Joi.string().email().required().label('Email'),
            password: Joi.string().required('').label('password'),
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

    validateforget(body) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required().label('email'),
            action: Joi.string().allow('')
        });
        const { value, error } = Joi.validate(body, schema, {abortEarly: false});
        if (error && error.details) {
          let data = {error: true, message: error.details[0].message };
          return data;
        } else {
            return value;
        }
    },

    validatereset(body) {
        const schema = Joi.object().keys({
            otp: Joi.string().required().label('OTP'),
            password: Joi.string().required().label('New Password'),
            confirmpswrd: Joi.string().required().label('Confirm Password'),
            action: Joi.string().allow('')
        });
        const { value, error } = Joi.validate(body, schema, {abortEarly: false});
        if (error && error.details) {
          let data = {error: true, errorData: error.details };
          return data;
        } else {
            return value;
        }
    },

    validatechange(body) {
        const schema = Joi.object().keys({
            oldpassword: Joi.string().required().label('Old Password'),
            password: Joi.string().required().label('New Password'),
            confirmpswrd: Joi.string().required().label('Confirm Password'),
            action: Joi.string().allow('')
        });
        const { value, error } = Joi.validate(body, schema, {abortEarly: false});
        if (error && error.details) {
          let data = {error: true, errorData: error.details };
          return data;
        } else {
            return value;
        }
    },

};
