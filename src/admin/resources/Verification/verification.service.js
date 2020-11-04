var ejs = require("ejs");
var _ = require('lodash');

import push from '../../sendPush.service'
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
const Selfies = require('../../../../models').Selfies
const Chat = require('../../../../models').Chat;
const Swipecounter = require('../../../../models').Swipescounters
const Subscription = require('../../../../models').Subscriptions
const tokenRecords = require('../../../../models').tokenRecords
const usersPurchases = require('../../../../models').usersPurchases

const env = process.env.NODE_ENV || 'development';

import emailService from '../../../email/email.service'


var nodemailer = require('nodemailer');
// const Sequelize = require('sequelize');
const Op = Sequelize.Op


//Setting nodemailer credentials

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abcdef9689@gmail.com',
        pass: 'qiasefsfhsqsyhwq'
    }
});

export default {
    // Services for Listing all users
    async list() {
        try {
            var userList = await Users.findAll({
                where: { roleId: 2, isRejected: 0, isVerified: "No" },
                include: [{
                    model: Peoples,
                    as: 'profileOfUser'
                },
                {
                    model: Selfies,
                    as: 'SelfiesForUser'
                }],
                order:[['profileOfUser','name','ASC']]
            }).then(list => {
                // console.log("Getting List------------>>>>>>>>>>>>>>>>>>>>", JSON.stringify(list))
                if (list)
                    return list;
            }).catch(err => {
                console.log(err)
            });;
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
    // Services for Listing all Rejected users
    async rejectlist() {
        try {
            var userList = await Users.findAll({
                where: { roleId: 2, isRejected: 1, isVerified: "No" },
                include: [{
                    model: Peoples,
                    as: 'profileOfUser'
                },
                {
                    model: Selfies,
                    as: 'SelfiesForUser'
                }],
                order:[['profileOfUser','name','ASC']]
            }).then(list => {
                console.log("Getting List------------>>>>>>>>>>>>>>>>>>>>", JSON.stringify(list))
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

    async changeActiveStatus(id, value) {
        try {
            var userData = await Users.update({ status: value }, { where: { 'id': id } }).then(userUpdateData => {
                return userUpdateData;
            });
            var response = {
                data: userData,
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
    async changeInActiveStatus(id, value) {
        try {
            var userData = await Users.update({ status: value }, { where: { 'id': id } }).then(userUpdateData => {
                return userUpdateData;
            });
            var response = {
                data: userData,
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
    async changeVerifyStatus(id, value) {
        try {
            var userData = await Users.update({ isVerified: value, isRejected: 0 }, { where: { 'id': id } }).then(userUpdateData => {

                Selfies.update({
                    isVerified: "Yes"
                }, {
                    where: {
                        userId: id
                    }
                })

                Swipecounter.findOne({
                    where:{
                        userId: id
                    }
                }).then(sqp =>{

                    if(sqp){
                        console.log("SWIPE COUNTERS CANNOT BE CREATED")
                    }else{
                        Swipecounter.create({
                            userId: id,
                            likesCounter: 0
                        })         
                    }

                })


                Users.findOne({
                    where: {
                        id: id,
                    },
                    include: {
                        model: Peoples,
                        as: 'profileOfUser',
                        attributes: ['name']
                    }

                }).then(async emailfound => {

                    console.log("EMAIL IS ------", emailfound.dataValues.email)
                    console.log("NAME IS ------", emailfound.dataValues.profileOfUser.dataValues.name)


                    var fullname = emailfound.dataValues.profileOfUser.dataValues.name
                    var mail  = emailfound.dataValues.email

                    await emailService.sendMail("BlackGentry Team  <support@blackgentryapp.com>", fullname , 'approval.ejs', mail , "Congrats! Your BlackGentry profile has been approved")

                })

                let pushData = {
                    message: 'Congrats! Your profile has been approved. Log in and start connecting today. ',
                    userId: id,
                    approval: true,
                    action: 3
                };
                push.sendPush(id, pushData);




                return userUpdateData;
            });
            var response = {
                data: userData,
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
    // SERVICE FOR DENYING USERS
    async changeDenyStatus(id, value) {
        try {


            var userData = await Users.update({ isVerified: value, isRejected: 1 }, { where: { 'id': id } }).then(userUpdateData => {

                Selfies.update({
                    isVerified: "No"
                }, {
                    where: {
                        userId: id
                    }
                })


                let pushData = {
                    message: 'Your profile has been rejected. Update profile and apply again. ',
                    userId: id,
                    isDenied: true,
                    action: 3
                };
                push.sendPush(id, pushData);

                return userUpdateData;
            });
            var response = {
                data: userData,
                error: false
            }


            Users.findOne({
                where: {
                    id: id,
                },
                include: {
                    model: Peoples,
                    as: 'profileOfUser',
                    attributes: ['name']
                }

            }).then(async emailfound => {

                console.log("EMAIL IS ------", emailfound.dataValues.email)
                console.log("NAME IS ------", emailfound.dataValues.profileOfUser.dataValues.name)


                var fullname = emailfound.dataValues.profileOfUser.dataValues.name
                var mail  = emailfound.dataValues.email

                await emailService.sendMail("BlackGentry Team  <support@blackgentryapp.com>", fullname , 'rejection.ejs', mail , "Your BlackGentry Profile has been rejected")

            })
            // findEmail(id)

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
            var userList = await Users.findOne({
                where: { 'id': id },
                include: [{
                    model: Peoples,
                    as: 'profileOfUser',
                    attributes: [[Sequelize.literal(`TIMESTAMPDIFF(YEAR, dob, CURDATE())`), 'age'],
                        'name',
                        'aboutme',
                        'dob',
                        'gender',
                        'showmeto',
                        'interested',
                        'ethnicity',
                        'Kids',
                        'height',
                        'ZodiacSign',
                        'education',
                        'school',
                        'occupation',
                        'Relegion',
                        'Political',
                        'Drink',
                        'Smoke',
                        'Exercise',
                        'lookingFor',
                        'pets',
                        'ambitions',
                        'City',
                        'Question1',
                        'Answer1',
                        'Question2',
                        'Answer2',
                        'Question3',
                        'Answer3',
                        'latitude',
                        'longitude',
                        'distance',
                        'maxAgePrefer',
                        'minAgePrefer',
                        'visible',
                        'matchNotify',
                        'chatNotify',
                        'expiredMatches',
                        'matchUpdates',
                        'completed',
                        'superLikesCount',
                        'timeToken',
                        'createdAt'
                    ],
                }, {
                    model: Selfies,
                    as: 'SelfiesForUser'
                }, {
                    model: Image,
                    as: 'ImageForUser'
                }],
            }).then(list => {
                console.log("------------------FROM SERVICE------->>>>>>>>>>>>>", JSON.stringify(list))
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
    async rejectlist() {
        try {
            var userList = await Users.findAll({
                where: { roleId: 2, isRejected: 1, isVerified: "No" },
                include: [{
                    model: Peoples,
                    as: 'profileOfUser'
                },
                {
                    model: Selfies,
                    as: 'SelfiesForUser'
                }],
                order:[['profileOfUser','name','ASC']]
            }).then(list => {
                console.log("Getting List------------>>>>>>>>>>>>>>>>>>>>", JSON.stringify(list))
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
    // async userdelete(id)
    // {
    //     return new Promise((resolve,reject) =>{
    //         var res= {
    //             success :false
    //         }
    //         try{
    //             Users.destroy({
    //                 where:{
    //                     id:id
    //                 },
    //                 include:[
    //                     {
    //                         model:Peoples,
    //                         as:"loginForUser",
    //                         required:true
    //                     }
    //                 ]
                   
    //             }).then(user =>{
    //                if(user)
    //                {
    //                    res.message = "Data deleted "
    //                    resolve(res)
    //                }
    //                else
    //                {
    //                 res.message = "Data Not Found "
    //                 resolve(res)  
    //                }
    //             }).catch(err=>{
    //                 console.log('-----err1',err)

    //                 res.message = "Something went wrong "
    //                 reject(res)  
    //             })

    //         }catch(err)
    //         {
    //             console.log('-----err',err)
    //             res.message = "Something went wrong "
    //             reject(res)  
    //         }
    //     })
    // },
    async DeleteStatus(userId) {
        console.log('user.....................................',userId)
        return new Promise((resolve, reject) => {

            var res = {
                success: false
            }

            try {

                Users.findOne({
                    where: {
                        id: userId,
                        deletedAt: null
                    }
                }).then(user => {

                    if (user) {
                        console.log("INSIDE THE DELeTE ERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")


                        let pushData = {
                            message: 'Alert By Admin !',
                            userId: userId,
                            message: "Your Account Has been deleted by Admin",
                            isDestroyed: true,
                            action: 3
                        };
                        push.sendPush(userId, pushData);

                        Answer.destroy({
                            where: {
                                [Op.or]: [{ userId: userId }, { matchId: userId }]
                            }
                        }).catch(err => {
                            reject(err)
                            console.log("unable to delete ANSWERS !")
                        })

                        Matches.destroy({
                            where: {
                                [Op.or]: [{ fromId: userId }, { toId: userId }]
                            }
                        }).catch(err => {
                            console.log("UNABLE TO DELETE MATCHES !")
                        })

                        CallRequests.destroy({
                            where: {
                                [Op.or]: [{ fromId: userId }, { toId: userId }]
                            }
                        }).catch(err => {
                            console.log("UNABLE TO DELETE CALLREQUESTS")
                        })

                        Reactions.destroy({
                            where: {
                                [Op.or]: [{ fromId: userId }, { toId: userId }]
                            }
                        }).catch(err => {
                            console.log("UNABLE TO DELETE REACTIONS")
                        })

                        Login.destroy(
                            {
                                where:
                                {
                                    userId: userId
                                }
                            }).catch(err => {
                                console.log("UNABLE TO DELETE LOGINS")
                            })

                        Peoples.destroy({
                            where:
                            {
                                userId: userId
                            }
                        }).catch(err => {
                            console.log("UNABLE TO DELETE PEOPLES")
                        })

                        Image.destroy({
                            where:
                            {
                                userId: userId
                            }
                        }).catch(err => {
                            console.log("UNABLE TO DELETE IMAGES")
                        })

                        Subscription.destroy(
                            {
                                where:
                                {
                                    userId: userId
                                }
                            }).catch(err => {
                                console.log("UNABLE TO DELETE SUBSCRIPTION")
                            })

                        Swipecounter.destroy({
                            where: {
                                userId: userId
                            }
                        }).catch(err => {
                            console.log("UNABLE TO DELETE SWIPES")
                        })

                        tokenRecords.destroy({
                            where:
                            {
                                userId: userId
                            }
                        }).catch(err => {
                            console.log("UNABLE TO DELETE TOKEN RECORDS DATA")
                        })

                        usersPurchases.destroy({
                            where:
                            {
                                userId: userId
                            }
                        }).catch(err => {
                            console.log("UNABLE TO DELETE USER PURCHASE DATA")
                        })

                        Otp.destroy({
                            where:
                            {
                                userId: userId
                            }
                        }).catch(err => {
                            console.log("UNABLE TO DELETE OTP DATA")
                        })


                        Reports.destroy({
                            where: {
                                [Op.or]: [{ reportedBy: userId }, { reportedFor: userId }]
                            }
                        }).catch(err => {
                            console.log("UNABLE TO DELETE REPORTS")
                        })

                        Chat.destroy({
                            where: {
                                [Op.or]: [{ from_id: userId }, { to_id: userId }]
                            }
                        }).catch(err => {
                            console.log("UNABLE TO DELETE CHATS")
                        })


                        Selfies.destroy(
                            {
                                where:
                                {
                                    userId: userId
                                }
                            }).catch(err => {
                                console.log("UNABLE TO DELETE SELFIES")
                            })


                        return Users.destroy({
                            where:
                            {
                                id: userId
                            }
                        }).then(lastuser => {
                            res.message = "USER PROFILE DELETED SUCCESFULLY"
                            resolve(res)
                        }).catch(err => {
                            console.log("Unable to delete Users data", err)
                            // res.error = err
                            // reject(res)
                        })

                        var response = {
                            data: userData,
                            error: false
                        }

                        return response;

                    } else {
                        // res.message = 'User Profile not found.'
                        reject(err)
                    }
                }).catch(err => {
                    // res.message = 'Something went wrong 1.'
                    console.log("Error issssssss................" + err)
                    reject(err)
                })



            } catch (error) {
                let response = {
                    data: '',
                    message: error.message,
                    error: true
                }
                return Promise.resolve(response);
            }
        })
    },
};
