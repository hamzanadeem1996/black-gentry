import express from 'express'
import passport from 'passport'
import matchController from './match.controller'
import authorization from '../../middlewares/authentication/verifyauthentication' 



export const matchRouter = express.Router()



// matchRouter.get('/',authorization.verifyauthentication, matchController.getAll)
matchRouter.get('/:pageNumber/',authorization.verifyauthentication, matchController.getAll)

matchRouter.post('/react',authorization.verifyauthentication, matchController.react)
matchRouter.post('/react/v1',authorization.verifyauthentication, matchController.reactForV1)
matchRouter.post('/react/v2',authorization.verifyauthentication, matchController.reactForV2)

// matchRouter.post('/reactFor',authorization.verifyauthentication, matchController.reactFor)

// matchRouter.get('/list',authorization.verifyauthentication, matchController.list)
matchRouter.get('/list/:pageNumber',authorization.verifyauthentication, matchController.list)
matchRouter.get('/newMatchList/:pageNumber',authorization.verifyauthentication, matchController.newMatchList)

matchRouter.get('/getMatchData/:id',authorization.verifyauthentication, matchController.getMatchData)


matchRouter.post('/proposeTime',authorization.verifyauthentication, matchController.proposeTime)
matchRouter.get('/getproposeTime/:id',authorization.verifyauthentication, matchController.getproposeTime)

matchRouter.get('/getAnswers/:id', authorization.verifyauthentication, matchController.getAnswers)

matchRouter.delete('/rewind/:id', authorization.verifyauthentication, matchController.rewind)
matchRouter.delete('/unmatch/:id', authorization.verifyauthentication, matchController.unmatch)

matchRouter.post('/addTimeTokens',authorization.verifyauthentication, matchController.addTimeTokens)
matchRouter.post('/addSuperLikes',authorization.verifyauthentication, matchController.addSuperLikes)
matchRouter.post('/applyTimeTokens',authorization.verifyauthentication, matchController.applyTimeTokens)
matchRouter.delete('/delete/chat', matchController.chatDelete)

// matchRouter.get('/:matchId',passport.authenticate('jwt', { session: false }), matchController.getById)




 