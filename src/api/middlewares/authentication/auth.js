import Passport from 'passport'
import PassportJWT from 'passport-jwt'

const Login = require('../../../../models').Logins
var User = require('../../../../models').Users
export const configJWTStrategy = () => {
  const opts = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  }
  Passport.use(
    new PassportJWT.Strategy(opts, (paylod, done) => {
     try{ 
      
        User.findOne({
          where: { id: paylod.id, deletedAt:null, status: 'Active' },
          include : {
            model: Login,
            as: "loginForUser"
          }
        }).then(users =>{
          if (users) {
            
            return done(null, users)
          }
          return done(null, false)
       })
        
     }
     catch(err){
       return done(err)
     }
    })
  )
}
