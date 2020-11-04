import express from 'express';
import tokenController from '../Tokens/token.controller';
import session from 'express-session';
export const tokenRouter = express.Router();
var flash = require('connect-flash');
//Check Auth
function authChecker(req, res, next) {
    if (req.session.email) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}
tokenRouter.use(flash());
tokenRouter.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

tokenRouter.get('/list',authChecker,tokenController.index)

tokenRouter.get('/view/:id',authChecker,tokenController.view)

