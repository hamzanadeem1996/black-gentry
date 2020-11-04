import express from 'express';
import reportController from '../Report/report.controller';
import session from 'express-session';
export const reportRouter = express.Router();
var flash = require('connect-flash');
//Check Auth
function authChecker(req, res, next) {
    if (req.session.email) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}
reportRouter.use(flash());
reportRouter.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
reportRouter.get('/list',authChecker,reportController.index)

reportRouter.get('/change-active-status/:id',authChecker,reportController.changeActiveStatus)
reportRouter.get('/active-deactive-status/:id',authChecker,reportController.ActiveStatus)
reportRouter.get('/deactive-active-status/:id',authChecker,reportController.DeactivateStatus)


