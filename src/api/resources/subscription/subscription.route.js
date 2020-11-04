import express from 'express'
import passport from 'passport'
import subscriptionController from './subscription.controller'
import authorization from '../../middlewares/authentication/verifyauthentication'


export const subscriptionRouter = express.Router()

subscriptionRouter.post('/add', authorization.verifyauthentication, subscriptionController.add)
subscriptionRouter.get('/getDetails', authorization.verifyauthentication, subscriptionController.getDetails)
subscriptionRouter.put('/updateSubscription', authorization.verifyauthentication, subscriptionController.updateSubscription)
subscriptionRouter.post('/checksubscription', authorization.verifyauthentication, subscriptionController.subscription)



