import express from 'express'
import passport from 'passport'
import settingController from './setting.controller'
import authorization from '../../middlewares/authentication/verifyauthentication' 


export const settingRouter = express.Router()



settingRouter.get('/',authorization.verifyauthentication, settingController.getAll)
settingRouter.put('/',authorization.verifyauthentication, settingController.update)
settingRouter.put('/getSuperLikes',authorization.verifyauthentication, settingController.getSuperLikes)




