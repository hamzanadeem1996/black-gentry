const nodemailer = require("nodemailer");
require('dotenv').config()

export class emailConfig {
 
    async config(){ 
        var config = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'e.saloon.tech@gmail.com',
                pass: '$upportTech123'
            }
        });
        return config;
    }
} 
export default new emailConfig();