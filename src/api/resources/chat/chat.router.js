import express from 'express'
import passport from 'passport'
import chatController from './chat.controller'
import authorization from '../../middlewares/authentication/verifyauthentication' 

export const chatRouter = express.Router()

chatRouter.get('/getChatList', authorization.verifyauthentication, chatController.getChatList)

// chatRouter.post('/getMessagelist/:pageNumber', authorization.verifyauthentication, chatController.getMessagelist)


chatRouter.post('/getMessagelist', authorization.verifyauthentication, chatController.getMessagelist)

chatRouter.get('/searchUserlist/:search', authorization.verifyauthentication,chatController.searchUserlist)
// chatRouter.post('/uploadchataudio', authorization.verifyauthentication, chatController.uploadaudio)
// chatRouter.get('/download/:file(*)', authorization.verifyauthentication, chatController.downloadaudio)
chatRouter.post('/add', chatController.sendmessage)

chatRouter.get('/checkunread', authorization.verifyauthentication, chatController.checkunread)
chatRouter.post('/changeStatus/:id',authorization.verifyauthentication, chatController.changeStatus)


chatRouter.post('/getchatstatus', passport.authenticate('jwt', { session: false }),chatController.getsendmessage)
chatRouter.post('/getMessageSend',passport.authenticate('jwt', { session: false }), chatController.sendmessage)

chatRouter.get('/hostlist', passport.authenticate('jwt', { session: false }), chatController.hostInfoIdlist)
chatRouter.get('/hostchatlist', passport.authenticate('jwt', { session: false }), chatController.hostchatlist)
chatRouter.get('/guestInfoIdlist', passport.authenticate('jwt', { session: false }), chatController.guestInfoIdlist)
chatRouter.get('/guestchatlist', passport.authenticate('jwt', { session: false }), chatController.guestchatlist)
