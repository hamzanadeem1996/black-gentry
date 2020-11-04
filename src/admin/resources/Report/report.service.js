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
const Selfies = require('../../../../models').Selfies
const Chat = require('../../../../models').Chat;
const Swipecounter = require('../../../../models').Swipescounters
const Subscription = require('../../../../models').Subscriptions
const tokenRecords = require('../../../../models').tokenRecords
const usersPurchases = require('../../../../models').usersPurchases


const env = process.env.NODE_ENV || 'development';
const Op = Sequelize.Op

var nodemailer = require('nodemailer');

//Setting nodemailer credentials

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abcdef9689@gmail.com',
        pass: 'qiasefsfhsqsyhwq'
    }
});



function findEmail(usersid) {
    return new Promise((resolve, reject) => {
        let res = {
            success: false
        }
        try {

            Users.findOne({
                where: {
                    id: usersid
                },
                attributes: ['email'],
            }).then(emailfound => {
                   console.log("EMAIL FOUND ..............!!!!!!!!!!",emailfound.dataValues.email) 

                   ejs.renderFile(__dirname + "/emailTemplate/" + "alert.ejs", {
                    data: "Your account has been deleted due to the violation of terms and conditions"
                  }, function (err, data) {

                   var mailOptions = {
                    from: 'admin@videe.com',
                    to: emailfound.dataValues.email,
                    subject: 'Videe Alert Code',
                    html: data
                  };

                  transporter.sendMail(mailOptions, function (error, info) {

                    if (err) {
                      console.log(err);
                    } else {
                        console("mail send  ->  ",info);
                        return true;
                    }
                  });

                });


                }).catch(err => {
                console.log("ERROR-------------------",err)
            })

        } catch (err) {
            // res.error = err
            res.message = 'Something went wrong!'
            // reject(res)
        }

    })
}


export default {
    // Services for Listing all users
    async list() {
        try {
            var complaintList = await Reports.findAll({
                include: [
                    {
                        model: Users,
                        as: 'ReportByUser',
                        include : {
                             model: Peoples,
                             as: 'profileOfUser',
                        }
                    },{
                        model: Users,
                        as: 'ReportForUser',
                        include : {
                            model: Peoples,
                            as: 'profileOfUser',
                       }
                    }
                ],
                order: [['ReportByUser','email','ASC']]
            }).then(list => {
                // console.log('-----------reported',list)
                // console.log("Getting List------------>>>>>>>>>>>>>>>>>>>>", JSON.stringify(list))
                if (list)

                    return list;
            }).catch(err => {
                console.log("", err)
            })
            let response = {
                data: complaintList,
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
    async changeActiveStatus(userId) {
        return new Promise((resolve, reject) => {

            var res = {
                success: false
            }

            try {
                Reports.destroy({
                    where: {
                       id:userId
                    }
                }).then(report =>{
                    if(report)
                    {
                        res.message = "Deleted successfully"
                        res.success = true
                        resolve(res)
                    }
                }).catch(err => {
                    console.log("UNABLE TO DELETE REPORTS")
                    reject(res)
                })
            } catch (error) {
                res.message = "Something went wrong"
                res.success = true
                reject(res)
                // let response = {
                //     data: '',
                //     message: error.message,
                //     error: true
                // }
                // return Promise.resolve(response);
            }
        })
            

                // Users.findOne({
                //     where: {
                //         id: userId,
                //         deletedAt: null
                //     }
                // }).then(user => {

                //     if (user) {
                //         console.log("INSIDE THE DELeTE ERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")


                //         Answer.destroy({
                //             where: {
                //                 [Op.or]: [{ userId: userId }, { matchId: userId }]
                //             }
                //         }).catch(err => {
                //             reject(err)
                //             console.log("unable to delete ANSWERS !")
                //         })

                //         Matches.destroy({
                //             where: {
                //                 [Op.or]: [{ fromId: userId }, { toId: userId }]
                //             }
                //         }).catch(err => {
                //             console.log("UNABLE TO DELETE MATCHES !")
                //         })

                //         CallRequests.destroy({
                //             where: {
                //                 [Op.or]: [{ fromId: userId }, { toId: userId }]
                //             }
                //         }).catch(err => {
                //             console.log("UNABLE TO DELETE CALLREQUESTS")
                //         })

                //         Reactions.destroy({
                //             where: {
                //                 [Op.or]: [{ fromId: userId }, { toId: userId }]
                //             }
                //         }).catch(err => {
                //             console.log("UNABLE TO DELETE REACTIONS")
                //         })

                //         Login.destroy(
                //             {
                //                 where:
                //                 {
                //                     userId: userId
                //                 }
                //             }).catch(err => {
                //                 console.log("UNABLE TO DELETE LOGINS")
                //             })

                //         Peoples.destroy({
                //             where:
                //             {
                //                 userId: userId
                //             }
                //         }).catch(err => {
                //             console.log("UNABLE TO DELETE PEOPLES")
                //         })

                //         Image.destroy({
                //             where:
                //             {
                //                 userId: userId
                //             }
                //         }).catch(err => {
                //             console.log("UNABLE TO DELETE IMAGES")
                //         })

                //         Subscription.destroy(
                //             {
                //                 where:
                //                 {
                //                     userId: userId
                //                 }
                //             }).catch(err => {
                //                 console.log("UNABLE TO DELETE SUBSCRIPTION")
                //             })

                //         Swipecounter.destroy({
                //             where: {
                //                 userId: userId
                //             }
                //         }).catch(err => {
                //             console.log("UNABLE TO DELETE SWIPES")
                //         })

                //         tokenRecords.destroy({
                //             where:
                //             {
                //                 userId: userId
                //             }
                //         }).catch(err => {
                //             console.log("UNABLE TO DELETE TOKEN RECORDS DATA")
                //         })

                //         usersPurchases.destroy({
                //             where:
                //             {
                //                 userId: userId
                //             }
                //         }).catch(err => {
                //             console.log("UNABLE TO DELETE USER PURCHASE DATA")
                //         })

                //         Otp.destroy({
                //             where:
                //             {
                //                 userId: userId
                //             }
                //         }).catch(err => {
                //             console.log("UNABLE TO DELETE OTP DATA")
                //         })


                //         Reports.destroy({
                //             where: {
                //                 [Op.or]: [{ reportedBy: userId }, { reportedFor: userId }]
                //             }
                //         }).catch(err => {
                //             console.log("UNABLE TO DELETE REPORTS")
                //         })

                //         Chat.destroy({
                //             where: {
                //                 [Op.or]: [{ from_id: userId }, { to_id: userId }]
                //             }
                //         }).catch(err => {
                //             console.log("UNABLE TO DELETE CHATS")
                //         })


                //         Selfies.destroy(
                //             {
                //                 where:
                //                 {
                //                     userId: userId
                //                 }
                //             }).catch(err => {
                //                 console.log("UNABLE TO DELETE SELFIES")
                //             })


                //         return Users.destroy({
                //             where:
                //             {
                //                 id: userId
                //             }
                //         }).then(lastuser => {
                //             res.message = "USER PROFILE DELETED SUCCESFULLY"
                //             resolve(res)
                //         }).catch(err => {
                //             console.log("Unable to delete Users data", err)
                //             // res.error = err
                //             // reject(res)
                //         })

                //         var response = {
                //             data: userData,
                //             error: false
                //         }

                //         return response;

                //     } else {
                //         // res.message = 'User Profile not found.'
                //         reject(err)
                //     }
                // }).catch(err => {
                //     // res.message = 'Something went wrong 1.'
                //     console.log("Error issssssss................" + err)
                //     reject(err)
                // })



          
    },
    async ActiveStatus(id)
    {
        try {
            var userData = await Users.update({ statusByadmin: 'Activate' }, { where: { 'id': id } }).then(async userUpdateData => {

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
    async DeactivateStatus(id)
    {
        
            try {
                var userData = await Users.update({ statusByadmin: 'Deactivate' }, { where: { 'id': id } }).then(async userUpdateData => {
    
                    let pushData = {
                        message: 'Alert By Admin',
                        userId: id,
                        message: "Account Has Been Deactivated by Admin",
                        isDeactivated: true,
                        action: 3
                    };
                    push.sendPush(id, pushData);
    
                    var emailfound = await findusermail(id)
                    console.log("------------EMAILSSSSSSSSS------------->>>>>>>>>", emailfound)
                    
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
};
