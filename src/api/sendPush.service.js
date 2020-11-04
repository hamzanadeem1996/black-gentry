const UserLogins = require('../../models').Logins;
import pushConfigs from '../../pushconfig';
var apnote = require('apn');
// FCM.sendToMultipleToken(message, Tokens, function(err, response) {
//     if(err){
//         console.log('err--', err);
//     }else {
//         console.log('response-----', response);
//     }

// })

export default {

    async sendPush(userId, payload) {
        try {
            let pn = await pushConfigs.androidConfig();
            let apn = await pushConfigs.iosConfig();
            var android = [];
            var ios = [];
            const androiddata = {
                data: { notification: payload },
            };

            var note = new apnote.Notification();

            note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
            note.sound = '';
            if (payload.action == 4) {
                note.alert = {
                    "body": payload.message,
                    "title": payload.name
                }
            } else {
                note.alert = payload.message;
            }
            note.payload = payload;
            note.topic = 'com.BlackGentry.osvin';


            await UserLogins.findAll({
                where: {
                    userId: userId
                }

            }).then(async user => {

                for (let token of user) {

                    if (token.deviceType == 'ANDROID') {
                        if (token.devicetoken != null) {
                            androiddata.to = token.devicetoken;//'d3NJEwEcW9g:APA91bEiG-CTYOpf2LSw5sElL7q_eOFC_pnuZaRpGTm5LADZZjd2yUXKXvYkFyZOBRL05uOLAnKRgw8yl8oe9K46w7UZAPjNLmN5JEOst4vxmAKKzJUtX-4N7aH6cYw-NvMlaJaHUWJo';
                        await pn.send(androiddata)
                        .then(resp => { return resp.json(resp) })
                         .catch(err => { return err });

                        }
                    }
                    else if (token.deviceType == 'IOS') {
                        if (token.devicetoken != null)
						{
                            ios.push(token.devicetoken);

                        return apn.send(note, ios)
                        .then(resp => {
               
                         return resp
                       }).catch(err => {
                        console.log("Error is ----------------->", err)
                        return err
                         });
						}

                    }
                }

               



            })
        } catch (err) {
            console.log(err);
            return false;
        };
    }
}