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

var nodemailer = require('nodemailer');

//Setting nodemailer credentials

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abcdef9689@gmail.com',
        pass: 'qiasefsfhsqsyhwq'
    }
});

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
    // Services for Listing all users
    async list() {
        try {
            var userList = await Users.findAll({
                where: { roleId: 2 },
                include: [{
                    model: Peoples,
                    as: 'profileOfUser',
                    attributes: ['gender','name', [Sequelize.literal(`TIMESTAMPDIFF(YEAR, dob, CURDATE())`), 'age']]
                },
                  {
                    model:Selfies,
                    as:'SelfiesForUser'
                   },
                   {
                    model:Login,
                    as:'loginForUser'
                   
                   }
                ],
                   
                order: [[Sequelize.literal('name'), 'ASC']],

            }).then(list => {
                // console.log('-------------------------list',list)
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

    // Services for Listing IOS users
    async iosList() {
        try {
            var iosList = await Users.findAll({
                where: { roleId: 2 },
                include: [{
                    model: Login,
                    as: 'loginForUser',
                    where: {
                        deviceType: "IOS"
                    }
                }, {
                    model: Peoples,
                    as: 'profileOfUser',
                    attributes: ['gender','name', [Sequelize.literal(`TIMESTAMPDIFF(YEAR, dob, CURDATE())`), 'age']]
                }],
                order: [[Sequelize.literal('name'), 'ASC']],

            }).then(list => {
                // console.log("Getting List------------>>>>>>>>>>>>>>>>>>>>",list)
                if (list)
                    return list;
            });
            let response = {
                data: iosList,
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

    // Services for Listing ANDROID users
    async androidList() {
        try {
            var androidList = await Users.findAll({
                where: { roleId: 2 },
                include: [{
                    model: Login,
                    as: 'loginForUser',
                    where: {
                        deviceType: "ANDROID"
                    }
                }, {
                    model: Peoples,
                    as: 'profileOfUser',
                    attributes: ['gender','name', [Sequelize.literal(`TIMESTAMPDIFF(YEAR, dob, CURDATE())`), 'age']]
                }],
                order: [[Sequelize.literal('name'), 'ASC']],

            }).then(list => {
                console.log("------------------------",JSON.stringify(list))
                if (list)
                    return list;
            });
            let response = {
                data: androidList,
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
            var userData = await Users.update({ statusByadmin: value }, { where: { 'id': id } }).then(async userUpdateData => {

                let pushData = {
                    message: 'Alert By Admin',
                    userId: id,
                    message: "Account Has Been Deactivated by Admin",
                    isDeactivated: true,
                    action: 3
                };
                push.sendPush(id, pushData);

                var emailfound = await findusermail(id)
             //   console.log("------------EMAILSSSSSSSSS------------->>>>>>>>>", emailfound)
                
                // emailService.sendMail("BlackGentry Team <support@blackgentryapp.com> ", "YOU WERE BANNED BY ADMIN.. !", 'deactivate.ejs', emailfound.email, "BlackGentry Deactivation Alert")

                emailService.sendMail("Deactivation Email  <contact@blackgentryapp.com>", "YOU WERE BANNED BY ADMIN", 'deactivate.ejs', emailfound.email, "BlackGentry Deactivation Alert")
 
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
            var userData = await Users.update({ statusByadmin: value }, { where: { 'id': id } }).then(async userUpdateData => {

                var emailfound = await findusermail(id)
                console.log("------------------------->>>>>>>>>", emailfound.email)

                emailService.sendMail("BlackGentry Team  <support@blackgentryapp.com>", "YOU WERE ACTIVATED BY ADMIN", 'activation.ejs', emailfound.email, "BlackGentry Re-Activation Alert")

                // ejs.renderFile(__dirname + "/emailTemplate/" + "alert.ejs", {
                //     data: "YOU WERE ACTIVATED BY ADMIN.. !"
                // }, function (err, data) {

                //     var mailOptions = {
                //         from: 'admin@blackgentryapp.com',
                //         to: emailfound.email,
                //         subject: 'Black Gentry Alert Mail',
                //         html: data
                //     };

                //     transporter.sendMail(mailOptions, function (error, info) {

                //         if (error) {
                //             console.log("ERROR WHILE SENDING MAIL:::::::----------", error);
                //         } else {
                //             console.log("Succesfully Actovated ---------------->>>>>>>>>>>>>>>>>", info)
                //             return userUpdateData;
                //         }
                //     });

                // });

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
                        'createdAt',
                        'city',
                        'state',
                        'country'
                    ],
                }, {
                    model: Image,
                    as: 'ImageForUser'
                }],
            }).then(list => {
             //   console.log("----------->>>>>", JSON.stringify(list))
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
    async update(data) {
        try {
            if (data.dob && data.dob != '') {
                var todayTime = new Date(data.dob);
                var month = ("0" + (todayTime.getMonth() + 1)).slice(-2);
                var day = ("0" + todayTime.getDate()).slice(-2);
                var year = todayTime.getFullYear();
                var newDOb = year + "-" + month + "-" + day;
                data.dob = newDOb;
            } else {
                data.dob = null
            }

            var user = await User.update({ PhoneNo: data.PhoneNo }, { where: { 'id': data.id } }).then(userUpdateData => {
                return userUpdateData;
            }).catch(err => {
                let response = {
                    data: '',
                    message: err,
                    error: true
                }
                return Promise.resolve(response);
            });
            var consumer = await Consumer.update({ firstName: data.firstName, lastName: data.lastName, dob: data.dob, gender: data.gender }, { where: { 'userId': data.id } }).then(userUpdateData => {
                return userUpdateData;
            }).catch(err => {
                let response = {
                    data: '',
                    message: err,
                    error: true
                }
                return Promise.resolve(response);
            });
            let response = {
                message: "Successfully Updated",
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

    async DeleteStatus(userId) {
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

    async getmessage(id) {
        try {
            console.log("ID IS-------------", id)
            var userList = await Users.findOne({
                where: { 'id': id },
                include: [{
                    model: Peoples,
                    as: 'profileOfUser',
                    attributes: ['name']
                }],
            }).then(list => {
                console.log("LIST FROM SERVICE--------------", JSON.stringify(list))
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

    async sendmessage(id, mess) {
        try {

            console.log("INSIDE THE ID---------------------->>>>>>>>>", id)

            console.log("INSIDE THE sendmessage---------------------->>>>>>>>>", mess)

            var userList = await Users.findOne({
                where: { 'id': id }
            }).then(list => {

                if (list) {

                    let pushData = {
                        message: 'Alert By Admin !',
                        userId: id,
                        message: mess,
                        action: 3
                    };
                    push.sendPush(id, pushData);

                    return list;

                }
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

    async viewChatUsers(id) {
        try {
            var chatId = '';
            var chatArray = ['1'];
            var chatName = [];
            var list = await Chat.findAll({
                where: { [Op.or]: [{ from_id: id }, { to_id: id }] },
            }).then(list => {
                if (list) return list;
            });
            var image = await Image.findOne({
                where: { userId: id, orderId: '1' },
                attributes: ['imageUrl'],
            }).then(image => {
                if (image) return image;
            });
            for (let data of list) {
                if (data.from_id == id) {
                    chatId = data.to_id
                } else {
                    chatId = data.from_id
                }
                var check = chatArray.includes(chatId)
                if (check == false) {
                    chatArray.push(chatId);
                }
            }
            for (let newList of chatArray) {
                await Users.findOne({
                    where: { 'id': newList },
                    attributes: ['email', 'id'],
                    include: [{
                        model: Peoples,
                        as: 'profileOfUser',
                        attributes: ['name', 'userId', 'aboutme']
                    }, {
                        model: Image,
                        as: 'ImageForUser',
                        attributes: ['imageUrl'],
                        where: { 'orderId': '1' }
                    }],
                }).then(getlist => {
                    if (getlist)
                        chatName.push(getlist);
                    return;
                })
            }
            // return
            let response = {
                data: chatName,
                image: image,
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

    async viewChatMessages(id, chatId) {
        try {
            var list = await Chat.findAll({
                where: {
                    [Op.or]: [{ from_id: id }, { to_id: id }],
                    [Op.and]: {
                        [Op.or]: [{ from_id: chatId }, { to_id: chatId }],
                    }
                },
                attributes: ['message', 'from_id', 'to_id', 'createdAt']
            }).then(list => {
                if (list) return list;
            });
            var image = await Image.findOne({
                where: { userId: id, orderId: '1' },
                attributes: ['imageUrl'],
            }).then(image => {
                if (image) return image;
            });
            var imageChatUser = await Image.findOne({
                where: { userId: chatId, orderId: '1' },
                attributes: ['imageUrl'],
            }).then(image => {
                if (image) return image;
            });
            var nameChatUser = await Peoples.findOne({
                where: { userId: id },
                attributes: ['name'],
            }).then(nameChat => {
                if (nameChat) return nameChat;
            });
            let response = {
                data: list,
                message: "",
                image: image,
                chatWithUserImage: imageChatUser,
                nameChatUser: nameChatUser,
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
    }

};
