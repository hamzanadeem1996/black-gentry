const nodemailer = require("nodemailer");
require('dotenv').config()

export class emailConfig {
 
    async config(){ 
        var config = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'contact@blackgentryapp.com',
                pass: 'GentryBlack@123!!'
            }
        });
        return config;
    }
} 
export default new emailConfig();