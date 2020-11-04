//const PushNotification = require('push-notification');
var FCM = require('fcm-push');
var path = require('path');
var apn = require('apn'); 
//const env = process.env;
//if(env.NODE_ENV == 'production')
//{
  
  //env.BASEURL='https://app.blackgentryapp.com/'

  
//}else
//{

  //env.BASEURL='http://localhost:3020/'

//}
export class pushConfig {
    async iosConfig(){
      var options = {
        token: {
          key: path.resolve('./src/cert/AuthKey_S72FU3JG52.p8'),
           keyId: 'S72FU3JG52',
         //  keyId:'',
         //  teamId:''
        teamId: 'M6G46K3C8R'
        },
        production: true
      };
      
      var pn = new apn.Provider(options)
        
        return pn;
    } 

    async androidConfig() {
      var pn =  new FCM('AAAAZPtngts:APA91bEu_4xxqUMikC-BhbTYkdWlj_FPVf52SYjjJgqrAstbEsLgyy0Qq98NgExGJc1JiX6kl7ltCNK26tx3x6NG9ZfnHLS3jSf3qPTzXUZpijREDQeQXGZkAY6L4X7R0PnijL7YH4k5');
      
        return pn;
		
    }
}
export default new pushConfig();