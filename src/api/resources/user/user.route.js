import express from 'express'
import passport from 'passport'
import userController from './user.controller'
import authorization from '../../middlewares/authentication/verifyauthentication' 


// import Instagram from 'node-instagram';


export const userRouter = express.Router()



userRouter.post('/login', userController.login)
userRouter.post('/appleLogin', userController.appleLogin)
userRouter.post('/verifyOtp', userController.verifyOtp)
userRouter.post('/resendOtp', userController.resendOtp)
userRouter.get('/roles', userController.roles)
userRouter.post('/linkedin',userController.linkedin)

userRouter.post('/phone/send-otp', userController.sendPhoneOtp);
userRouter.post('/phone/verify-otp', userController.verifyPhoneOtp);
userRouter.post('/phone/resend-otp', userController.resendPhoneOtp);
userRouter.post('/email/send-otp', userController.sendEmailOtp);

userRouter.post('/command', function(req, res) {

    var cmd=require('node-cmd');
    cmd.run('npx sequelize db:migrate');
    cmd.run('npx sequelize db:seed:all');

  })
  

userRouter.post('/latlong', authorization.verifyauthentication, userController.latlong)


// userRouter.post('/latlong', passport.authenticate('jwt', { session: false }), userController.latlong)
userRouter.post('/uploadImages', authorization.verifyauthentication, userController.uploadImages)
userRouter.post('/replaceImages', authorization.verifyauthentication, userController.replaceImages)
userRouter.post('/selfies', authorization.verifyauthentication, userController.selfies)


userRouter.post('/reportUser', authorization.verifyauthentication, userController.reportUser)
userRouter.post('/updateProfile', authorization.verifyauthentication, userController.updateProfile)
userRouter.post('/answersProfile', authorization.verifyauthentication, userController.answersProfile)
userRouter.post('/contactShare', authorization.verifyauthentication, userController.contactShare)
userRouter.get('/profile', authorization.verifyauthentication, userController.profile)
userRouter.get('/list',  authorization.verifyauthentication,userController.userList)
userRouter.delete('/deleteprofile', authorization.verifyauthentication, userController.deleteProfile)

userRouter.put('/imageOrder', authorization.verifyauthentication, userController.imageOrder)
userRouter.delete('/deleteimage/:id', authorization.verifyauthentication, userController.deleteimage)


userRouter.get('/logout',  authorization.verifyauthentication,userController.logout)
userRouter.get('/instaToken/:token',  authorization.verifyauthentication,userController.instaToken)

userRouter.get('/compressImage',  authorization.verifyauthentication,userController.compressOld)

