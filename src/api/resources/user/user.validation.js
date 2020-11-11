import Joi from 'joi'
import bcrypt from 'bcryptjs'

export default {
    validateLogin(body) {
        const schema = Joi.object().keys({
            email: Joi.string().required().label('Email'),
            socialType: Joi.number().label('Social Type'),
            socialId: Joi.string().label('Social Id'),
            deviceType: Joi.string().label('DEVICE TYPE'),
            devicetoken: Joi.string().label('DEVICE TOKEN'),
            linkedinId: Joi.string().label('linkedinId'),
            name: Joi.string().label('NAME'),
        })
        const { value, error } = Joi.validate(body, schema, { abortEarly: false })
        if (error && error.details) {
            let data = { error: true, message: error.details[0].message, details: error.details }
            return data
        } else {
            return value
        }
    },

    validatePhoneOtp(body) {
        const schema = Joi.object().keys({
            phone: Joi.string().required().label('Phone')
        });

        const { value, error } = Joi.validate(body, schema, { abortEarly: false })
        if (error && error.details) {
            let data = { error: true, message: error.details[0].message, details: error.details }
            return data
        } else {
            return value
        }
    },

    validateSendEmailOtp(body) {
        const schema = Joi.object().keys({
            phone: Joi.string().required().label('Phone'),
            email: Joi.string().required().label('Email')
        });

        const { value, error } = Joi.validate(body, schema, { abortEarly: false })
        if (error && error.details) {
            let data = { error: true, message: error.details[0].message, details: error.details }
            return data
        } else {
            return value
        }
    },

    validateVerifyOtpPhone(body) {
        const schema = Joi.object().keys({
            phone: Joi.string().required().label('Phone'),
            otp: Joi.number().required().label('OTP'),
            deviceType: Joi.string().label('DEVICE TYPE'),
            devicetoken: Joi.string().label('DEVICE TOKEN'),
            linkedinId: Joi.string().label('linkedinId')
        });

        const { value, error } = Joi.validate(body, schema, { abortEarly: false })
        if (error && error.details) {
            let data = { error: true, message: error.details[0].message, details: error.details }
            return data
        } else {
            return value
        }
    },

    validateAppleLogin(body) {
        const schema = Joi.object().keys({
            email: Joi.string().label('Email').allow(null,""),
            // socialType: Joi.number().label('Social Type'),
            socialId: Joi.string().label('Social Id'),
            deviceType: Joi.string().label('DEVICE TYPE'),
            devicetoken: Joi.string().label('DEVICE TOKEN'),
            linkedinId: Joi.string().label('linkedinId'),
            name: Joi.string().label('NAME'),
        })
        const { value, error } = Joi.validate(body, schema, { abortEarly: false })
        if (error && error.details) {
            let data = { error: true, message: error.details[0].message, details: error.details }
            return data
        } else {
            return value
        }
    },


    validateLinkedin(body) {
        const schema = Joi.object().keys({
            linkedinId: Joi.string().required().label('linkedinId'),
            name: Joi.string().required().label('name'),
            // socialType: Joi.number().required().label('socialType'),
            // socialId: Joi.string().required().label('socialId'),
            deviceType: Joi.string().required().label('socialId'),
            devicetoken: Joi.string().required().label('socialId')
        })
        const { value, error } = Joi.validate(body, schema, { abortEarly: false })
        if (error && error.details) {
            let data = { error: true, message: error.details[0].message, details: error.details }
            return data
        } else {
            return value
        }
    },

    validateVerifyOtp(body) {
        const schema = Joi.object().keys({
            email: Joi.string().required().label('Email'),
            otp: Joi.number().label('otp'),
            deviceType: Joi.string().label('DEVICE TYPE'),
            devicetoken: Joi.string().label('DEVICE TOKEN'),
            linkedinId: Joi.string().label('linkedinId')
        })
        const { value, error } = Joi.validate(body, schema, { abortEarly: false })
        if (error && error.details) {
            let data = { error: true, message: error.details[0].message, details: error.details }
            return data
        } else {
            return value
        }
    },

    validateUpdateProfile(body) {
        const schema = Joi.object().keys({
            // userid: Joi.number().required('').label('USER ID'),
            name: Joi.string().allow('', null).label('Name'),
            aboutme: Joi.string().allow('', null).label('About Me'),
            dob: Joi.string().allow('', null).label('Date Of Birth'),
            gender: Joi.string().allow('', null).label('Gender'),
            showmeto: Joi.string().allow('', null).label('Show Me To'),
            interested: Joi.string().allow('', null).label('Interested'),
            ethnicity: Joi.string().allow('', null).label('Ethnicity'),
            Kids: Joi.string().allow('', null).label('Kids'),
            height: Joi.string().allow('', null).label('Height'),
            ZodiacSign: Joi.string().allow('', null).label('Zodiac Sign'),
            education: Joi.string().allow('', null).label('Education'),
            school: Joi.string().allow('', null).label('School'),
            occupation: Joi.string().allow('', null).label('Occupation'),
            Relegion: Joi.string().allow('', null).label('Relegion'),
            Political: Joi.string().allow('', null).label('Political'),
            Drink: Joi.string().allow('', null).label('Drink'),
            Smoke: Joi.string().allow('', null).label('Smoke'),
            Exercise: Joi.string().allow('', null).label('Exercise'),
            // intent: Joi.string().allow('',null).label('Intent'),
            // graduation: Joi.string().allow('',null).label('Graduation'),
            // Marital: Joi.string().allow('',null).label('Marital'),
            lookingFor: Joi.string().allow('', null).label('lookingFor'),
            ambitions: Joi.string().allow('', null).label('ambitions'),
            pets: Joi.string().allow('', null).label('pets'),
            City: Joi.string().allow('', null).label('City'),
            Question1: Joi.string().allow('', null).label('Question1'),
            Answer1: Joi.string().allow('', null).label('Answer1'),
            Question2: Joi.string().allow('', null).label('Question2'),
            Answer2: Joi.string().allow('', null).label('Answer2'),
            Question3: Joi.string().allow('', null).label('Question3'),
            Answer3: Joi.string().allow('', null).label('Answer3'),
        })
        const { value, error } = Joi.validate(body, schema, { abortEarly: false })
        if (error && error.details) {
            let data = { error: true, details: error.details }
            return data
        } else {
            return value
        }
    },

    validateLatLong(body) {
        const schema = Joi.object().keys({
            latitude: Joi.string().required().label('Latitude'),
            longitude: Joi.string().required().label('Longitude'),
        })
        const { value, error } = Joi.validate(body, schema, { abortEarly: false })
        if (error && error.details) {
            let data = { error: true, message: error.details[0].message, details: error.details }
            return data
        } else {
            return value
        }
    },

    answersProfile(body) {
        const schema = Joi.object().keys({
            // userId	: Joi.number().required('').label('USER ID'),
            matchId: Joi.number().required('').label('MACTH ID'),
            Answer1: Joi.string().allow('').label('ANSWER 1'),
            Answer2: Joi.string().allow('').label('ANSWER 2'),
            Answer3: Joi.string().allow('').label('ANSWER 3')
        })
        const { value, error } = Joi.validate(body, schema, { abortEarly: false })
        if (error && error.details) {
            let data = { error: true, details: error.details }
            return data
        } else {
            return value
        }
    },

    validateOrder(body) {
        const schema = Joi.object().keys({
            images: Joi.array().label('images'),
        })
        const { value, error } = Joi.validate(body, schema, { abortEarly: false })
        if (error && error.details) {
            let data = { error: true, message: error.details[0].message, details: error.details }
            return data
        } else {
            return value
        }
    }
}
