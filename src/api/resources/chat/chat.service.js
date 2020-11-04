const Chat = require('../../../../models').Chat;
const Users = require('../../../../models').Users
const Peoples = require('../../../../models').Peoples
const Otp = require('../../../../models').Otps
const Login = require('../../../../models').Logins
const Image = require('../../../../models').Images
const Selfies = require('../../../../models').Selfies
const Answer = require('../../../../models').Answers
const Matches = require('../../../../models').Matches
const CallRequests = require('../../../../models').CallRequests
const Reactions = require('../../../../models').Reactions
const Reports = require('../../../../models').Reports
// const Consumer = require('../../../../models').Consumer
// const PropertyInfo = require('../../../../models').PropertyInfo
const Op = require('sequelize').Op;
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development';
const config = require('../../../../config/config.json')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

import push from '../../sendPush.service'


function mychatusers(userid, checkid) {


    if (checkid == "from_id") {
        var attribute = "to_id";
        var condition = { from_id: userid }
    }
    if (checkid == "to_id") {
        var attribute = "from_id";
        var condition = { to_id: userid }
    }

    return new Promise((resolve, reject) => {
        let res = {
            success: false
        }
        try {
            Chat.findAll({
                where: condition,
                attributes: [attribute],
                raw: true
            }).then(chatlist => {
                if (attribute == 'to_id') {
                    var result = chatlist.map(({ to_id }) => to_id);
                } else {
                    var result = chatlist.map(({ from_id }) => from_id);
                }

                // console.log(result)
                //   console.log(chatlist)
                res.success = true
                res.data = result
                resolve(res)
            }).catch(err => {
                // res.error = err
                res.message = "UNABLE TO FETCH CHAT LIST !"
                reject(res)
            })
        } catch (err) {
            // res.err = err
            console.log("Error is=======---------------------->", err)
            res.message = 'Something went wrong !'
            reject(res)
        }
    })
}



export default {
    async getChatList(userId) {

        return new Promise(async (resolve, reject) => {
            var res = {
                success: false
            };
            try {
                // sequelize.query("SET GLOBAL sql_mode='', SESSION sql_mode=''");
                sequelize.query("SELECT Chats.*, tbl3.other_user_id FROM "+
                "(SELECT max(`id`) AS `id`, IF( to_id ="+userId+", `from_id` , to_id ) AS other_user_id, `from_id` , to_id FROM `Chats` WHERE `from_id` ="+userId+" OR to_id ="+userId+" GROUP BY `other_user_id` ORDER BY `id` DESC)tbl3"+
                " LEFT JOIN Chats ON Chats.id=tbl3.id",{ type: Sequelize.QueryTypes.SELECT}).then(async chat => {
                    if(chat.length > 0) {
                    let data = []
                    for(let val of chat) {
                       await Users.findOne({
                            where: {
                                id: val.other_user_id
                            },
                            include: [{
                                model: Peoples,
                                as: 'profileOfUser',
                                attributes: ['name']
                            },
                            {
                                model: Image,
                                as: 'ImageForUser',
                                limit: 1,
                                attributes: ['imageUrl']
                            }]
                        }).then(foundlist => {
                            if (foundlist) {
                                data.push({
                                    "id": foundlist.id,
                                    "email": foundlist.email,
                                    "roleId": foundlist.roleId,
                                    "linkedinId": foundlist.property,
                                    "isLinkedinUser": foundlist.isLinkedinUser,
                                    "status": foundlist.status,
                                    "statusByadmin": foundlist.statusByadmin,
                                    "isRejected": foundlist.isRejected,
                                    "isReported": foundlist.isReported,
                                    "isVerified": foundlist.isVerified,
                                    "isPremium": foundlist.isPremium,
                                    "approvesIn": foundlist.approvesIn,
                                    "deletedAt": foundlist.deletedAt,
                                    "createdAt": foundlist.createdAt,
                                    "updatedAt": foundlist.updatedAt,
                                    "profileOfUser": foundlist.profileOfUser,
                                    "ImageForUser": foundlist.ImageForUser,
                                    "ChatByUser": 
                                        {
                                        "id": val.id,
                                        "from_id": val.from_id,
                                        "to_id": val.to_id,
                                        "message": val.message,
                                        "status": val.status,
                                        "createdAt": val.createdAt,
                                        "updatedAt": val.updatedAt
                                        }
                                })
                            }                        
                        })
                    }
                    res.message = "Listed successfully."
                    res.chatList = data
                    res.success = true
                    resolve(res)
                }else {
                    res.message = "UNABLE TO FETCH CHAT LIST !",
                    res.chatList = []
                    res.success = true
                    resolve(res)
                }
                })
                // var arr1 = await mychatusers(userId, "to_id")

                // var arr2 = await mychatusers(userId, "from_id")

                // console.log("------------->>>>>>>>>>", arr1.data)
                // console.log("------------->>>>>>>>>>", arr2.data)


                // var array3 = [...arr1.data, ...arr2.data];;
                // console.log("----------------->", array3)

                // var outputArray = [];
                // var count = 0;

                // let j = "";
                // let k = "";
                // var start = false;

                // for (j = 0; j < array3.length; j++) {
                //     for (k = 0; k < outputArray.length; k++) {
                //         if (array3[j] == outputArray[k]) {
                //             start = true;
                //         }
                //     }
                //     count++;
                //     if (count == 1 && start == false) {
                //         outputArray.push(array3[j]);
                //     }
                //     start = false;
                //     count = 0;
                // }
                // console.log("====================]", outputArray);

                // Users.findAll({
                //     where: {
                //         id: outputArray
                //     },
                //     include: [{
                //         model: Peoples,
                //         as: 'profileOfUser',
                //         attributes: ['name']
                //     },
                //     {
                //         model: Image,
                //         as: 'ImageForUser',
                //         limit: 1,
                //         attributes: ['imageUrl']
                //     },
                //     {
                //         model: Chat,
                //         as: 'ChatByUser',
                //         where: {
                //             [Op.or]: [{ from_id: userId }, { to_id: userId }]
                //         },
                //         order: [
                //             ['id', 'DESC']
                //         ],
                //         limit: 1
                //     },
                //     {
                //         model: Chat,
                //         as: 'ChatToUser',
                //         where: {
                //             [Op.or]: [{ from_id: userId }, { to_id: userId }]
                //         },
                //         order: [
                //             ['id', 'DESC']
                //         ],
                //         limit: 1
                //     },]
                // }).then(foundlist => {
                //     console.log("LIsting Chat Users-----------", JSON.stringify(foundlist))
                //     if (foundlist) {
                //         var foundlist = foundlist.reverse();
                //         res.message = "Listed successfully."
                //         res.chatList = foundlist
                //         res.success = true
                //         resolve(res)
                //     }
                //     else {
                //         res.message = "UNABLE TO FETCH CHAT LIST !"
                //         reject(res)
                //     }

                // })

                // Chat.findAll({
                //     where: {
                //         id: { [Op.ne]: userId },
                //     }
                // }).then(chat => {
                //     res.message = "Listed successfully."
                //     res.chatList = chat
                //     res.success = true
                //     resolve(res)          
                // }).catch(err =>{
                //     res.message = "Something went wrong"
                //     res.success = false,
                //     res.error = err;
                //     console.log(err)
                //     reject(res)
                // })
            } catch (err) {
                res.message = "Something went wrong"
                res.success = false,
                    res.error = err;
                console.log(err)
                reject(res)
            }
        })
    },

    async getMessagelist(payload, userId ,pageNumber) {
        return new Promise((resolve, reject) => {
            var res = {
                success: false
            };
            try {

                const limit = 20
                const page = pageNumber
                var offset = ((page - 1) * limit)


                Chat.findAll({
                    where: {
                        [Op.or]: [{
                            [Op.and]: [{
                                to_id: payload.toid,
                                from_id: userId
                            }]
                        }, {
                            [Op.and]: [{
                                from_id: payload.toid,
                                to_id: userId
                            }]
                        }],
                        // hostuser_id: userId,
                        // propertyInfoId: payload.propertyInfoId
                    },
                    order: [['createdAt', 'ASC']],
                    // limit, 
                    // offset
                }).then(chat => {
                    Chat.update({ status: 'Read' }, {
                        where: {
                            [Op.or]: [{
                                [Op.and]: [{
                                    to_id: payload.toid,
                                    from_id: userId
                                }]
                            }, {
                                [Op.and]: [{
                                    from_id: payload.toid,
                                    to_id: userId
                                }]
                            }],
                            // hostuser_id: userId,
                            // propertyInfoId: payload.propertyInfoId
                        }
                    })
                    res.message = "Listed successfully."
                    res.chatList = chat
                    res.success = true
                    resolve(res)
                }).catch(err => {
                    res.message = "Something went wrong"
                    res.success = false,
                        res.error = err;
                    console.log(err)
                    reject(res)
                })
            } catch (err) {
                res.message = "Something went wrong"
                res.success = false,
                    res.error = err;
                console.log(err)
                reject(res)
            }
        })
    },

    async pushsend(payload) {
        return new Promise(async (resolve, reject) => {
            var res = {
                success: false
            }
            try {

             //   console.log("---------------------------INSIDE THE PUSH NOTIFICATION====>>>>>>>>>>>>", payload)

                Peoples.findOne({
                    where: {
                        userId: payload.fromid
                    },
                    attributes: ['name', 'chatNotify']
                }).then(namefound => {

                    Image.findOne({
                        where: {
                            userId: payload.fromid,
                            orderId: 1
                        }
                    }).then(imgfound => {

                        console.log("IMAGESSSSSSSSSSSSSSSS----",imgfound.dataValues.imageUrl)

                        Peoples.findOne({
                            where: {
                                userId: payload.to_id
                            },
                            attributes: ['name', 'chatNotify']
                        }).then(chatnotifycheck => {
    
                            if (chatnotifycheck.dataValues.chatNotify == "On") {
    
                                let pushData = {
                                    fromid: payload.fromid,
                                    pushmessage: true,
                                    name: namefound.dataValues.name + " has sent you a new message.",
                                    matchNameType: namefound.dataValues.name,
                                    message: payload.msg,
                                    ProfilePic: imgfound.dataValues.imageUrl,
                                    action: 4
                                };
                                push.sendPush(payload.to_id, pushData);
                            }
                            else {
                                console.log("Chat Notifications are off By User---!")
                            }
    
                        })
    
                    })

                })


            } catch (err) {
                console.log(err)
                res.success = false
                res.message = "Something went wrong 2"
                res.error = err
                reject(res)
                // return response = {
                //     "success": false,
                //     'message':err,                        
                // }
            }
        })
    },

    async sendmsg(payload) {
       // console.log("PAYLOAD DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=================>>>>>>>>>>>>>>>>>>>>>>>>>", payload)
        return new Promise(async (resolve, reject) => {
            var res = {
                success: false
            }
            try {
                await Chat.create({
                    from_id: payload.fromid,
                    to_id: payload.to_id,
                    message: payload.msg
                }).then(result => {

                    Matches.update({
                        isChatStarted: "Yes"
                    }, {
                        where: {
                            [Op.and]: [
                                {
                                    [Op.or]: [{ fromId: payload.fromid }, { toId: payload.fromid }]
                                },
                                {
                                    [Op.or]: [{ fromId: payload.to_id }, { toId: payload.to_id }]
                                }
                            ]
                        }
                    })

                 //   console.log("PAYOLOAD DATA FROM CONTROLLER------------>>>>", payload)

                    if (result) {
                        res.success = true
                        res.message = 'Message sent successfully!'
                        resolve(res)
                    } else {
                        res.message = 'Message not sent.'
                        reject(res)
                    }
                }).catch(err => {
                    console.log("ERROR FROM CONTROLLER 1", err)
                    res.success = false
                    res.message = "Something went wrong 1"
                    res.code = err
                    reject(res)
                })
            } catch (err) {
                console.log(err)
                res.success = false
                res.message = "Something went wrong 2"
                res.error = err
                reject(res)
                // return response = {
                //     "success": false,
                //     'message':err,                        
                // }
            }
        })
    },
    async searchUser(payload) {
        return new Promise((resolve, reject) => {
            var res = {
                success: false
            };
            try {
                Users.findAll({
                    attributes: ['id'],
                    where: {
                        id: { [Op.ne]: payload.userid }
                    },
                    include: [{
                        model: Peoples,
                        as: 'profileOfUser',
                        where: {

                            name: { [Op.like]: '%' + payload.search + '%' }

                        }
                    },
                    {
                        model: Image,
                        as: 'ImageForUser'
                    }]
                }).then(user => {
                    res.message = "Listed successfully."
                    res.user = user
                    res.success = true
                    resolve(res)
                }).catch(err => {
                    res.message = "Something went wrong"
                    res.success = false,
                        res.error = err;
                    console.log(err)
                    reject(res)
                })
            } catch (err) {
                res.message = "Something went wrong"
                res.success = false,
                    res.error = err;
                console.log(err)
                reject(res)
            }
        })
    },

    async checkunread(userid) {
        return new Promise((resolve, reject) => {
            var res = {
                success: false
            };
            try {

                Chat.findAll({
                    where: {
                        to_id: userid,
                        status: "Unread"
                    },
                }).then(unreadcount => {

                //    console.log("------------------------->>>>>>>>>>>>", unreadcount.length)

                    if (unreadcount.length >= 1) {
                        res.success = true
                        res.message = "UNREAD MESSAGES"
                        res.unreadmessages = true
                        resolve(res)
                    }
                    else {
                        res.unreadmessages = false
                        reject(res)
                    }

                }).catch(err => {
                    res.message = "Something went wrong !"
                    reject(res)
                })

            } catch (err) {
                res.message = "Something went wrong"
                res.success = false,
                    res.error = err;
                console.log(err)
                reject(res)
            }
        })
    },
    /*fucntion to update messages if they are read
    * accept from and to (ids) of user
    * sets the status to 1 for indicating message is read 
    */
    async readmsg(payload) {
        return new Promise((resolve, reject) => {
            var res = {
                success: false
            }
            try {
                Chat.update({ status: 'Read' }, {
                    where: {
                        toid: payload.toid,
                        fromid: payload.fromid
                    }
                }).then(result => {
                    if (result) {
                        res.success = true
                        res.data = users
                        res.message = 'Status updated successfully'
                        resolve(res)
                    } else {
                        res.message = 'Something went wrong.'
                        reject(res)
                    }
                }).catch(err => {
                    res.message = "Something went wrong"
                    res.success = false,
                        res.error = err;
                    console.log(err)
                    reject(res)
                })
            } catch (err) {
                res.message = "Something went wrong"
                res.success = false,
                    res.error = err;
                console.log(err)
                reject(res)
            }
        })
    },
    getsendmessage(from, to) {
        return new Promise((resolve, reject) => {
            var res = {
                success: false
            };
            try {

                Chat.findAll({
                    where: {
                        [Op.or]: [
                            {
                                [Op.and]: [{ fromid: from }, { toid: to }]
                            },
                            {
                                [Op.and]: [{ fromid: to }, { toid: from }]
                            }
                        ],
                        //   hostuser_id:userId,
                    }
                })
                    .then(chat => {
                       // console.log('---err', chat)
                        if (chat.length) {
                            // res.message = "Listed successfully."
                            // res.chatList = chat
                            res.success = true
                            resolve(res)
                        }
                        else {
                            res.success = false
                            resolve(res)
                        }
                    }).catch(err => {
                        res.message = "Something went wrong"
                        res.success = false,
                            res.error = err;
                        console.log(err)
                        reject(res)
                    })
            } catch (err) {
                res.message = "Something went wrong"
                res.success = false,
                    res.error = err;
                console.log(err)
                reject(res)
            }
        })
    },
    hostInfoIdlist(id) {
        return new Promise((resolve, reject) => {
            var res = {
                success: false
            };
            try {
                PropertyInfo.findAll({
                    where: {
                        userId: id
                        //   hostuser_id:userId,
                    },
                    attributes: ['id', 'name']
                })
                    .then(propertyInfoId => {
                        if (propertyInfoId) {
                            res.success = true
                            res.propertyId = propertyInfoId
                            resolve(res)
                        }
                        else {
                            res.success = false
                            resolve(res)
                        }
                    }).catch(err => {
                        res.message = "Something went wrong"
                        res.success = false,
                            res.error = err;
                        console.log(err)
                        reject(res)
                    })
            } catch (err) {
                res.message = "Something went wrong"
                res.success = false,
                    res.error = err;
                console.log(err)
                reject(res)
            }
        })
    },
    async hostchatlist(userId, propertyInfoId) {
        return new Promise((resolve, reject) => {
            var res = {
                success: false
            };
            try {
                sequelize.query("SET GLOBAL sql_mode='', SESSION sql_mode=''");
                sequelize.query("select tbl2.*,firstName,lastName ,profilepic,(select if(count(status),count(status),0) as unread_messages from Chats" +
                    " where toid=" + userId + " and fromid=tbl2.other_user_id and propertyInfoId = tbl2.propertyInfoId and status='Unread') as unread_messages " +
                    "from (SELECT tbl3 . * , message, createdAt FROM (SELECT MAX( `id` ) AS `id` , IF( toid = " + userId + ", `fromid` , toid ) other_user_id, `fromid` ,hostuser_id, toid, propertyInfoId " +
                    "FROM `Chats` WHERE (`propertyInfoId` =" + propertyInfoId + ") " +
                    "GROUP BY `other_user_id` , propertyInfoId ORDER BY `id` DESC ) tbl3 " +
                    "LEFT JOIN Chats ON Chats.id = tbl3.id) tbl2 LEFT JOIN Users ON Users.id = tbl2.other_user_id" +
                    " LEFT JOIN Consumers ON (Users.id = Consumers.userId)", { type: Sequelize.QueryTypes.SELECT })
                    .then(chat => {
                        res.message = "Listed successfully."
                        res.chatList = chat
                        res.success = true
                        resolve(res)
                    }).catch(err => {
                        res.message = "Something went wrong"
                        res.success = false,
                            res.error = err;
                        console.log(err)
                        reject(res)
                    })
            } catch (err) {
                res.message = "Something went wrong"
                res.success = false,
                    res.error = err;
                console.log(err)
                reject(res)
            }
        })
    },
    guestInfoIdlist(id) {
        return new Promise((resolve, reject) => {
            var res = {
                success: false
            };
            try {
                Chat.findAll({
                    where: {

                        [Op.or]: [
                            {
                                fromid: id,
                            },
                            {
                                toid: id
                            }
                        ]

                    },
                    attributes: ['id', 'propertyInfoId'],
                    group: ['propertyInfoId']
                })
                    .then(propertyInfoId => {
                        if (propertyInfoId) {
                            res.success = true
                            res.propertyId = propertyInfoId
                            resolve(res)
                        }
                        else {
                            res.success = false
                            resolve(res)
                        }
                    }).catch(err => {
                        res.message = "Something went wrong"
                        res.success = false,
                            res.error = err;
                        console.log(err)
                        reject(res)
                    })
            } catch (err) {
                res.message = "Something went wrong"
                res.success = false,
                    res.error = err;
                console.log(err)
                reject(res)
            }
        })
    },

    async guestchatlist(userId, propertyInfoId) {
        return new Promise((resolve, reject) => {
            var res = {
                success: false
            };
            try {
                sequelize.query("SET GLOBAL sql_mode='', SESSION sql_mode=''");
                sequelize.query("select tbl2.*,firstName,lastName ,profilepic,(select if(count(status),count(status),0) as unread_messages from Chats" +
                    " where toid=" + userId + " or fromid=" + userId + " and propertyInfoId = tbl2.propertyInfoId and status='Unread') as unread_messages " +
                    "from (SELECT tbl3 . * , message, createdAt FROM (SELECT MAX( `id` ) AS `id` , IF( toid = " + userId + ", `fromid` , toid ) other_user_id, `fromid` ,hostuser_id, toid, propertyInfoId " +
                    "FROM `Chats` WHERE (`propertyInfoId` =" + propertyInfoId + ") " +
                    "GROUP BY `other_user_id` , propertyInfoId ORDER BY `id` DESC ) tbl3 " +
                    "LEFT JOIN Chats ON Chats.id = tbl3.id) tbl2 LEFT JOIN Users ON Users.id = tbl2.other_user_id" +
                    " LEFT JOIN Consumers ON (Users.id = Consumers.userId)", { type: Sequelize.QueryTypes.SELECT })
                    .then(chat => {
                        res.message = "Listed successfully."
                        res.chatList = chat
                        res.success = true
                        resolve(res)
                    }).catch(err => {
                        res.message = "Something went wrong"
                        res.success = false,
                            res.error = err;
                        console.log(err)
                        reject(res)
                    })
            } catch (err) {
                res.message = "Something went wrong"
                res.success = false,
                    res.error = err;
                console.log(err)
                reject(res)
            }
        })
    },

    async changeStatus(toId, userId) {
        return new Promise((resolve, reject) => {
            var res = {
                success: false
            };
            try {
               // console.log("INSIDE THE SEVICEEEEEEEEEEEEEEEEEEEE")

                Chat.findAll({
                    where: {
                        [Op.and]: [{
                            from_id: toId,
                            to_id: userId,
                            status: "Unread"
                        }]
                    }
                }).then(chating => {
                //    console.log("------------------", JSON.stringify(chating))

                    if (chating.length >= 1) {

                        Chat.update({
                            status: "Read"
                        },
                            {
                                where: {
                                    [Op.and]: [{
                                        from_id: toId,
                                        to_id: userId
                                    }]
                                }
                            })

                        res.message = "Message status changed to Read"
                        res.sucess = true
                        resolve(res)

                    }

                    else {

                        res.message = "Messages not found"
                        reject(res)

                    }

                }).catch(err => {
                    res.message = "Something went wrong !"
                    reject(res)
                })


            } catch (err) {
                res.message = "Something went wrong"
                res.success = false,
                    res.error = err;
                console.log(err)
                reject(res)
            }
        })
    }

}
