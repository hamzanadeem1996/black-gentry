import Joi from 'joi'
import bcrypt from 'bcryptjs'

export default {
  
    validateAddSubscription(body) {
        const schema = Joi.object().keys({
            subscriptionId: Joi.string().label('Subscription Id'),
            loginType: Joi.string().label('Login Type'),
            orderId: Joi.string().label('Order Id'),
            purchaseToken: Joi.string().allow(null,'').label('Purchase Token'),
            purchaseTime: Joi.string().label('Purchase Time'),
            signature: Joi.string().allow(null,'').label('Signature'),
            purchaseState:  Joi.string().allow(null,'').label('Purchase State'),
            autoRenewing: Joi.number().label('Auto Renewing'),
            price: Joi.number().label('Price'),
            subscriptionPeriod: Joi.number().label('Subscription Period'),
        })
        const { value, error } = Joi.validate(body, schema, { abortEarly: false })
        if (error && error.details) {
            let data = { error: true, message: error.details[0].message, details: error.details }
            return data
        } else {
            return value
        }
    },

    validateSubscription(body) {
        const schema = Joi.object().keys({
            subscriptionId: Joi.string().required().label('Subscription Id'),
            subscriptionStatus: Joi.string().required().label('Subscription Status')
        })
        const { value, error } = Joi.validate(body, schema, { abortEarly: false })
        if (error && error.details) {
            let data = { error: true, message: error.details[0].message, details: error.details }
            return data
        } else {
            return value
        }
    },
}
