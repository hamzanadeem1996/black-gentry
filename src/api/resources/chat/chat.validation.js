import Joi from 'joi'
export default {
  validatemsg(body) {
    const schema = Joi.object().keys({
      fromid: Joi.number().required(),
      toid: Joi.number().required(),
      msg: Joi.string(),
      // hostuser_id:Joi.number().required(),
      // propertyInfoId:Joi.number(),
      
    });
    const { value, error } = Joi.validate(body, schema, {abortEarly: false});
    if (error && error.details) {
      let data = {error: true, message: error.details[0].message, details: error.details };
      return data;
    } else {
        return value;
    }
  },

  validateMessagelist(body)  {
    const schema = Joi.object().keys({
      toid: Joi.number().required(),
      fromid: Joi.number().required(),
      msg: Joi.string(),
      fromname: Joi.string(),
      frompic: Joi.string()
      // propertyInfoId: Joi.number().required(),
    });
    const { value, error } = Joi.validate(body, schema, {abortEarly: false});
    if (error && error.details) {
      let data = {error: true, message: error.details[0].message, details: error.details };
      return data;
    } else {
        return value;
    }
  },

}