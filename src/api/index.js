import express from 'express'
import { userRouter } from './resources/user/user.route'
import { matchRouter } from './resources/matches/match.route'
import { settingRouter } from './resources/settings/setting.route'
import { chatRouter } from './resources/chat/chat.router'
import { subscriptionRouter } from './resources/subscription/subscription.route'



export const apiRouter = express.Router()

apiRouter.use('/users',userRouter) 
apiRouter.use('/matches', matchRouter)
apiRouter.use('/settings', settingRouter)
apiRouter.use('/chat', chatRouter)
apiRouter.use('/subscription', subscriptionRouter)