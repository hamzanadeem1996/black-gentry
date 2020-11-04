import Joi from 'joi'

export default {
    validateUpdate(body) {
        const schema = Joi.object().keys({
            visible: Joi.string().allow('').label('Visibility'),
            maxAgePrefer: Joi.number().allow('').label('Maximum Age Preference'),
            minAgePrefer: Joi.number().allow('').label('Minimum Age Preference'),
            distance: Joi.number().allow('').label('Max Distance'),
            chatNotify: Joi.string().allow('').label('Chat Notifier'),
            matchNotify: Joi.string().allow('').label('Match Notification'),
            expiredMatches: Joi.string().allow('').label('Expired Matches'),
            matchUpdates: Joi.string().allow('').label('Matches Updates')                
        })
        const { value, error } = Joi.validate(body, schema, {abortEarly: false})
        if (error && error.details) {
            let data = {error: true, message: error.details[0].message, details: error.details }
            return data
        } else {
            return value 
        }
    },

    validateGetSuperLikes(body) {
        const schema = Joi.object().keys({
            superLikesCount: Joi.number().required().label('superLikesCount'),
            // maxAgePrefer: Joi.number().allow('').label('Maximum Age Preference'),
            // minAgePrefer: Joi.number().allow('').label('Minimum Age Preference'),
            // distance: Joi.number().allow('').label('Max Distance'),
            // callNotify: Joi.string().allow('').label('Call Notification'),
            // matchNotify: Joi.string().allow('').label('Match Notification')
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
