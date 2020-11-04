import  emailConfig  from '../../emailConfig';
var ejs = require("ejs");

export default {

    async sendMail(from ,data, fileName, email, subject) {
        let transporter = await emailConfig.config();     // call transport configurations.
        console.log(data,'...............data')
        ejs.renderFile(__dirname + "/emailTemplate/"+ fileName,{ 
            data : data
        }, function (err, data) {
          if (err) {
              console.log(err);
          } else {
              var mainOptions = {
                    from: from, // sender address
                    to: email,// email, // list of receivers
                    subject: subject, // Subject line
                    html: data
                };
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        console.log('dfdgfdfgg.........................',err);
                    } else {
                        console.log('Message sent: ' + info.response);
                    }
                });
            }
        });
    }
}