import express from 'express';
import matchController from '../Match/match.controller';
import session from 'express-session';
export const matchRouter = express.Router();
var flash = require('connect-flash');
//Check Auth
function authChecker(req, res, next) {
    if (req.session.email) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}
matchRouter.use(flash());
matchRouter.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
matchRouter.get('/list',authChecker, matchController.index)
matchRouter.get('/callList',authChecker, matchController.callList)
matchRouter.get('/view/:id',authChecker, matchController.view)


