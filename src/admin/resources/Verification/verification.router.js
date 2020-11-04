import express from 'express';
import verificationController from '../Verification/verification.controller';
import session from 'express-session';
export const verificationRouter = express.Router();
var flash = require('connect-flash');
//Check Auth
function authChecker(req, res, next) {
    if (req.session.email) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}
verificationRouter.use(flash());
verificationRouter.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
verificationRouter.get('/list',authChecker,verificationController.index)
verificationRouter.get('/rejectlist',authChecker,verificationController.rejectlist)



verificationRouter.get('/view/:id',authChecker,verificationController.view)
// verificationRouter.get('/delete/:id',authChecker,verificationController.userdelete)

verificationRouter.get('/change-active-status/:id',authChecker,verificationController.changeActiveStatus)
verificationRouter.get('/change-inactive-status/:id',authChecker,verificationController.changeInActiveStatus)

verificationRouter.get('/change-verify-status/:id',authChecker,verificationController.changeVerifyStatus)
verificationRouter.get('/change-deny-status/:id',authChecker,verificationController.changeDenyStatus)

verificationRouter.get('/change-delete-status/:id',authChecker,verificationController.DeleteStatus)
