var ejs = require("ejs");
var _ = require('lodash');

const Sequelize = require('sequelize');
import push from '../../sendPush.service'

const Users = require('../../../../models').Users
const Roles = require('../../../../models').Roles
const Peoples = require('../../../../models').Peoples
const Otp = require('../../../../models').Otps
const Login = require('../../../../models').Logins
const Image = require('../../../../models').Images
const Answer = require('../../../../models').Answers
const Matches = require('../../../../models').Matches
const CallRequests = require('../../../../models').CallRequests
const Reactions = require('../../../../models').Reactions
const Reports = require('../../../../models').Reports
const Selfies = require('../../../../models').Selfies
const Chat = require('../../../../models').Chat;
const Swipecounter = require('../../../../models').Swipescounters
const Subscription = require('../../../../models').Subscriptions
const tokenRecords = require('../../../../models').tokenRecords

import emailService from '../../../email/email.service'


const Op = Sequelize.Op


const env = process.env.NODE_ENV || 'development';

var nodemailer = require('nodemailer');

//Setting nodemailer credentials

function findusermail(userid) {
    return new Promise((resolve, reject) => {
        let res = {
            success: false
        }
        try {
            Users.findOne({
                where: {
                    id: userid
                },
                attributes: ['email']
            }).then(emailfound => {

                // console.log("EMAIL-------------", emailfound.dataValues.email)
                res.success = true
                res.email = emailfound.dataValues.email
                resolve(res)

            }).catch(err => {
                // res.error = err
                console.log("===============", err)
                res.message = "Unable to find Record"
                reject(res)
            })
        } catch (err) {
            // res.error = err
            res.message = 'Something went wrong!'
            reject(res)
        }

    })
}

export default { 

    ///////// SUBSCRIPTIONS ////////////////////////////////////////////

    // Services for Listing all users
    async list() {
        try {
            var userList = await Users.findAll({
                where: { roleId: 2 },
                include: [{
                    model: Peoples,
                    as: 'profileOfUser'
                }, {
                    model: Subscription,
                    as: 'subscriptionForUser'
                }],
                order: [[Sequelize.literal('subscriptionForUser.createdAt'), 'DESC']],
            }).then(list => {
                if (list)
                    return list;
            }).catch(err => {
                console.log(err)
            });
            let response = {
                data: userList,
                message: "",
                error: false
            }
            return response;
        } catch (error) {
            let response = {
                data: '',
                message: error.message,
                error: true
            }
            return Promise.resolve(response);
        }
    },

    // Subscription View 
    async edit(id) {
        try {
            var userList = await Users.findOne({
                where: { 'id': id },
                include: [{
                    model: Peoples,
                    as: 'profileOfUser',

                }, {
                    model: Subscription,
                    as: 'subscriptionForUser'
                }],
            }).then(list => {
                if (list)
                    return list;
            }).catch(err => {
                let response = {
                    data: '',
                    message: err,
                    error: true
                }
                return Promise.resolve(response);
            })
            let response = {
                data: userList,
                message: "",
                error: false
            }
            return response;
        } catch (error) {
            let response = {
                data: '',
                message: error.message,
                error: true
            }
            return Promise.resolve(response);
        }
    },

    ///////// SUBSCRIPTIONS ////////////////////////////////////////////


};
