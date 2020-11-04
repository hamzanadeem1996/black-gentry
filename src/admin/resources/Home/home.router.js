import express from 'express';
import homeController from '../Home/home.controller';
import session from 'express-session';
var flash = require('connect-flash');
export const homeRouter = express.Router();
//Check Auth

function authChecker(req, res, next) {
    console.log("-------RESPONSEEEEEEEE-----------",res)
    if (req.session.email) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}
homeRouter.use(flash());
homeRouter.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

homeRouter.get('/dashboard',authChecker,homeController.dashboard)
homeRouter.get('/login',homeController.index)
homeRouter.post('/login',homeController.login)

homeRouter.get('/forgetpassword',homeController.getforgetpassword)
homeRouter.post('/forgetpassword',homeController.forgetpassword)

homeRouter.get('/resetpassword/:token',homeController.getresetpassword)
homeRouter.post('/resetpassword/:token',homeController.resetpassword)


homeRouter.get('/changepassword',authChecker,homeController.getchangepassword)
homeRouter.post('/changepassword',authChecker,homeController.changepassword)

homeRouter.get('/logout',authChecker,homeController.logout)
 

// homeRouter.get('/register',homeController.getregister) 
// homeRouter.post('/register',homeController.register)