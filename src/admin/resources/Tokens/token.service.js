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
const usersPurchases = require('../../../../models').usersPurchases

import emailService from '../../../email/email.service'


const Op = Sequelize.Op


const env = process.env.NODE_ENV || 'development';


export default {

    ///////// TOKEN PURCHASES ////////////////////////////////////////////

    // Services for Listing all PURCHASES
    async list() {
        try {
            var userList = await usersPurchases.findAll({
                include: [
                    {
                        model: Users,
                        as: 'TokenForUser',
                        include :[
                            {
                            model: Peoples,
                            as: 'profileOfUser',
                       },
                       {
                        model: Login,
                        as: 'loginForUser',
                   },
                    ]
                    },
                ],
                order: [[Sequelize.literal('usersPurchases.createdAt'), 'DESC']],
            }).then(list => {
                console.log("Getting List------------>>>>>>>>>>>>>>>>>>>>",JSON.stringify(list))
                if (list)
                    return list;
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
                    model: usersPurchases,
                    as: 'TokenForUser'
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
