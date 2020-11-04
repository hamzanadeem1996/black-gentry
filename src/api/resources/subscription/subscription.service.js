const Bcrypt = require("bcryptjs")
const Users = require('../../../../models').Users
const Roles = require('../../../../models').Roles
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
const Chat = require('../../../../models').Chat
const Swipecounter = require('../../../../models').Swipescounters
const Subscription = require('../../../../models').Subscriptions

import push from '../../sendPush.service'


var ejs = require("ejs");

// var colors = require('colors/safe')
import jwt from '../../helpers/jwt'
const Sequelize = require('sequelize')
const Op = Sequelize.Op
import emailService from '../../../email/email.service'

var nodemailer = require('nodemailer');

//Setting nodemailer credentials

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abcdef9689@gmail.com',
    pass: 'qiasefsfhsqsyhwq'
  }
});

export default {
  /*
   *
   * Service for Linkedin login
   * Params: [email,Otp]
   */

  async add(userId, body) {

    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        console.log("----------------------SERVICEEEEEEEEEEEEEEEEEEEEE 3")

        Users.findOne({
          where: {
            id: userId
          }
        }).then(userfound => {
          if (userfound) {

            userfound.update({
              isPremium: "Yes"
            }).catch(err => {
              console.log("UNABLE TO UPDATE STATUS OF USERS", err)
            })
            console.log("----------------------SERVICEEEEEEEEEEEEEEEEEEEEE 2")

            Subscription.findOne({
              where: {
                userId: userId
              }
            }).then(subfound => {


              // body.autoRenewing = (body.autoRenewing == 0 ? '0' : '1')
              console.log('---bodydddddd', body.purchaseState)
              if (subfound) {
                console.log('/********************', body)
                subfound.update({
                  subscriptionId: body.subscriptionId,
                  loginType: body.loginType,
                  orderId: body.orderId,
                  purchaseToken: body.purchaseToken,
                  purchaseTime: body.purchaseTime,
                  signature: body.signature,
                  purchaseState: body.purchaseState,
                  autoRenewing: body.autoRenewing,
                  price: body.price,
                  subscriptionPeriod: body.subscriptionPeriod
                }).then(subupd => {

                  Subscription.findOne({
                    where: {
                      userId: userId
                    }
                  }).then(subfind => {
                    res.success = true
                    res.message = "Update Subscription !"
                    res.subscription = subfind
                    resolve(res)
                  }).catch(err => {
                    console.log(err)
                    res.message = "Unable to fetch Subscription"
                    reject(res)
                  })

                }).catch(err => {
                  console.log(err)
                  res.message = "Unable to update Subscription"
                  reject(res)
                })

              } else {
                console.log("----------------------SERVICEEEEEEEEEEEEEEEEEEEEE 1")
                Subscription.create({
                  userId: userId,
                  subscriptionId: body.subscriptionId,
                  loginType: body.loginType,
                  orderId: body.orderId,
                  purchaseToken: body.purchaseToken,
                  purchaseTime: body.purchaseTime,
                  signature: body.signature,
                  purchaseState: body.purchaseState,
                  autoRenewing: body.autoRenewing,
                  price: body.price,
                  subscriptionPeriod: body.subscriptionPeriod
                }).then(subscriptioncreate => {

                  res.message = "Subscription Added Succesfully !"
                  res.subscription = subscriptioncreate,
                    res.success = true,
                    resolve(res)

                }).catch(err => {
                  console.log(err)
                  res.message = "Unable to Add Subscription"
                  reject(res)
                })
              }

            }).catch(err => {
              console.log(err)
              res.message = "UNABLE TO EXECUTE SUBSCRIPTION FUNCTIONALITY"
              reject(res)
            })

          } else {
            console.log("USER DOESN'T EXIST")
          }
        })

      } catch (err) {
        console.log(err)
        res.message = 'Something went wrong..........2'
        // res.error = err
        res.success = false
        reject(res)
      }
    })
  },

  async getDetails(userId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {

        console.log("-------->>>>>>>>>>>>>>", userId)

        Users.findOne({
          where: {
            id: userId,
            isPremium: "Yes"
          },
          include: {
            model: Subscription,
            as: 'subscriptionForUser'
          }
        }).then(userfound => {

          if (userfound) {
            console.log("Is a premium Member.........!")
            res.success = true
            res.message = "Details of Subscription ... !"
            res.subscription = userfound
            resolve(res)
          } else {
            console.log("Not a premium Member.........!")
            res.message = "Not a premium Member"
            reject(res)
          }
        })

      } catch (err) {
        console.log(err)
        res.message = 'Something went wrong..........2'
        // res.error = err
        res.success = false
        reject(res)
      }
    })
  },

  async updateSubscription(userId, body) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {

        console.log("-------->>>>>>>>>>>>>>", userId)

        Subscription.findOne({
          where: {
            userId: userId,
            subscriptionId: body.subscriptionId
          }
        }).then(subfound => {

          if (subfound) {

            if (body.subscriptionStatus == "Active") {
              Users.update({
                isPremium: "Yes"
              }, {
                where: {
                  id: userId
                }
              })
            } else {
              Users.update({
                isPremium: "No"
              }, {
                where: {
                  id: userId
                }
              })
            }

            subfound.update({
              subscriptionStatus: body.subscriptionStatus
            }).then(statusupd => {

              Users.findOne({
                where: {
                  id: userId
                },
                include: {
                  model: Subscription,
                  as: 'subscriptionForUser'
                }
              }).then(userinfo => {

                res.success = true
                res.message = "Subscription Details"
                res.subscription = userinfo
                resolve(res)

              }).catch(err => {
                res.message = "Unable to fetch Details of user"
                reject(res)
              })

            }).catch(err => {
              res.message = "Unable to update status of Subscription !"
              reject(res)
            })
          } else {
            res.message = "Unable to found Subscription"
            reject(res)
          }
        })

      } catch (err) {
        console.log(err)
        res.message = 'Something went wrong..........2'
        // res.error = err
        res.success = false
        reject(res)
      }
    })
  },
  async subscription(userId, body) {

    return new Promise((resolve, reject) => {
      var res = {
        success: false
      }
      try {
        if(body.purchaseToken)
        {
         Subscription.findAll({
           where: {
            purchaseToken: body.purchaseToken
          }
        }).then(sub => {
          console.log('------sub',sub)
          if (sub !='') {
            res.isavailable = true
            resolve(res)
          } else {
            body.userId =  userId;
            Subscription.create(body).then(crea => {
              res.message = "Subscription added successfully"
              res.isavailable = false
              resolve(res)
            }).catch(err => {
              console.log(err)
              res.message = 'Something went wrong..........1'
              // res.error = err
              res.success = false
              reject(res)
            })
          }
        }).catch(err => {
          console.log(err)
          res.message = 'Something went wrong..........2'
          // res.error = err
          res.success = false
          reject(res)
        })
      }
      else
      {
        res.message = 'Unable to fetch data'
        // res.error = err
        res.success = false
        res.status = 404
        reject(res)
      }
      } catch (err) {
        console.log(err)
        res.message = 'Something went wrong..........3'
        // res.error = err
        res.success = false
        reject(res)
      }
    })
  },
}