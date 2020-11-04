import subscriptionValidation from './subscription.validation'
import subscriptionService from './subscription.service'
var HttpStatus = require('http-status-codes')


export default {

    async add(req, res) {

        try {
            const validates = await subscriptionValidation.validateAddSubscription(req.body)
            if (validates.error == true) {                   /// if validations failed
                return res.status(400).json(validates).end()
            }
            console.log("----------------------CONTROLLER")

            await subscriptionService.add(req.user.id , req.body).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    async getDetails(req, res) {
        try {

             subscriptionService.getDetails(req.user.id).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    },
    
    async updateSubscription(req, res) {
        try {
            const validates = await subscriptionValidation.validateSubscription(req.body)
            if (validates.error == true) {                   /// if validations failed
                return res.status(400).json(validates).end()
            }

             subscriptionService.updateSubscription(req.user.id,req.body).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    },
    async subscription(req, res) {

        try {
            const validates = await subscriptionValidation.validateAddSubscription(req.body)
            if (validates.error == true) {                   /// if validations failed
                return res.status(400).json(validates).end()
            }
            console.log("----------------------CONTROLLER")

            await subscriptionService.subscription(req.user.id , req.body).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    },

}