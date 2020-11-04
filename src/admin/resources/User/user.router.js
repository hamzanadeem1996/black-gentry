import express from 'express';
import userController from '../User/user.controller';
import session from 'express-session';
export const userRouter = express.Router();
var flash = require('connect-flash');
//Check Auth
function authChecker(req, res, next) {
    if (req.session.email) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}
userRouter.use(flash());
userRouter.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
userRouter.get('/list',authChecker,userController.index)
userRouter.get('/iosList',authChecker,userController.iosList)
userRouter.get('/androidList',authChecker,userController.androidList)
userRouter.get('/message/:id',authChecker,userController.getmessage)
userRouter.post('/message/:id',authChecker,userController.sendmessage)

userRouter.get('/view-chat/:id',authChecker,userController.viewChatUsers)
userRouter.get('/view-chat-messages/:chatId/:id',authChecker,userController.viewChatMessages)
userRouter.get('/view-chat-messages-reported-user/:chatId/:id',authChecker,userController.viewReportChatMessages)

userRouter.get('/view/:id',authChecker,userController.view)

userRouter.get('/change-active-status/:id',authChecker,userController.changeActiveStatus)
userRouter.get('/change-inactive-status/:id',authChecker,userController.changeInActiveStatus)
userRouter.get('/change-delete-status/:id',authChecker,userController.DeleteStatus)
