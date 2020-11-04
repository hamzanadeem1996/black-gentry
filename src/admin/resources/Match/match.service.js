var ejs = require("ejs");
var _ = require('lodash');

const Sequelize = require('sequelize');
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
const env = process.env.NODE_ENV || 'development';
const Op = Sequelize.Op


export default {
    // Services for Listing all users
    async list() {
        try {
            var matchList = await Matches.findAll({
                include: [
                    {
                        model: Users,
                        as: 'MatchForUser',
                        include : {
                            model: Peoples,
                            as: 'profileOfUser',
                       }
                    },
                    {
                        model: Users,
                        as: 'MatchToUser',
                        include : {
                            model: Peoples,
                            as: 'profileOfUser',
                       }
                    }

                ],
                order:[['MatchForUser','email','ASC']]
            }).then(list => {
                if (list)
                    return list;
            }).catch(err => {
                console.log("errr ---------------------------------------------------", err)
            })
            let response = {
                data: matchList,
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

    // Services for Listing all users
    async callList() {
        try {
            var matchList = await CallRequests.findAll({
                include: [
                    {
                        model: Users,
                        as: 'callForUser'
                    },
                    {
                        model: Users,
                        as: 'callToUser'
                    }

                ]
            }).then(list => {
                // console.log("Getting List------------>>>>>>>>>>>>>>>>>>>>",list)
                if (list)
                    return list;
            });
            let response = {
                data: matchList,
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


    async edit(id) {

        
        try {

            return Matches.findOne({
                where: { 'id': id },
            }).then(async getmatchId => {

                var userId1 = getmatchId.fromId
                var userId2 = getmatchId.toId

           return await Answer.findAll({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: [{ userId: userId1 }, { matchId: userId1 }]
                            },
                            {
                                [Op.or]: [{ userId: userId2 }, { matchId: userId2 }]
                            }
                        ]
                    }
                }).then(list => {
                    if (list) {
                        console.log("Getting data of Answers-----------",list)
                        //return list;
                        let response = {
                            data: list,
                            message: '',
                            error: false
                        }
                        return response;
                    }
                }).catch(err => {
                    console.log("ERROR 1",err)
                    let response = {
                        data: '',
                        message: err,
                        error: true
                    }
                    return Promise.resolve(response);
                })

            }).catch(err => {
                console.log("Catched error from SERVICE---------------",err)
            })

        } catch (error) {
            console.log("ERROR 2",error)
            let response = {
                data: '',
                message: error.message,
                error: true
            }
            return Promise.resolve(response);
        }
    },
};
