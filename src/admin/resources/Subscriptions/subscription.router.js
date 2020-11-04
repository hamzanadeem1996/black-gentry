import express from 'express';
import subscrptionController from '../Subscriptions/subscription.controller';
import session from 'express-session';
export const subscriptionRouter = express.Router();
var flash = require('connect-flash');
//Check Auth
function authChecker(req, res, next) {
    if (req.session.email) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}
subscriptionRouter.use(flash());
subscriptionRouter.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

subscriptionRouter.get('/list',authChecker,subscrptionController.index)

subscriptionRouter.get('/view/:id',authChecker,subscrptionController.view)

