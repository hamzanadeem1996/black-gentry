import Joi from 'joi'

export default {
    validateReact(body) {
        const schema = Joi.object().keys({
            toId: Joi.number().required().label('Match Id'),
            reaction: Joi.string().required().label('Reaction')
        })
        const { value, error } = Joi.validate(body, schema, {abortEarly: false})
        if (error && error.details) {
            let data = {error: true, message: error.details[0].message, details: error.details }
            return data
        } else {
            return value
        }
    },


}
