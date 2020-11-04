let jwt            = require('jsonwebtoken');
var  secret        = 'BlackGentryManagementSystem'
const Login = require('../../../../models').Logins

  let verifyauthentication = (req, res, next) => {
    if(!(req.headers['x-access-token'] || req.headers['authorization'])){
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
          });
    }    
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {


    jwt.verify(token, secret,async (err, user) => {
      if (err) {
        console.log('-----------verify',err)
        return res.json({
          
          success: false,
          message: 'Please login to continue',
          error:{code:401},
        });
      } else {
        var users = await Login.findOne({
                                  where: { auth_token : token, userId: user.id} 
                       })

                       console.log('-----------verify',user.id)

       if(users){
          req.user = user;
          req.auth_token = token
          next();
       }else{

        return res.json({
          success: false,
          message: 'Please login to continue',
          error:{code:401},
        });
       }
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  verifyauthentication: verifyauthentication
}