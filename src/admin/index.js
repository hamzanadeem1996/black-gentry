import express from 'express';
import { homeRouter } from './resources/Home/home.router';
import { userRouter } from './resources/User/user.router';
import { matchRouter } from './resources/Match/match.router';
import { reportRouter } from './resources/Report/report.router';
import { verificationRouter } from './resources/Verification/verification.router';
import { subscriptionRouter } from './resources/Subscriptions/subscription.router';
import { tokenRouter } from './resources/Tokens/token.router';


export const adminRouter = express.Router();


adminRouter.use('/', homeRouter);
adminRouter.use('/users', userRouter);
adminRouter.use('/matches',matchRouter)
adminRouter.use('/complaints',reportRouter)
adminRouter.use('/verifications',verificationRouter)
adminRouter.use('/subscriptions',subscriptionRouter)
adminRouter.use('/tokens',tokenRouter)

