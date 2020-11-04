const Users = require('../../../../models').Users
const Peoples = require('../../../../models').Peoples
const Images = require('../../../../models').Images
const Answers = require('../../../../models').Answers
const Chat = require('../../../../models').Chat
const Swipecounter = require('../../../../models').Swipescounters
const tokenRecords = require('../../../../models').tokenRecords

const Reactions = require('../../../../models').Reactions
const Reports = require('../../../../models').Reports
import push from '../../sendPush.service'
const Sequelize = require('sequelize')
const Matches = require('../../../../models').Matches
const CallRequests = require('../../../../models').CallRequests
const usersPurchases = require('../../../../models').usersPurchases
const Op = Sequelize.Op
const env = process.env.NODE_ENV || 'development';
const config = require('../../../../config/config.json')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

var nodemailer = require('nodemailer');
const axios = require('axios');


// import push from '../../sendPush.service'

//Setting nodemailer credentials

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abcdef9689@gmail.com',
    pass: 'qiasefsfhsqsyhwq'
  }
});

var moment = require('moment');

var CronJob = require('cron').CronJob;

// Free 50 Swipes after every 12 hours

// var job = new CronJob('* * * * * *', function () {
////////////////////////////
var job = new CronJob('0 */5 * * * *', function () {

  var today = new Date();
  var dif = today.setHours(today.getHours() - 12)
  dif = new Date(JSON.parse(dif));
  // console.log('You will  second',dif);



  Swipecounter.findAll({

  }).then(cvsdfsd => {

    // console.log("----------------", JSON.stringify(cvsdfsd))

    var i = 1;
    cvsdfsd.forEach(function (data) {

      i++;

      var current = new Date();

      console.log(data.dataValues.updatedAt)
      if (data.dataValues.updatedAt >= (dif)) {
        console.log("Will  not update")
      }
      else {
        console.log(" Update ")
        Swipecounter.update({
          likesCounter: 0,
          totalCounter: 0,
          swipesGivenAt: current
        }, {
          where: {
            userId: data.dataValues.userId
          }
        })
      }

    })

  })

}, null, true, 'America/Los_Angeles');
job.start();

// EXPIRY PUSH FOR MATCHES

// var expiry_job = new CronJob('* * * * * *', function () {
var expiry_job = new CronJob('0 */1 * * * *', function () {

  Matches.findAll({
    where: {
      CalltimerExpiry: { [Op.ne]: null },
      isChatStarted: "No"
    }
  }).then(matchexp => {

    var i = 1;
    matchexp.forEach(function (data) {

      i++;
      var today2 = new Date();
      console.log('cURRENT dATE Time', today2);
      var dif = today2.setHours(today2.getHours() - 1)
      dif = new Date(JSON.parse(dif));

      console.log("Expiry Time", data.dataValues.CalltimerExpiry)

      var expiretime = data.dataValues.CalltimerExpiry

      var today = new Date();


      var now = moment(expiretime);
      var end = moment(today);
      var duration = moment.duration(now.diff(end));
      var seconds = duration.asSeconds();
      var minutes = parseInt(seconds / 60)
      var hours = parseInt(parseInt(seconds / 60) / 60)
      minutes = minutes - hours * 60
      seconds = parseInt(seconds - minutes * 60 - hours * 60 * 60)


      console.log('Expiry Time Left ============== minutes-', hours, minutes, seconds)

      if ((hours <= 1) && (hours >= 0)) {
        console.log("Will SEND Push Notification")

        var fromid = data.dataValues.fromId
        var toId = data.dataValues.toId

        Users.findAll({
          where: {
            [Op.or]: [{ id: fromid }, { id: toId }]
          }
        }).then(userpush => {

          userpush.forEach(function (data) {

            i++;

            Peoples.findOne({
              where: {
                userId: data.dataValues.id
              },
              attributes: ['expiredMatches']
            }).then(expirecheck => {

              if (expirecheck.dataValues.expiredMatches == "On") {

                Matches.findOne({
                  where: {
                    [Op.and]: [
                      {
                        [Op.or]: [{ fromId: fromid }, { toId: fromid }]
                      },
                      {
                        [Op.or]: [{ fromId: toId }, { toId: toId }]
                      }
                    ],
                    isNotified: 0
                  }
                }).then(matchfnd => {

                  if (matchfnd) {

                    matchfnd.update({
                      isNotified: 1
                    })

                    let pushData = {
                      message: 'One of your matches is expiring soon. Log in and start chatting. ',
                      fromid: fromid,
                      toid: toId,
                      expiryMatch: true,
                      action: 3
                    };
                    push.sendPush(data.dataValues.id, pushData);
                  }
                  else {
                    console.log("Already notified")
                  }

                })

              }
              else {
                console.log("Expired match notification is off")
              }
            })


            console.log("Sending Push to .........", data.dataValues.id)

          })

        })

      }
      else {
        console.log("Will  not Push Notification")
      }

    })

  })
  // var today2 = new Date();
  // var dif = today2.setHours(today2.getHours() - 12)
  // dif = new Date(JSON.parse(dif));

}, null, true, 'America/Los_Angeles');
expiry_job.start();



/*var refreshTokenjob = new CronJob('* * * * * *', function () {
  let today = new Date()
  today.setDate(today.getDate() - 60)
  Users.findAll({
    where: {
      instaTokenCreated: { [Op.lte]: today }
    }
  }).then(user => {
    if (user.length)
      for (let users of user) {
        axios.get('https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=' + users.instaToken)
          .then(function (response) {
            // handle success
            console.log(response.data.access_token);
            if (response.data) {
              Users.update({
                instaToken: response.data.access_token,
                instaTokenCreated: new Date()
              }, {
                where: {
                  id: users.id
                }
              }).then(user => {
                console.log('successfully refresh')
              })
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      }
  })
}, null, true, 'America/Los_Angeles');*/
//refreshTokenjob.start();



// Matches.findOne({
//   where: {
//     fromId: 2
//   }
// }).then(matchdata => {

//   var expiretime = matchdata.dataValues.CalltimerExpiry

//   var today = new Date();


//   var now = moment(expiretime); 
//   var end = moment(today); 
//   var duration = moment.duration(now.diff(end));
//   var seconds = duration.asSeconds();
//   var minutes = parseInt(seconds/60)
//   var hours = parseInt(parseInt(seconds/60)/60)
//   minutes = minutes - hours*60
//   seconds = parseInt(seconds - minutes*60 - hours*60*60)


//   console.log('jdfkjdskjfds============== minutes-',hours, minutes, seconds)

// })


//To  get all Images By User Id:::::::::::::::::::::::::::::::::::::::::

function getImages(userid) {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      Images.findAll({
        where: {
          "userId": userid
        },
        order: [
          ['orderId', 'ASC']
        ],
        attributes: ['id', 'orderId', 'imageUrl'],
        raw: true
      }).then(userImages => {
        res.success = true
        res.data = userImages
        resolve(res)
      }).catch(err => {
        // res.error = err
        res.message = "UNABLE TO FETCH IMAGES"
        reject(res)
      })
    } catch (err) {
      // res.err = err
      console.log("Error is=======---------------------->", err)
      res.message = 'Something went wrong with fetching images!'
      reject(res)
    }
  })

}

function getQuestions(userid) {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      Peoples.findOne({
        where: {
          "userId": userid
        },
        attributes: ['userId', 'Question1', 'Question2', 'Question3'],
        raw: true
      }).then(userQuestions => {
        console.log(userQuestions)
        res.success = true
        res.data = userQuestions
        resolve(res)
      }).catch(err => {
        // res.error = err
        res.message = "UNABLE TO FETCH QUESTIONS"
        reject(res)
      })
    } catch (err) {
      // res.err = err
      console.log("Error is=======---------------------->", err)
      res.message = 'Something went wrong with fetching images!'
      reject(res)
    }
  })
}


export default {


  /*
  *
  * Service for get all matches
  * 
  * Params: [latitude, longitude]
  * 
  * return data
  * 
  */


  async getAll(userId, pageNumber, setLimit) {

    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        await Peoples.findOne({
          where: {
            userId: userId
          },
          include: {
            model: Users,
            as: 'profileOfUser',
            include: {
              model: Reactions,
              as: 'reactPerson'
            }
          },
        }).then(interest => {

          if (interest) {
            let limit = Number(setLimit)
            const page = pageNumber
            let dislikes = interest.profileOfUser.reactPerson.map(val => {
              //if(val.reaction == 'dislike')
              return val.toId
            })
            console.log('interes..........', dislikes);

            if (interest.interested == 'Men') {
              var query_p = { gender: 'Male' };
              var query_z = { showmeto: interest.gender }
            }
            if (interest.interested == 'Women') {
              var query_p = { gender: 'Female' };
              var query_z = { showmeto: interest.gender }
            }
            if (interest.interested == 'Both') {
              var query_p = { gender: { [Op.ne]: null } };
              var query_z = {}
            }

            Users.findOne({
              where: {
                isVerified: "Yes",
                id: userId
              }
            }).then(selfiefound => {

              if (selfiefound) {

                Users.findAll({
                  where: {
                    id: { [Op.and]: [{ [Op.ne]: userId }, { [Op.notIn]: dislikes }] },
                    deletedAt: null,
                    status: 'Active',
                    statusByadmin: 'Activate',
                    isVerified: "Yes",
                    isRejected: 0
                  },
                  include: [{
                    attributes: [[Sequelize.literal(`6371 * acos(cos(radians(${interest.latitude})) * cos(radians(latitude)) * cos(radians(${interest.longitude}) - radians(longitude)) + sin(radians(${interest.latitude})) * sin(radians(latitude)))`), 'distance'],
                    [Sequelize.literal(`TIMESTAMPDIFF(YEAR, dob, CURDATE())`), 'age'], [Sequelize.literal(`CURRENT_TIMESTAMP`), 'ServerTime'],
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
                      'longitude'],
                    model: Peoples,
                    as: 'profileOfUser',
                    where: [Sequelize.where(
                      Sequelize.literal(`6371 * acos(cos(radians(${interest.latitude})) * cos(radians(latitude)) * cos(radians(${interest.longitude}) - radians(longitude)) + sin(radians(${interest.latitude})) * sin(radians(latitude)))`),
                      '<=',
                      interest.distance,
                    ), {
                      [Op.or]: [
                        query_p,
                        query_z
                      ]
                    }, {
                      [Sequelize.Op.not]: [{ name: null }]
                    }, {
                      [Sequelize.Op.not]: [{ dob: null }]
                    }, {
                      [Sequelize.Op.not]: [{ gender: null }]
                    }, {
                      [Sequelize.Op.not]: [{ interested: null }]
                    }, { visible: true },
                    Sequelize.where(
                      Sequelize.literal(`TIMESTAMPDIFF(YEAR, dob, CURDATE())`),
                      '<=',
                      interest.maxAgePrefer,
                    ),
                    Sequelize.where(
                      Sequelize.literal(`TIMESTAMPDIFF(YEAR, dob, CURDATE())`),
                      '>=',
                      interest.minAgePrefer,
                    )
                    ]
                  },
                  {
                    model: Images,
                    as: 'ImageForUser',
                    // order: Sequelize.literal('`ImageForUser.orderId` ASC'),
                    attributes: ['orderId', 'imageUrl', 'id'],
                    // order: [
                    //   ['orderId', 'desc']
                    // ]

                  },
                  {
                    model: Answers,
                    as: 'AnswerForUser'
                  },
                  {
                    model: Reports,
                    as: 'ReportForUser'
                  },
                  {
                    model: Reactions,
                    as: 'reactionForUser',

                  },

                  ],
                  // limit : 2,
                  // page: 1,
                  // offset:((page-1)*limit),
                  order: [[Sequelize.literal('rand()')]],
                  limit: limit,
                  offset: ((page - 1) * limit),
                }).then(async matches => {

                  console.log("---------------MATCHES---------->>>>>>>>>>", matches)
                  // array.map(function(currentValue, index, arr), thisValue)

                  var newmatch = matches.map(function (val) {
                    if (val.dataValues.ImageForUser.length >= 3) {

                      return val

                    }
                  })

                  // && val.dataValues.ReportForUser.length == 0

                  // console.log("-------NEW MATCH ARRAY--------->>>>>>>>>>>>>>>>>>>>", JSON.stringify(newmatch))
                  var newmatch = newmatch.filter(function (el) {
                    return el != null;
                  });


                  // console.log("Newmatches------------------------->>>>", newmatch)

                  // newmatch.forEach(element => {
                  //   console.log(element);
                  // });
                  let data = []
                  for (let val of newmatch) {
                    let react = await Reactions.findAll({
                      where: {
                        fromId: val.id,
                        toId: userId
                      }
                    }).then(result => result)
                    let image = await Images.findAll({
                      where: {
                        userId: val.id
                      },
                      attributes: ['orderId', 'imageUrl', 'id'],
                      order: [['orderId', 'ASC']]
                    }).then(result => result)
                    if (val.instaToken != null) {
                      var insta = await axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token=' + val.instaToken)
                        .then(function (responses) {
                          if (responses.data)
                            return responses.data.data
                        }).catch(function (error) {
                          // handle error
                          res.error = error
                          reject(res)
                        })
                    } else {
                      insta = []
                    }

                    data.push({
                      "id": val.id,
                      "email": val.email,
                      "roleId": val.roleId,
                      "linkedinId": val.linkedinId,
                      "isLinkedinUser": val.isLinkedinUser,
                      "status": val.status,
                      "statusByadmin": val.statusByadmin,
                      "isRejected": val.isRejected,
                      "isReported": val.isReported,
                      "isVerified": val.isVerified,
                      "isPremium": val.isPremium,
                      "approvesIn": val.approvesIn,
                      "instaToken": val.instaToken,
                      "deletedAt": val.deletedAt,
                      "createdAt": val.createdAt,
                      "updatedAt": val.updatedAt,
                      "profileOfUser": val.profileOfUser,
                      // "ImageForUser": val.ImageForUser,
                      "ImageForUser": image,
                      "ReportForUser": val.ReportForUser,
                      "AnswerForUser": val.AnswerForUser,
                      "reactionForUser": react,
                      "insta": insta
                    })

                  }
                  if (data && data[0] != null) {
                    res.success = true
                    res.matches = data
                    res.message = "Matches listed successfully."
                    resolve(res)
                  } else {
                    res.message = 'Matches not found'
                    res.success = false
                    reject(res)
                  }
                }).catch(err => {
                  console.log('errr.........', err)
                  res.message = 'Something went wrong.'
                  res.error = err
                  res.success = false
                  reject(res)
                })

              }
              else {
                res.success = true
                res.isSelfieVerified = false
                res.message = "SELFIE NOT VERIFIED YET !"
                reject(res)
              }

            }).catch(err => {
              res.message = "UNABLE TO CHECK SELFIE DATA !"
              reject(res)
            })

          }
        }).catch(err => {
          console.log('errr.........', err)
          res.message = 'Something went wrong.'
          res.error = err
          res.success = false
          reject(res)
        })
        // console.log('interes..........',interest.profileOfUser.reactPerson);return true;

      } catch (err) {
        console.log('errr.........', err)
        res.message = 'Something went wrong.'
        res.error = err
        res.success = false
        reject(res)
      }
    })
  },

  /*
  *
  * Service for get matches details
  * 
  * Params: [latitude, longitude]
  * 
  * return data
  * 
  */
  async getById(matchId, userId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        let interest = await Peoples.findOne({
          where: {
            userId: userId
          }
        }).then(user => {
          if (user) {
            return user
          } else {
            return false
          }
        }).catch(err => {
          console.log('errr.........', err)
          res.message = 'Something went wrong.'
          res.error = err
          res.success = false
          reject(res)
        })

        if (interest)
          Users.findOne({
            where: {
              id: { [Op.ne]: userId },
              deletedAt: null,
              status: 'Active'
            },
            include: [{
              attributes: [
                [Sequelize.literal(`6371 * acos(cos(radians(${interest.latitude})) * cos(radians(latitude)) * cos(radians(${interest.longitude}) - radians(longitude)) + sin(radians(${interest.latitude})) * sin(radians(latitude)))`), 'distance'],
                'name',
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
                'pets',
                'ambitions',
                'Exercise',
                'City',
                'Question1',
                'Question2',
                'Question3',
                'latitude',
                'longitude'
              ],
              model: Peoples,
              as: 'profileOfUser',
              where: {
                interested: interest.interested,
                userId: matchId,
                visible: true
              }
            }, {
              model: Images,
              as: 'ImageForUser'
            }, {
              model: Answers,
              as: 'AnswerForUser'
            }],

          }).then(matches => {
            if (matches) {
              res.success = true
              res.match = matches
              res.message = "Match's details listed successfully."
              resolve(res)
            } else {
              res.message = 'Match not found'
              res.success = false
              reject(res)
            }
          }).catch(err => {
            console.log('errr.........', err)
            res.message = 'Something went wrong.'
            res.error = err
            res.success = false
            reject(res)
          })
      } catch (err) {
        console.log('errr.........', err)
        res.message = 'Something went wrong.'
        res.error = err
        res.success = false
        reject(res)
      }
    })
  },


  /*
      *
      * Service for react for match
      *  
      * params: [toId, reaction]
      * 
      * return data
      * 
      */
  async react(body, userId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {

        await Reactions.findOne({
          where: {
            fromId: body.toId,
            toId: userId
          }
        }).then(async react => {

          Users.findOne({
            where: {
              id: body.toId
            }
          }).then(async chk => {

            if (chk) {
              var superLike = await Peoples.findOne({ atributes: ['superLikesCount'], where: { userId: userId } }).then(result => {
                return result ? result.superLikesCount : 0
              })

              Swipecounter.findOne({
                where: {
                  userId: userId
                }
              }).then(async swpe => {
                Users.findOne({
                  where: {
                    id: userId
                  }
                }).then(async usfund => {

                  if ((swpe.dataValues.likesCounter >= 20) && (body.reaction == "like") && (swpe.isPremium == "No")) {

                    reject(res)
                    res.message = "SWIPECOUNTERS REACHED TO 50 !"
                    res.swipedata = swpe

                  }
                  else {
                    // if (swpe.dataValues.totalCounter >= 50) {
                    //   res.message = "SWIPECOUNTERS REACHED TO 50 !"
                    //   res.swipedata = swpe
                    //   reject(res)
                    // } else {
                    if (((body.reaction == 'superlike') && (superLike > 0)) || (body.reaction != 'superlike')) {

                      if (react) {
                        if ((react.reaction == 'like' || react.reaction == 'superlike') && (body.reaction == 'like' || body.reaction == 'superlike')) {
                          console.log('notify..............................notification');

                          Matches.findOne({
                            where: {
                              [Op.and]: [
                                {
                                  [Op.or]: [{ fromId: userId }, { toId: userId }]
                                },
                                {
                                  [Op.or]: [{ fromId: body.toId }, { toId: body.toId }]
                                }
                              ]
                            }
                          }).then(async chematch => {

                            if (!chematch) {

                              var getQuestionsfromId = await getQuestions(body.toId)

                              var getQuestionstoId = await getQuestions(userId)

                              await Answers.create({
                                userId: userId,
                                matchId: getQuestionsfromId.data.userId,
                                Question1: getQuestionsfromId.data.Question1,
                                Question2: getQuestionsfromId.data.Question2,
                                Question3: getQuestionsfromId.data.Question3
                              })

                              await Answers.create({
                                userId: body.toId,
                                matchId: getQuestionstoId.data.userId,
                                Question1: getQuestionstoId.data.Question1,
                                Question2: getQuestionstoId.data.Question2,
                                Question3: getQuestionstoId.data.Question3
                              })

                              console.log("FROM ID QUESTIONS-------------------->>>>>>>>", getQuestionsfromId.data)
                              console.log("TO ID QUESTIONS-------------------->>>>>>>>", getQuestionstoId.data)


                              await Matches.create({
                                fromId: body.toId,
                                toId: userId,
                                // CalltimerExpiry: __nowdate
                              }).then(async matchcreate => {
                              }).catch(err => {
                                console.log('err..............', err)
                              })
                            }

                          }).catch(err => {
                            console.log("UNABLE TO FOUND MATCHED DATA---------", err)
                          })


                          var checkImage1 = await getImages(userId)

                          var imageA = checkImage1.data[0]


                          var checkImage2 = await getImages(body.toId)

                          var imageB = checkImage2.data[0]


                          Peoples.findOne({
                            where: {
                              userId: userId
                            }
                          }).then(async stopmatchpush => {

                            console.log("STOP MATCHHHHHHHHHHHHHHHHHHH", stopmatchpush.dataValues.matchNotify)

                            if (stopmatchpush.dataValues.matchNotify == "Off") {

                              console.log("NO PUSH WILL SENDDDDDDDDDDDDDDDDDDD")


                            }
                            else {


                              /***********************PUsh notification for match*************************************/


                              Peoples.findOne({
                                where: {
                                  "userId": body.toId
                                },
                                attributes: ['userId', 'name', 'Question1', 'Question2', 'Question3']
                              }).then(sendmatch => {
                                let pushData = {
                                  message: 'You have a new match.',
                                  userId: body.toId,
                                  match: sendmatch.dataValues,
                                  image: imageB,
                                  key: "You are second",
                                  action: 1
                                };
                                push.sendPush(userId, pushData);
                              }).catch(err => {
                                console.log("Unable to send match data.....", err)
                              })

                            }

                            Peoples.findOne({
                              where: {
                                "userId": userId
                              },
                              attributes: ['userId', 'name', 'Question1', 'Question2', 'Question3']
                            }).then(getmatch => {
                              let pushData1 = {
                                message: 'You have a new match.',
                                userId: userId,
                                match: getmatch.dataValues,
                                image: imageA,
                                action: 1
                              };
                              push.sendPush(body.toId, pushData1);
                            }).catch(err => {
                              console.log("Unable to get match data.....", err)
                            })

                          })

                        }
                      }


                      if (body.reaction == 'like') {
                        Swipecounter.findOne({
                          where: {
                            userId: userId
                          }
                        }).then(swipefound => {

                          if (swipefound) {

                            Users.findOne({
                              where: {
                                id: userId,
                                isPremium: "Yes"
                              }
                            }).then(chkpremium => {



                              if (chkpremium != null) {

                              }
                              else {

                                if (swipefound.dataValues.likesCounter >= 20) {

                                  res.message = "SWIPECOUNTERS REACHED TO 50 !"
                                  res.swipedata = swipefound
                                  reject(res)

                                }
                                else {
                                  Swipecounter.update({
                                    likesCounter: swipefound.dataValues.likesCounter + 1
                                  }, {
                                    where: {
                                      userId: userId
                                    }
                                  })
                                }

                              }

                            })

                          }
                          else {

                            Swipecounter.create({
                              userId: userId,
                              likesCounter: 1
                            })

                          }

                        }).catch(err => {
                          console.log("ERROR WHILE COUNTING LIKE SWIPES IS------------", err)
                        })

                      }


                      if (body.reaction == 'superlike') {

                        let superLikeTotal = await Reactions.findAll({
                          where: {
                            // fromId: userId
                            [Op.and]: [{ fromId: userId }, { reaction: 'superlike' }]

                          }
                        }).then(result => {
                          return result ? result.length : 0
                        })

                        if (superLike <= 0) {
                          res.message = 'Your super likes tokens are finished.'
                          res.success = false
                          reject(res)
                        }

                      }

                      await Reactions.findOne({
                        where: {
                          fromId: userId,
                          toId: body.toId
                        }
                      }).then(async react => {
                        if (react) {

                          var likercount = " "

                          Reactions.findOne({
                            where: {
                              fromId: body.toId,
                              toId: userId,
                              reaction: { [Op.ne]: 'dislike' }
                            }
                          }).then(chk => {
                            if (chk) {
                              likercount = "Second"
                            }
                            else {
                              likercount = "First"
                            }

                            react.update(body).then(react => {
                              res.success = true
                              if (body.reaction != "dislike") {
                                res.key = likercount
                                console.log(body.reaction)
                              } else {
                                res.key = ''
                              } res.react = react
                              // new code 
                              // if (body.reaction == "dislike" || body.reaction == "like" || body.reaction == "superlike") {
                              //   Swipecounter.findOne({
                              //     where: {
                              //       userId: userId
                              //     }
                              //   }).then(detail => {
                              //     console.log(detail, 'detail----------------------------------')
                              //     if (swpe.totalCounter != null) {
                              //       Swipecounter.update({
                              //         "totalCounter": swpe.totalCounter + 1
                              //       }, {
                              //         where: {
                              //           userId: userId
                              //         }
                              //       })
                              //     } else {
                              //       Swipecounter.update({
                              //         "totalCounter": 1
                              //       }, {
                              //         where: {
                              //           userId: userId
                              //         }
                              //       })
                              //     }
                              //   })
                              // }
                              //ends
                              res.message = body.reaction + " successfully."
                              resolve(res)
                            }).catch(err => {
                              console.log('errr.........', err)
                              res.message = 'Something went wrong 1.'
                              res.error = err
                              res.success = false
                              reject(res)
                            })

                          })


                        } else {
                          body.fromId = userId

                          var likercount = " "

                          Reactions.findOne({
                            where: {
                              fromId: body.toId,
                              toId: userId,
                              reaction: { [Op.ne]: 'dislike' }
                            }
                          }).then(chk => {
                            if (chk) {
                              likercount = "Second"
                            }
                            else {
                              likercount = "First"
                            }
                          })

                          Users.findOne({
                            where: {
                              id: userId
                            }
                          }).then(usrter => {


                            Swipecounter.findOne({
                              where: {
                                userId: userId
                              }
                            }).then(swpe => {
                              if ((swpe.dataValues.likesCounter >= 20) && (body.reaction == "like") && (usrter.isPremium == "No")) {

                                console.log("SWIPECOUNTERS REACHED TO 50")
                                res.message = "SWIPECOUNTERS REACHED TO 50 !"
                                res.swipedata = swpe
                                reject(res)

                              }
                              else {
                                Reactions.create(body).then(async react => {

                                  var superlikecount = await Peoples.findOne({ atributes: ['superLikesCount'], where: { userId: userId } }).then(result => {
                                    return result ? result.superLikesCount : 0
                                  })

                                  if (body.reaction == "superlike") {
                                    if (superlikecount != 0) {
                                      var superlikeval = superlikecount - 1
                                    }

                                    Peoples.update({
                                      "superLikesCount": superlikeval
                                    }, {
                                      where: {
                                        userId: userId
                                      }
                                    })

                                  }

                                  if (body.reaction != "dislike") {
                                    res.key = likercount
                                  } else {
                                    delete res.key
                                  }
                                  // new code 
                                  // if (body.reaction == "dislike" || body.reaction == "like" || body.reaction == "superlike") {
                                  //   Swipecounter.findOne({
                                  //     where: {
                                  //       userId: userId
                                  //     }
                                  //   }).then(detail => {
                                  //     console.log(detail, 'detail----------------------------------')
                                  //     if (swpe.totalCounter != null) {
                                  //       Swipecounter.update({
                                  //         "totalCounter": swpe.totalCounter + 1
                                  //       }, {
                                  //         where: {
                                  //           userId: userId
                                  //         }
                                  //       })
                                  //     } else {
                                  //       Swipecounter.update({
                                  //         "totalCounter": 1
                                  //       }, {
                                  //         where: {
                                  //           userId: userId
                                  //         }
                                  //       })
                                  //     }
                                  //   })
                                  // }
                                  //ends
                                  res.success = true
                                  res.react = react
                                  res.message = body.reaction + " successfully."
                                  resolve(res)
                                }).catch(err => {
                                  console.log('errr.........', err)
                                  res.message = 'Something went wrong 2.'
                                  res.error = err
                                  res.success = false
                                  reject(res)
                                })
                              }
                            })
                          })
                        }
                      }).catch(err => {
                        console.log('errr.........', err)
                        res.message = 'Something went wrong 3.'
                        res.error = err
                        res.success = false
                        reject(res)
                      })


                    }
                    else {
                      console.log("Your super likes tokens are finished. 2222222222222222222222")
                      res.message = "Your super likes tokens are finished."
                      reject(res)
                    }
                    // } //check END------------
                  } // end

                })

              })

            }
            else {
              res.success = true
              res.notExisted = "User not Available !"
              resolve(res)
            }
          })


        }).catch(err => {
          console.log('errr.........', err)
          res.message = 'Something went wrong 4.'
          res.error = err
          res.success = false
          reject(res)
        })

      } catch (err) {
        console.log('errr.........', err)
        res.message = 'Something went wrong 5.'
        res.error = err
        res.success = false
        reject(res)
      }
    })
  },

  /*
  *
  * React V1 API 
  *
  */


  async reactForV1(body, userId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {

        await Reactions.findOne({
          where: {
            fromId: body.toId,
            toId: userId
          }
        }).then(async react => {

          Users.findOne({
            where: {
              id: body.toId
            }
          }).then(async chk => {

            if (chk) {
              var superLike = await Peoples.findOne({ atributes: ['superLikesCount'], where: { userId: userId } }).then(result => {
                return result ? result.superLikesCount : 0
              })

              Swipecounter.findOne({
                where: {
                  userId: userId
                }
              }).then(async swpe => {
                Users.findOne({
                  where: {
                    id: userId
                  }
                }).then(async usfund => {
                  if ((swpe.dataValues.likesCounter >= 20 || swpe.dataValues.totalCounter >= 50) && (body.reaction == "like") && (usfund.isPremium == "No")) {
                      res.message = "SWIPECOUNTERS REACHED TO 50 !"
                      res.swipedata = swpe
                      reject(res)
                  } else if ((swpe.dataValues.likesCounter >= 20 || swpe.dataValues.totalCounter >= 50)  && (body.reaction == "dislike") && (usfund.isPremium == "No")) {
                      res.message = "SWIPECOUNTERS REACHED TO 50 !"
                      res.swipedata = swpe
                      reject(res)
                  } 
                  else {
                    if (((body.reaction == 'superlike') && (superLike > 0)) || (body.reaction != 'superlike')) {
                      if (react) {
                        if ((react.reaction == 'like' || react.reaction == 'superlike') && (body.reaction == 'like' || body.reaction == 'superlike')) {
                          Matches.findOne({
                            where: {
                              [Op.and]: [
                                {
                                  [Op.or]: [{ fromId: userId }, { toId: userId }]
                                },
                                {
                                  [Op.or]: [{ fromId: body.toId }, { toId: body.toId }]
                                }
                              ]
                            }
                          }).then(async chematch => {

                            if (!chematch) {

                              var getQuestionsfromId = await getQuestions(body.toId)

                              var getQuestionstoId = await getQuestions(userId)

                              await Answers.create({
                                userId: userId,
                                matchId: getQuestionsfromId.data.userId,
                                Question1: getQuestionsfromId.data.Question1,
                                Question2: getQuestionsfromId.data.Question2,
                                Question3: getQuestionsfromId.data.Question3
                              })

                              await Answers.create({
                                userId: body.toId,
                                matchId: getQuestionstoId.data.userId,
                                Question1: getQuestionstoId.data.Question1,
                                Question2: getQuestionstoId.data.Question2,
                                Question3: getQuestionstoId.data.Question3
                              })
                              await Matches.create({
                                fromId: body.toId,
                                toId: userId,
                                // CalltimerExpiry: __nowdate
                              }).then(async matchcreate => {
                              }).catch(err => {
                                console.log('err..............', err)
                              })
                            }

                          }).catch(err => {
                            console.log("UNABLE TO FOUND MATCHED DATA---------", err)
                          })


                          var checkImage1 = await getImages(userId)

                          var imageA = checkImage1.data[0]


                          var checkImage2 = await getImages(body.toId)

                          var imageB = checkImage2.data[0]


                          Peoples.findOne({
                            where: {
                              userId: userId
                            }
                          }).then(async stopmatchpush => {
                            if (stopmatchpush.dataValues.matchNotify == "Off") {
                              console.log("NO PUSH WILL SENDDDDDDDDDDDDDDDDDDD")
                            }
                            else {


                              /***********************PUsh notification for match*************************************/


                              Peoples.findOne({
                                where: {
                                  "userId": body.toId
                                },
                                attributes: ['userId', 'name', 'Question1', 'Question2', 'Question3']
                              }).then(sendmatch => {
                                let pushData = {
                                  message: 'You have a new match.',
                                  userId: body.toId,
                                  match: sendmatch.dataValues,
                                  image: imageB,
                                  key: "You are second",
                                  action: 1
                                };
                                push.sendPush(userId, pushData);
                              }).catch(err => {
                                console.log("Unable to send match data.....", err)
                              })

                            }

                            Peoples.findOne({
                              where: {
                                "userId": userId
                              },
                              attributes: ['userId', 'name', 'Question1', 'Question2', 'Question3']
                            }).then(getmatch => {
                              let pushData1 = {
                                message: 'You have a new match.',
                                userId: userId,
                                match: getmatch.dataValues,
                                image: imageA,
                                action: 1
                              };
                              push.sendPush(body.toId, pushData1);
                            }).catch(err => {
                              console.log("Unable to get match data.....", err)
                            })

                          })

                        }
                      }


                      if (body.reaction == 'like') {
                        Swipecounter.findOne({
                          where: {
                            userId: userId
                          }
                        }).then(swipefound => {

                          if (swipefound) {

                            Users.findOne({
                              where: {
                                id: userId,
                                isPremium: "Yes"
                              }
                            }).then(chkpremium => {



                              if (chkpremium != null) {

                              }
                              else {

                                if (swipefound.dataValues.likesCounter >= 20 || swipefound.dataValues.totalCounter >=50) {

                                  res.message = "SWIPECOUNTERS REACHED TO 50 !"
                                  res.swipedata = swipefound
                                  reject(res)

                                }
                                else {
                                  Swipecounter.update({
                                    likesCounter: swipefound.dataValues.likesCounter + 1,
                                    totalCounter:swipefound.dataValues.totalCounter+1
                                  }, {
                                    where: {
                                      userId: userId
                                    }
                                  })
                                }

                              }

                            })

                          }
                          else {

                            Swipecounter.create({
                              userId: userId,
                              likesCounter: 1
                            })

                          }

                        }).catch(err => {
                          console.log("ERROR WHILE COUNTING LIKE SWIPES IS------------", err)
                        })

                      }


                      if (body.reaction == 'superlike') {

                        let superLikeTotal = await Reactions.findAll({
                          where: {
                            // fromId: userId
                            [Op.and]: [{ fromId: userId }, { reaction: 'superlike' }]

                          }
                        }).then(result => {
                          return result ? result.length : 0
                        })
                        console.log('---supeee',superLike)
                        if (superLike <= 0) {
                          res.message = 'Your super likes tokens are finished.'
                          res.success = false
                          reject(res)
                        }
                        else
                        {
                         let superlikes = superLike - 1
                          Peoples.findOne({
                            where: {
                              userId:userId
                            }
                          }).then(people =>{
                            if(people)
                            {
                                people.update({
                                superLikesCount:superlikes
                              })
                              // .then(done =>{
                              //   // console.log('-----supppppppppppp')
                              //   // res.message = "superlike successfully",
                              //   // res.success = true,
                              //   // res.react = done,
                              //   resolve(res)
                              // }).catch(err =>{
                              //   console.log('---err',err)
                              //   res.error = err
                              //   res.message = 'Something went wrong'
                              //   res.success = false
                              //   reject(res)

                              // })
                            }

                          }).catch(err =>{
                          res.message = 'Something went wrong'
                          res.success = false
                          reject(res)
                          })
                          {
                            
                          }
                        }

                      }

                      await Reactions.findOne({
                        where: {
                          fromId: userId,
                          toId: body.toId
                        }
                      }).then(async react => {
                        if (react) {

                          var likercount = " "

                          Reactions.findOne({
                            where: {
                              fromId: body.toId,
                              toId: userId,
                              reaction: { [Op.ne]: 'dislike' }
                            }
                          }).then(chk => {
                            if (chk) {
                              likercount = "Second"
                            }
                            else {
                              likercount = "First"
                            }
                            react.update(body).then(react => {
                              res.success = true
                              if (body.reaction != "dislike") {
                                res.key = likercount
                                console.log(body.reaction)
                              } else {
                                res.key = ''
                              } res.react = react
                              // new code 
                              console.log('-----dfdfjd',usfund.isPremium)

                                  if ((body.reaction == "dislike" || body.reaction == "like") && body.reaction != "superlike" && usfund.isPremium == "No") {
                                    Swipecounter.findOne({
                                      where: {
                                        userId: userId
                                      }
                                    }).then(detail => {
                                
                                      if (swpe.totalCounter != null) {
                                        Swipecounter.update({
                                          "totalCounter": swpe.totalCounter + 1
                                        }, {
                                          where: {
                                            userId: userId
                                          }
                                        })
                                      } else {
                                        Swipecounter.update({
                                          "totalCounter": 1
                                        }, {
                                          where: {
                                            userId: userId
                                          }
                                        })
                                      }
                                    })
                                  }
                              //ends
                              res.message = body.reaction + " successfully."
                              resolve(res)
                            }).catch(err => {
                              console.log('errr.........', err)
                              res.message = 'Something went wrong 1.'
                              res.error = err
                              res.success = false
                              reject(res)
                            })

                          })


                        } else {
                          body.fromId = userId

                          var likercount = " "

                          Reactions.findOne({
                            where: {
                              fromId: body.toId,
                              toId: userId,
                              reaction: { [Op.ne]: 'dislike' }
                            }
                          }).then(chk => {
                            if (chk) {
                              likercount = "Second"
                            }
                            else {
                              likercount = "First"
                            }
                          })

                          Users.findOne({
                            where: {
                              id: userId
                            }
                          }).then(usrter => {


                            Swipecounter.findOne({
                              where: {
                                userId: userId
                              }
                            }).then(swpe => {
                              if ((swpe.dataValues.likesCounter >= 20) && (body.reaction == "like") && (usrter.isPremium == "No")) {

                                console.log("SWIPECOUNTERS REACHED TO 50")
                                res.message = "SWIPECOUNTERS REACHED TO 50 !"
                                res.swipedata = swpe
                                reject(res)

                              }
                              else {
                                Reactions.create(body).then(async react => {

                                  var superlikecount = await Peoples.findOne({ atributes: ['superLikesCount'], where: { userId: userId } }).then(result => {
                                    return result ? result.superLikesCount : 0
                                  })

                                  // if (body.reaction == "superlike") {
                                  //   if (superlikecount != 0) {
                                  //     var superlikeval = superlikecount - 1
                                  //   }

                                  //   Peoples.update({
                                  //     "superLikesCount": superlikeval
                                  //   }, {
                                  //     where: {
                                  //       userId: userId
                                  //     }
                                  //   })

                                  // }

                                  if (body.reaction != "dislike") {
                                    res.key = likercount
                                  } else {
                                    delete res.key
                                  }
                                  // new code 
                                    if (body.reaction == "dislike" || body.reaction == "like" || body.reaction == "superlike" && swpe.isPremium == "No") {
                                      Swipecounter.findOne({
                                        where: {
                                          userId: userId
                                        }
                                      }).then(detail => {
                                        console.log(detail, 'detail----------------------------------')
                                        if (swpe.totalCounter != null) {
                                          Swipecounter.update({
                                            "totalCounter": swpe.totalCounter + 1
                                          }, {
                                            where: {
                                              userId: userId
                                            }
                                          })
                                        } else {
                                          Swipecounter.update({
                                            "totalCounter": 1
                                          }, {
                                            where: {
                                              userId: userId
                                            }
                                          })
                                        }
                                      })
                                    }
                                  //ends
                                  res.success = true
                                  res.react = react
                                  res.message = body.reaction + " successfully."
                                  resolve(res)
                                }).catch(err => {
                                  console.log('errr.........', err)
                                  res.message = 'Something went wrong 2.'
                                  res.error = err
                                  res.success = false
                                  reject(res)
                                })
                              }
                            })
                          })
                        }
                      }).catch(err => {
                        console.log('errr.........', err)
                        res.message = 'Something went wrong 3.'
                        res.error = err
                        res.success = false
                        reject(res)
                      })


                    }
                    else {
                      res.message = "Your super likes tokens are finished."
                      reject(res)
                    }
                    // } //check END------------
                  } // end

                })

              })

            }
            else {
              res.success = true
              res.notExisted = "User not Available !"
              resolve(res)
            }
          })


        }).catch(err => {
          console.log('errr.........', err)
          res.message = 'Something went wrong 4.'
          res.error = err
          res.success = false
          reject(res)
        })

      } catch (err) {
        console.log('errr.........', err)
        res.message = 'Something went wrong 5.'
        res.error = err
        res.success = false
        reject(res)
      }
    })
  },



 /*
   *
   * React V2 API
   */
  async reactForV2(body, userId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {

        await Reactions.findOne({
          where: {
            fromId: body.toId,
            toId: userId
          }
        }).then(async react => {

          Users.findOne({
            where: {
              id: body.toId
            }
          }).then(async chk => {

            if (chk) {
              var superLike = await Peoples.findOne({ atributes: ['superLikesCount'], where: { userId: userId } }).then(result => {
                return result ? result.superLikesCount : 0
              })

              Swipecounter.findOne({
                where: {
                  userId: userId
                }
              }).then(async swpe => {
                Users.findOne({
                  where: {
                    id: userId
                  }
                }).then(async usfund => {
                  if ((swpe.dataValues.likesCounter >= 50 || swpe.dataValues.totalCounter >= 100) && (body.reaction == "like") && (usfund.isPremium == "No")) {
                      res.message = "SWIPECOUNTERS REACHED TO 100 !"
                      res.swipedata = swpe
                      reject(res)
                  } else if ((swpe.dataValues.likesCounter >= 50 || swpe.dataValues.totalCounter >= 100)  && (body.reaction == "dislike") && (usfund.isPremium == "No")) {
                      res.message = "SWIPECOUNTERS REACHED TO 100 !"
                      res.swipedata = swpe
                      reject(res)
                  } 
                  else {
                    if (((body.reaction == 'superlike') && (superLike > 0)) || (body.reaction != 'superlike')) {
                      if (react) {
                        if ((react.reaction == 'like' || react.reaction == 'superlike') && (body.reaction == 'like' || body.reaction == 'superlike')) {
                          Matches.findOne({
                            where: {
                              [Op.and]: [
                                {
                                  [Op.or]: [{ fromId: userId }, { toId: userId }]
                                },
                                {
                                  [Op.or]: [{ fromId: body.toId }, { toId: body.toId }]
                                }
                              ]
                            }
                          }).then(async chematch => {

                            if (!chematch) {

                              var getQuestionsfromId = await getQuestions(body.toId)

                              var getQuestionstoId = await getQuestions(userId)

                              await Answers.create({
                                userId: userId,
                                matchId: getQuestionsfromId.data.userId,
                                Question1: getQuestionsfromId.data.Question1,
                                Question2: getQuestionsfromId.data.Question2,
                                Question3: getQuestionsfromId.data.Question3
                              })

                              await Answers.create({
                                userId: body.toId,
                                matchId: getQuestionstoId.data.userId,
                                Question1: getQuestionstoId.data.Question1,
                                Question2: getQuestionstoId.data.Question2,
                                Question3: getQuestionstoId.data.Question3
                              })
                              await Matches.create({
                                fromId: body.toId,
                                toId: userId,
                                // CalltimerExpiry: __nowdate
                              }).then(async matchcreate => {
                              }).catch(err => {
                                console.log('err..............', err)
                              })
                            }

                          }).catch(err => {
                            console.log("UNABLE TO FOUND MATCHED DATA---------", err)
                          })


                          var checkImage1 = await getImages(userId)

                          var imageA = checkImage1.data[0]


                          var checkImage2 = await getImages(body.toId)

                          var imageB = checkImage2.data[0]


                          Peoples.findOne({
                            where: {
                              userId: userId
                            }
                          }).then(async stopmatchpush => {
                            if (stopmatchpush.dataValues.matchNotify == "Off") {
                              console.log("NO PUSH WILL SENDDDDDDDDDDDDDDDDDDD")
                            }
                            else {


                              /***********************PUsh notification for match*************************************/


                              Peoples.findOne({
                                where: {
                                  "userId": body.toId
                                },
                                attributes: ['userId', 'name', 'Question1', 'Question2', 'Question3']
                              }).then(sendmatch => {
                                let pushData = {
                                  message: 'You have a new match.',
                                  userId: body.toId,
                                  match: sendmatch.dataValues,
                                  image: imageB,
                                  key: "You are second",
                                  action: 1
                                };
                                push.sendPush(userId, pushData);
                              }).catch(err => {
                                console.log("Unable to send match data.....", err)
                              })

                            }

                            Peoples.findOne({
                              where: {
                                "userId": userId
                              },
                              attributes: ['userId', 'name', 'Question1', 'Question2', 'Question3']
                            }).then(getmatch => {
                              let pushData1 = {
                                message: 'You have a new match.',
                                userId: userId,
                                match: getmatch.dataValues,
                                image: imageA,
                                action: 1
                              };
                              push.sendPush(body.toId, pushData1);
                            }).catch(err => {
                              console.log("Unable to get match data.....", err)
                            })

                          })

                        }
                      }


                      if (body.reaction == 'like') {
                        Swipecounter.findOne({
                          where: {
                            userId: userId
                          }
                        }).then(swipefound => {

                          if (swipefound) {

                            Users.findOne({
                              where: {
                                id: userId,
                                isPremium: "Yes"
                              }
                            }).then(chkpremium => {



                              if (chkpremium != null) {

                              }
                              else {

                                if (swipefound.dataValues.likesCounter >= 50 || swipefound.dataValues.totalCounter >=100) {

                                  res.message = "SWIPECOUNTERS REACHED TO 100 !"
                                  res.swipedata = swipefound
                                  reject(res)

                                }
                                else {
                                  Swipecounter.update({
                                    likesCounter: swipefound.dataValues.likesCounter + 1,
                                    totalCounter:swipefound.dataValues.totalCounter+1
                                  }, {
                                    where: {
                                      userId: userId
                                    }
                                  })
                                }

                              }

                            })

                          }
                          else {

                            Swipecounter.create({
                              userId: userId,
                              likesCounter: 1
                            })

                          }

                        }).catch(err => {
                          console.log("ERROR WHILE COUNTING LIKE SWIPES IS------------", err)
                        })

                      }


                      if (body.reaction == 'superlike') {

                        let superLikeTotal = await Reactions.findAll({
                          where: {
                            // fromId: userId
                            [Op.and]: [{ fromId: userId }, { reaction: 'superlike' }]

                          }
                        }).then(result => {
                          return result ? result.length : 0
                        })
                        console.log('---supeee',superLike)
                        if (superLike <= 0) {
                          res.message = 'Your super likes tokens are finished.'
                          res.success = false
                          reject(res)
                        }
                        else
                        {
                         let superlikes = superLike - 1
                          Peoples.findOne({
                            where: {
                              userId:userId
                            }
                          }).then(people =>{
                            if(people)
                            {
                                people.update({
                                superLikesCount:superlikes
                              })
                              // .then(done =>{
                              //   // console.log('-----supppppppppppp')
                              //   // res.message = "superlike successfully",
                              //   // res.success = true,
                              //   // res.react = done,
                              //   resolve(res)
                              // }).catch(err =>{
                              //   console.log('---err',err)
                              //   res.error = err
                              //   res.message = 'Something went wrong'
                              //   res.success = false
                              //   reject(res)

                              // })
                            }

                          }).catch(err =>{
                          res.message = 'Something went wrong'
                          res.success = false
                          reject(res)
                          })
                          {
                            
                          }
                        }

                      }

                      await Reactions.findOne({
                        where: {
                          fromId: userId,
                          toId: body.toId
                        }
                      }).then(async react => {
                        if (react) {

                          var likercount = " "

                          Reactions.findOne({
                            where: {
                              fromId: body.toId,
                              toId: userId,
                              reaction: { [Op.ne]: 'dislike' }
                            }
                          }).then(chk => {
                            if (chk) {
                              likercount = "Second"
                            }
                            else {
                              likercount = "First"
                            }
                            react.update(body).then(react => {
                              res.success = true
                              if (body.reaction != "dislike") {
                                res.key = likercount
                                console.log(body.reaction)
                              } else {
                                res.key = ''
                              } res.react = react
                              // new code 
                              console.log('-----dfdfjd',usfund.isPremium)

                                  if ((body.reaction == "dislike" || body.reaction == "like") && body.reaction != "superlike" && usfund.isPremium == "No") {
                                    Swipecounter.findOne({
                                      where: {
                                        userId: userId
                                      }
                                    }).then(detail => {
                                
                                      if (swpe.totalCounter != null) {
                                        Swipecounter.update({
                                          "totalCounter": swpe.totalCounter + 1
                                        }, {
                                          where: {
                                            userId: userId
                                          }
                                        })
                                      } else {
                                        Swipecounter.update({
                                          "totalCounter": 1
                                        }, {
                                          where: {
                                            userId: userId
                                          }
                                        })
                                      }
                                    })
                                  }
                              //ends
                              res.message = body.reaction + " successfully."
                              resolve(res)
                            }).catch(err => {
                              console.log('errr.........', err)
                              res.message = 'Something went wrong 1.'
                              res.error = err
                              res.success = false
                              reject(res)
                            })

                          })


                        } else {
                          body.fromId = userId

                          var likercount = " "

                          Reactions.findOne({
                            where: {
                              fromId: body.toId,
                              toId: userId,
                              reaction: { [Op.ne]: 'dislike' }
                            }
                          }).then(chk => {
                            if (chk) {
                              likercount = "Second"
                            }
                            else {
                              likercount = "First"
                            }
                          })

                          Users.findOne({
                            where: {
                              id: userId
                            }
                          }).then(usrter => {


                            Swipecounter.findOne({
                              where: {
                                userId: userId
                              }
                            }).then(swpe => {
                              if ((swpe.dataValues.likesCounter >= 50) && (body.reaction == "like") && (usrter.isPremium == "No")) {

                                console.log("SWIPECOUNTERS REACHED TO 100")
                                res.message = "SWIPECOUNTERS REACHED TO 100 !"
                                res.swipedata = swpe
                                reject(res)

                              }
                              else {
                                Reactions.create(body).then(async react => {

                                  var superlikecount = await Peoples.findOne({ atributes: ['superLikesCount'], where: { userId: userId } }).then(result => {
                                    return result ? result.superLikesCount : 0
                                  })

                                  // if (body.reaction == "superlike") {
                                  //   if (superlikecount != 0) {
                                  //     var superlikeval = superlikecount - 1
                                  //   }

                                  //   Peoples.update({
                                  //     "superLikesCount": superlikeval
                                  //   }, {
                                  //     where: {
                                  //       userId: userId
                                  //     }
                                  //   })

                                  // }

                                  if (body.reaction != "dislike") {
                                    res.key = likercount
                                  } else {
                                    delete res.key
                                  }
                                  // new code 
                                    if (body.reaction == "dislike" || body.reaction == "like" || body.reaction == "superlike" && swpe.isPremium == "No") {
                                      Swipecounter.findOne({
                                        where: {
                                          userId: userId
                                        }
                                      }).then(detail => {
                                        console.log(detail, 'detail----------------------------------')
                                        if (swpe.totalCounter != null) {
                                          Swipecounter.update({
                                            "totalCounter": swpe.totalCounter + 1
                                          }, {
                                            where: {
                                              userId: userId
                                            }
                                          })
                                        } else {
                                          Swipecounter.update({
                                            "totalCounter": 1
                                          }, {
                                            where: {
                                              userId: userId
                                            }
                                          })
                                        }
                                      })
                                    }
                                  //ends
                                  res.success = true
                                  res.react = react
                                  res.message = body.reaction + " successfully."
                                  resolve(res)
                                }).catch(err => {
                                  console.log('errr.........', err)
                                  res.message = 'Something went wrong 2.'
                                  res.error = err
                                  res.success = false
                                  reject(res)
                                })
                              }
                            })
                          })
                        }
                      }).catch(err => {
                        console.log('errr.........', err)
                        res.message = 'Something went wrong 3.'
                        res.error = err
                        res.success = false
                        reject(res)
                      })


                    }
                    else {
                      res.message = "Your super likes tokens are finished."
                      reject(res)
                    }
                    // } //check END------------
                  } // end

                })

              })

            }
            else {
              res.success = true
              res.notExisted = "User not Available !"
              resolve(res)
            }
          })


        }).catch(err => {
          console.log('errr.........', err)
          res.message = 'Something went wrong 4.'
          res.error = err
          res.success = false
          reject(res)
        })

      } catch (err) {
        console.log('errr.........', err)
        res.message = 'Something went wrong 5.'
        res.error = err
        res.success = false
        reject(res)
      }
    })
  },
  /**
   * 
   * Services for adding Time Tokens 
   * 
   **/

  async addTimeTokens(userId, body) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {

        Peoples.findOne({
          where: {
            userId: userId
          }
        }).then(peopledat => {

          var timetoken = peopledat.timeToken + body.timeTokens

          if (peopledat) {

            peopledat.update({
              "timeToken": timetoken
            }).then(tokenupdate => {

              tokenRecords.findOne({
                where: {
                  userId: userId
                }
              }).then(tokn => {

                usersPurchases.create({
                  userId: userId,
                  tokenType: "TimeTokens",
                  Quantity: body.timeTokens,
                  price: body.price
                }).then(purchasemade => {
                  console.log("PURCHASEEEEEEEE MADEEEEEEEE")
                })

                if (tokn) {

                  if (tokn.dataValues.timeTokensPurchased == null) {
                    tokn.update({
                      timeTokensPurchased: body.timeTokens,
                      price: tokn.dataValues.price + body.price
                    })
                  } else {
                    tokn.update({
                      timeTokensPurchased: tokn.dataValues.timeTokensPurchased + body.timeTokens,
                      price: tokn.dataValues.price + body.price
                    })
                  }
                }
                else {
                  tokenRecords.create({
                    userId: userId,
                    timeTokensPurchased: body.timeTokens,
                    price: body.price
                  })
                }
              })

              res.success = true,
                res.totalTimeTokens = tokenupdate.timeToken,
                resolve(res)
            }).catch(err => {
              res.message = 'Unable to update tokens.'
              res.success = false
              reject(res)
            })

          }
          else {
            res.message = 'Unable to find user Data.'
            res.success = false
            reject(res)
          }

        }).catch(err => {
          res.message = 'Something went wrong 1.'
          res.success = false
          reject(res)
        })

      } catch (err) {
        res.message = 'Something went wrong 2.'
        res.error = err
        res.success = false
        reject(res)
      }
    })
  },

  /**
   * 
   * Services for adding Superlikes 
   * 
   **/

  async addSuperLikes(userId, body) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {

        Peoples.findOne({
          where: {
            userId: userId
          }
        }).then(peopledat => {

          var superlike = peopledat.superLikesCount + body.superlikeTokens

          if (peopledat) {

            usersPurchases.create({
              userId: userId,
              tokenType: "CrushTokens",
              Quantity: body.superlikeTokens,
              price: body.price
            }).then(purchasemade => {
              console.log("PURCHASEEEEEEEE MADEEEEEEEE")
            })

            peopledat.update({
              "superLikesCount": superlike
            }).then(tokenupdate => {

              tokenRecords.findOne({
                where: {
                  userId: userId
                }
              }).then(tokn => {

                if (tokn) {

                  if (tokn.dataValues.superlikesPurchased == null) {
                    tokn.update({
                      superlikesPurchased: body.superlikeTokens,
                      price: tokn.dataValues.price + body.price
                    })
                  } else {
                    tokn.update({
                      superlikesPurchased: tokn.dataValues.superlikesPurchased + body.superlikeTokens,
                      price: tokn.dataValues.price + body.price
                    })
                  }
                }
                else {
                  tokenRecords.create({
                    userId: userId,
                    superlikesPurchased: body.superlikeTokens,
                    price: body.price
                  })
                }
              })

              res.success = true,
                res.totalSuperlikes = tokenupdate.superLikesCount,
                resolve(res)
            }).catch(err => {
              res.message = 'Unable to update tokens.'
              res.success = false
              reject(res)
            })

          }
          else {
            res.message = 'Unable to find user Data.'
            res.success = false
            reject(res)
          }

        }).catch(err => {
          res.message = 'Something went wrong 1.'
          res.success = false
          reject(res)
        })

      } catch (err) {
        res.message = 'Something went wrong 2.'
        res.error = err
        res.success = false
        reject(res)
      }
    })
  },

  /**
   * 
   * Services for applying timetokens
   * 
   **/

  async applyTimeTokens(userId, body) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {

        Matches.findOne({
          where: {
            [Op.and]: [
              {
                [Op.or]: [{ fromId: userId }, { toId: userId }]
              },
              {
                [Op.or]: [{ fromId: body.matchId }, { toId: body.matchId }]
              }
            ]
          }
        }).then(async matchget => {
          // console.log("CalltimerExpiry------------->>>>>>>>>>>>>>>>>", matchget.dataValues.CalltimerExpiry)

          var today2 = new Date();

          var timeapplied = body.time
          var tokensapplied = body.numberOfTokens

          var totaltimeApplied = timeapplied * tokensapplied

          if (matchget) {
            Peoples.findOne({
              where: {
                userId: userId
              },
              attributes: ['timeToken', 'name']
            }).then(async gettime => {
              if (gettime) {
                console.log("Total Match tokens are...", gettime.dataValues.timeToken)
                if (gettime.dataValues.timeToken == 0) {
                  res.message = "No more Tokens Left"
                  reject(res)
                }
                else {

                  var totaltokens = gettime.dataValues.timeToken;
                  console.log("TOTAL TIME TOKENS ARE------------->>>>>>>>>>>", totaltokens)

                  var tokensleft = totaltokens - tokensapplied

                  if (tokensleft >= 0) {
                    Peoples.update({
                      timeToken: tokensleft
                    }, {
                      where: {
                        userId: userId
                      }
                    }).then(async updatecount => {
                      console.log("UPDATE COUNT IS-----------", updatecount)
                      var expiretime = matchget.dataValues.CalltimerExpiry;

                      // console.log('exp______________', moment.utc(expiretime).local().format("YYYY-MM-DD HH:mm:ss"))
                      var today = new Date();

                      var end = moment(expiretime).add(totaltimeApplied, 'hours');

                      var newexpiry = moment.utc(end).local().format("YYYY-MM-DD HH:mm:ss")

                      var now = moment(today);
                      var matchDetail = [];
                      if (today < expiretime) {
                        matchget.update({
                          CalltimerExpiry: newexpiry,
                          isNotified: 0,
                          timetokenAppliedOn: today2
                        }).then(async matchupd => {
                          await sequelize.query('SELECT `Users`.*, `profileOfUser`.`id` AS `profileOfUser.id`, `profileOfUser`.`name` AS `profileOfUser.name`, `ImageForUser`.`id` AS `ImageForUser.id`, `ImageForUser`.`userId` AS `ImageForUser.userId`, `ImageForUser`.`orderId` AS `ImageForUser.orderId`, `ImageForUser`.`imageUrl` AS `ImageForUser.imageUrl`, `ImageForUser`.`deletedAt` AS `ImageForUser.deletedAt`, `ImageForUser`.`createdAt` AS `ImageForUser.createdAt`, `ImageForUser`.`updatedAt` AS `ImageForUser.updatedAt`, `MatchForUser`.`id` AS `MatchForUser.id`, `MatchForUser`.`CalltimerExpiry` AS `MatchForUser.CalltimerExpiry`, `MatchForUser`.`answersGiven` AS `MatchForUser.answersGiven`,`MatchForUser`.`timetokenAppliedOn` AS `MatchForUser.timetokenAppliedOn`,  `MatchForUser`.`createdAt` AS `MatchForUser.createdAt`, `MatchForUser`.`updatedAt` AS `MatchForUser.updatedAt`, CURRENT_TIMESTAMP AS `MatchForUser.ServerTime` FROM (SELECT `Users`.`id`, `Users`.`email`, `Users`.`roleId`, `Users`.`status`, `Users`.`deletedAt`, `Users`.`createdAt`, `Users`.`updatedAt` FROM `Users` AS `Users` WHERE (`Users`.`id` != ' + userId + ') AND `Users`.`deletedAt` IS NULL AND `Users`.`status` = "Active" AND ( SELECT `userId` FROM `Images` AS `ImageForUser` WHERE (`ImageForUser`.`orderId` = 1 AND `ImageForUser`.`userId` = `Users`.`id`) LIMIT 1 ) IS NOT NULL AND ( SELECT `fromId` FROM `Matches` AS `MatchForUser` WHERE ((`MatchForUser`.`fromId` = ' + userId + ' OR `MatchForUser`.`toId` = ' + userId + ') AND `MatchForUser`.`fromId` = `Users`.`id` OR `MatchForUser`.`toId` = `Users`.`id` ) LIMIT 1 ) IS NOT NULL ) AS `Users` LEFT OUTER JOIN `Peoples` AS `profileOfUser` ON `Users`.`id` = `profileOfUser`.`userId` INNER JOIN `Images` AS `ImageForUser` ON `Users`.`id` = `ImageForUser`.`userId` AND `ImageForUser`.`orderId` = 1 INNER JOIN `Matches` AS `MatchForUser`  ON (`Users`.`id` = `MatchForUser`.`fromId` OR `Users`.`id` = `MatchForUser`.`toId`) AND  (`MatchForUser`.`fromId` = ' + userId + ' OR `MatchForUser`.`toId` = ' + userId + ') AND `MatchForUser`.`isChatStarted` = "No" order by `MatchForUser`.`createdAt` DESC ', { type: Sequelize.QueryTypes.SELECT }).then(matches => {
                            if (matches && matches.length) {
                              matchDetail.push(matches)
                            }
                          }).catch(err => {
                            console.log('errr.........', err)
                            res.message = 'Something went wrong. 2'
                            res.success = false
                            reject(res)
                          })
                          let pushData = {
                            message: gettime.dataValues.name + ' has applied time token.',
                            userId: userId,
                            action: 4,
                            details: matchDetail
                          };
                          push.sendPush(body.matchId, pushData);


                          res.success = true
                          res.newExpiry = matchupd.CalltimerExpiry

                          resolve(res)
                        }).catch(err => {
                          res.message = "Unable to update Expiry Time"
                          reject(res)
                        })
                      }
                      else if (today > expiretime) {

                        var latestexpiry = today

                        var end2 = moment(latestexpiry).add(totaltimeApplied, 'hours');
                        var newexpiry2 = moment.utc(end2).local().format("YYYY-MM-DD HH:mm:ss")

                        matchget.update({
                          CalltimerExpiry: newexpiry2,
                          isNotified: 0,
                          timetokenAppliedOn: today2
                        }).then(async matchupd => {
                          await sequelize.query('SELECT `Users`.*, `profileOfUser`.`id` AS `profileOfUser.id`, `profileOfUser`.`name` AS `profileOfUser.name`, `ImageForUser`.`id` AS `ImageForUser.id`, `ImageForUser`.`userId` AS `ImageForUser.userId`, `ImageForUser`.`orderId` AS `ImageForUser.orderId`, `ImageForUser`.`imageUrl` AS `ImageForUser.imageUrl`, `ImageForUser`.`deletedAt` AS `ImageForUser.deletedAt`, `ImageForUser`.`createdAt` AS `ImageForUser.createdAt`, `ImageForUser`.`updatedAt` AS `ImageForUser.updatedAt`, `MatchForUser`.`id` AS `MatchForUser.id`, `MatchForUser`.`CalltimerExpiry` AS `MatchForUser.CalltimerExpiry`, `MatchForUser`.`answersGiven` AS `MatchForUser.answersGiven`,`MatchForUser`.`timetokenAppliedOn` AS `MatchForUser.timetokenAppliedOn`,  `MatchForUser`.`createdAt` AS `MatchForUser.createdAt`, `MatchForUser`.`updatedAt` AS `MatchForUser.updatedAt`, CURRENT_TIMESTAMP AS `MatchForUser.ServerTime` FROM (SELECT `Users`.`id`, `Users`.`email`, `Users`.`roleId`, `Users`.`status`, `Users`.`deletedAt`, `Users`.`createdAt`, `Users`.`updatedAt` FROM `Users` AS `Users` WHERE (`Users`.`id` != ' + userId + ') AND `Users`.`deletedAt` IS NULL AND `Users`.`status` = "Active" AND ( SELECT `userId` FROM `Images` AS `ImageForUser` WHERE (`ImageForUser`.`orderId` = 1 AND `ImageForUser`.`userId` = `Users`.`id`) LIMIT 1 ) IS NOT NULL AND ( SELECT `fromId` FROM `Matches` AS `MatchForUser` WHERE ((`MatchForUser`.`fromId` = ' + userId + ' OR `MatchForUser`.`toId` = ' + userId + ') AND `MatchForUser`.`fromId` = `Users`.`id` OR `MatchForUser`.`toId` = `Users`.`id` ) LIMIT 1 ) IS NOT NULL ) AS `Users` LEFT OUTER JOIN `Peoples` AS `profileOfUser` ON `Users`.`id` = `profileOfUser`.`userId` INNER JOIN `Images` AS `ImageForUser` ON `Users`.`id` = `ImageForUser`.`userId` AND `ImageForUser`.`orderId` = 1 INNER JOIN `Matches` AS `MatchForUser`  ON (`Users`.`id` = `MatchForUser`.`fromId` OR `Users`.`id` = `MatchForUser`.`toId`) AND  (`MatchForUser`.`fromId` = ' + userId + ' OR `MatchForUser`.`toId` = ' + userId + ') AND `MatchForUser`.`isChatStarted` = "No" order by `MatchForUser`.`createdAt` DESC ', { type: Sequelize.QueryTypes.SELECT }).then(matches => {
                            if (matches && matches.length) {
                              matchDetail.push(matches)
                            }
                          }).catch(err => {
                            console.log('errr.........', err)
                            res.message = 'Something went wrong. 2'
                            res.success = false
                            reject(res)
                          })

                          let pushData = {
                            message: gettime.dataValues.name + ' has applied time token.',
                            userId: userId,
                            action: 4,
                            details: matchDetail
                          };
                          push.sendPush(body.matchId, pushData);
                          res.success = true
                          res.newExpiry = matchupd.CalltimerExpiry
                          resolve(res)
                        }).catch(err => {
                          res.message = "Unable to update Expiry Time"
                          reject(res)
                        })
                      }

                    }).catch(err => {
                      console.log("Error is----------", err)
                    })
                  }
                  else {
                    res.message = "Can't Apply due to insufficient amount of tokens"
                    reject(res)
                  }

                }
              }
              else {
                console.log("User not Found ..!")
              }
            }).catch(err => {

            })

          }
          else {
            res.message = "Match not found... !"
            reject(res)
          }

        }).catch(err => {
          console.log("---------------", err)
          res.message = "Something went wrong !"
          reject(res)
        })

      } catch (err) {
        res.message = 'Something went wrong 2.'
        res.error = err
        res.success = false
        reject(res)
      }
    })
  },


  /*
   *
   * Service for get all matches
   * 
   * Params: [latitude, longitude]
   * 
   * return data
   * 
   */
  async list(userId, pageNumber) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        const limit = 5
        const page = pageNumber
        let interest = await Matches.findAll({
          where: {
            [Op.or]: {
              fromId: userId,
              toId: userId
            }
          },
        }).then(user => {
          if (user) {
            return user
          } else {
            return false
          }
        }).catch(err => {
          console.log('errr.........', err)
          res.message = 'Something went wrong. 1'
          res.error = err
          res.success = false
          reject(res)
        })
        if (interest) {
          console.log(interest, '.............interest')
          let dislikes = interest.map(val => {
            if (val.toId == userId)
              //if(val.reaction == 'dislike')
              return val.fromId
            else
              return val.toId
          })

          var offset = ((page - 1) * limit)

          await sequelize.query('SELECT `Users`.*, `profileOfUser`.`id` AS `profileOfUser.id`, `profileOfUser`.`name` AS `profileOfUser.name`, `ImageForUser`.`id` AS `ImageForUser.id`, `ImageForUser`.`userId` AS `ImageForUser.userId`, `ImageForUser`.`orderId` AS `ImageForUser.orderId`, `ImageForUser`.`imageUrl` AS `ImageForUser.imageUrl`, `ImageForUser`.`deletedAt` AS `ImageForUser.deletedAt`, `ImageForUser`.`createdAt` AS `ImageForUser.createdAt`, `ImageForUser`.`updatedAt` AS `ImageForUser.updatedAt`, `MatchForUser`.`id` AS `MatchForUser.id`, `MatchForUser`.`CalltimerExpiry` AS `MatchForUser.CalltimerExpiry`, `MatchForUser`.`answersGiven` AS `MatchForUser.answersGiven`, `MatchForUser`.`createdAt` AS `MatchForUser.createdAt`, `MatchForUser`.`updatedAt` AS `MatchForUser.updatedAt`, CURRENT_TIMESTAMP AS `MatchForUser.ServerTime` FROM (SELECT `Users`.`id`, `Users`.`email`, `Users`.`roleId`, `Users`.`status`, `Users`.`deletedAt`, `Users`.`createdAt`, `Users`.`updatedAt` FROM `Users` AS `Users` WHERE (`Users`.`id` != ' + userId + ' AND `Users`.`id` IN (' + dislikes + ')) AND `Users`.`deletedAt` IS NULL AND `Users`.`status` = "Active" AND ( SELECT `userId` FROM `Images` AS `ImageForUser` WHERE (`ImageForUser`.`orderId` = 1 AND `ImageForUser`.`userId` = `Users`.`id`) LIMIT 1 ) IS NOT NULL AND ( SELECT `fromId` FROM `Matches` AS `MatchForUser` WHERE ((`MatchForUser`.`fromId` = ' + userId + ' OR `MatchForUser`.`toId` = ' + userId + ') AND `MatchForUser`.`fromId` = `Users`.`id` OR `MatchForUser`.`toId` = `Users`.`id` ) LIMIT 1 ) IS NOT NULL LIMIT ' + offset + ', ' + limit + ') AS `Users` LEFT OUTER JOIN `Peoples` AS `profileOfUser` ON `Users`.`id` = `profileOfUser`.`userId` INNER JOIN `Images` AS `ImageForUser` ON `Users`.`id` = `ImageForUser`.`userId` AND `ImageForUser`.`orderId` = 1 INNER JOIN `Matches` AS `MatchForUser` ON (`Users`.`id` = `MatchForUser`.`fromId` OR `Users`.`id` = `MatchForUser`.`toId`) AND (`MatchForUser`.`fromId` = ' + userId + ' OR `MatchForUser`.`toId` = ' + userId + ')', { type: Sequelize.QueryTypes.SELECT }).then(matches => {
            console.log("----------------------------->>>>>>>>>>>>>", page)
            console.log("-----------------------------", limit)
            console.log("OFFSET VALUE ISSSSSSSSSSSSSSSSSSSSSSS", ((page - 1) * limit))

            console.log("MATCHES------------------------", matches)

            if (matches && matches.length) {



              res.success = true
              res.matches = matches
              res.message = "Matches listed successfully."
              resolve(res)



            } else {
              res.message = 'Matches not found'
              res.success = false
              reject(res)
            }
          }).catch(err => {
            console.log('errr.........', err)
            res.message = 'Something went wrong. 2'
            res.success = false
            reject(res)
          })

          console.log('interes..........', dislikes); return true;

          // Users.findAll({
          //   where: {
          //     id: { [Op.and]: [{ [Op.ne]: userId }, { [Op.in]: dislikes }] },
          //     deletedAt: null,
          //     status: 'Active'
          //   },
          //   include: [{
          //     attributes: [
          //       //[Sequelize.literal(`6371 * acos(cos(radians(${interest.latitude})) * cos(radians(latitude)) * cos(radians(${interest.longitude}) - radians(longitude)) + sin(radians(${interest.latitude})) * sin(radians(latitude)))`), 'distance'],
          //       // [Sequelize.literal(`TIMESTAMPDIFF(YEAR, dob, CURDATE())`), 'age'],
          //       'name'],
          //     model: Peoples,
          //     as: 'profileOfUser',
          //   }, {
          //     model: Images,
          //     as: 'ImageForUser',
          //     where: {
          //       orderId: 1
          //     }
          //   }, {
          //     model: Answers,
          //     as: 'AnswerForUser',
          //     where: {
          //       matchId: userId
          //     }
          //   },
          //   {
          //     model: Answers,
          //     as: 'AnswerByUser',
          //     where: {
          //       userId: userId
          //     }
          //   },
          //   {
          //     model: Matches,
          //     as: 'MatchForUser',
          //     attributes: ['id', 'CalltimerExpiry', 'answersGiven', 'createdAt', 'updatedAt', [Sequelize.literal(`CURRENT_TIMESTAMP`), 'ServerTime',]],
          //     where: {
          //       [Op.or]: {
          //         fromId: userId,
          //         toId: userId
          //       }
          //     }
          //     // where: {
          //     //   [Op.or]: [{ fromId: userId }, { toId: userId }]
          //     // }
          //   },
          //     // {
          //     //    matchdata : await Sequelize.query('SELECT * FROM Matches', {
          //     //     model: Matches,
          //     //     mapToModel: true // pass true here if you have any mapped fields
          //     //   })
          //     // }
          //   ],
          //   limit: limit,
          //   offset: ((page - 1) * limit),
          // }).then(matches => {
          //   console.log("----------------------------->>>>>>>>>>>>>", page)
          //   console.log("-----------------------------", limit)
          //   console.log("OFFSET VALUE ISSSSSSSSSSSSSSSSSSSSSSS", ((page - 1) * limit))

          //   if (matches && matches.length) {

          //     Peoples.findOne({
          //       where: {
          //         userId: userId
          //       },
          //       attributes: ['Question1', 'Question2', 'Question3'],
          //     }).then(mydata => {


          //       res.myquestions = mydata
          //       res.success = true
          //       res.matches = matches
          //       res.message = "Matches listed successfully."
          //       resolve(res)

          //     })

          //   } else {
          //     res.message = 'Matches not found'
          //     res.success = false
          //     reject(res)
          //   }
          // })

        }
      } catch (err) {
        console.log('errr.........', err)
        res.message = 'Something went wrong. 3'
        res.success = false
        reject(res)
      }
    })
  },


  /*
 *
 * Service for get all new matches
 * 
 * Params: [latitude, longitude]
 * 
 * return data
 * 
 */
  async newMatchList(userId, pageNumber) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        const limit = 20
        const page = pageNumber
        let interest = await Matches.findAll({
          where: {
            [Op.or]: {
              fromId: userId,
              toId: userId
            }
          },
        }).then(user => {
          if (user) {
            return user
          } else {
            return false
          }
        }).catch(err => {
          res.message = 'Something went wrong. 1'
          res.error = err
          res.success = false
          reject(res)
        })
        if (interest) {
          let dislikes = interest.map(val => {
            if (val.toId == userId)
              //if(val.reaction == 'dislike')
              return val.fromId
            else
              return val.toId
          })

          if (dislikes && dislikes.length > 0) {
            var offset = ((page - 1) * limit)

            await sequelize.query('SELECT `Users`.*, `profileOfUser`.`id` AS `profileOfUser.id`, `profileOfUser`.`name` AS `profileOfUser.name`, `ImageForUser`.`id` AS `ImageForUser.id`, `ImageForUser`.`userId` AS `ImageForUser.userId`, `ImageForUser`.`orderId` AS `ImageForUser.orderId`, `ImageForUser`.`imageUrl` AS `ImageForUser.imageUrl`, `ImageForUser`.`deletedAt` AS `ImageForUser.deletedAt`, `ImageForUser`.`createdAt` AS `ImageForUser.createdAt`, `ImageForUser`.`updatedAt` AS `ImageForUser.updatedAt`, `MatchForUser`.`id` AS `MatchForUser.id`, `MatchForUser`.`CalltimerExpiry` AS `MatchForUser.CalltimerExpiry`, `MatchForUser`.`answersGiven` AS `MatchForUser.answersGiven`,`MatchForUser`.`timetokenAppliedOn` AS `MatchForUser.timetokenAppliedOn`,  `MatchForUser`.`createdAt` AS `MatchForUser.createdAt`, `MatchForUser`.`updatedAt` AS `MatchForUser.updatedAt`, CURRENT_TIMESTAMP AS `MatchForUser.ServerTime` FROM (SELECT `Users`.`id`, `Users`.`email`, `Users`.`roleId`, `Users`.`status`, `Users`.`deletedAt`, `Users`.`createdAt`, `Users`.`updatedAt` FROM `Users` AS `Users` WHERE (`Users`.`id` != ' + userId + ' AND `Users`.`id` IN (' + dislikes + ')) AND `Users`.`deletedAt` IS NULL AND `Users`.`status` = "Active" AND ( SELECT `userId` FROM `Images` AS `ImageForUser` WHERE (`ImageForUser`.`orderId` = 1 AND `ImageForUser`.`userId` = `Users`.`id`) LIMIT 1 ) IS NOT NULL AND ( SELECT `fromId` FROM `Matches` AS `MatchForUser` WHERE ((`MatchForUser`.`fromId` = ' + userId + ' OR `MatchForUser`.`toId` = ' + userId + ') AND `MatchForUser`.`fromId` = `Users`.`id` OR `MatchForUser`.`toId` = `Users`.`id` ) LIMIT 1 ) IS NOT NULL LIMIT ' + offset + ', ' + limit + ') AS `Users` LEFT OUTER JOIN `Peoples` AS `profileOfUser` ON `Users`.`id` = `profileOfUser`.`userId` INNER JOIN `Images` AS `ImageForUser` ON `Users`.`id` = `ImageForUser`.`userId` AND `ImageForUser`.`orderId` = 1 INNER JOIN `Matches` AS `MatchForUser`  ON (`Users`.`id` = `MatchForUser`.`fromId` OR `Users`.`id` = `MatchForUser`.`toId`) AND  (`MatchForUser`.`fromId` = ' + userId + ' OR `MatchForUser`.`toId` = ' + userId + ') AND `MatchForUser`.`isChatStarted` = "No" order by `MatchForUser`.`createdAt` DESC ', { type: Sequelize.QueryTypes.SELECT }).then(matches => {
              if (matches && matches.length) {

                // var matches = matches.reverse();
                res.success = true
                res.matches = matches
                res.message = "Matches listed successfully."
                resolve(res)

              } else {
                res.message = 'Matches not found'
                res.success = false
                reject(res)
              }
            }).catch(err => {
              console.log('errr.........', err)
              res.message = 'Something went wrong. 2'
              res.success = false
              reject(res)
            })
          } else {
            res.message = 'Matches not found'
            res.success = false
            reject(res)
          }
          console.log('interes..........', dislikes); return true;
        }
      } catch (err) {
        console.log('errr.........', err)
        res.message = 'Something went wrong. 3'
        res.success = false
        reject(res)
      }
    })
  },





  /*
 *
 * Service to get Match Data
 * 
 * Params: [Match Id]
 * 
 * return data
 * 
 */
  async getMatchData(userId, matchId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        console.log("Get Match Data")
        Peoples.findOne({
          where: {
            userId: userId
          }
        }).then(interest => {

          Users.findOne({
            where: {
              id: matchId
            },
            include: [{
              attributes: [[Sequelize.literal(`6371 * acos(cos(radians(${interest.latitude})) * cos(radians(latitude)) * cos(radians(${interest.longitude}) - radians(longitude)) + sin(radians(${interest.latitude})) * sin(radians(latitude)))`), 'distanceFromMatch'],
              [Sequelize.literal(`TIMESTAMPDIFF(YEAR, dob, CURDATE())`), 'age'],
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
                'callReminder',
                'expiredMatches',
                'matchUpdates',
                'completed',
                'superLikesCount',
                'timeToken',
                'createdAt',
                'updatedAt'
              ],
              model: Peoples,
              as: 'profileOfUser'
            },
            {
              model: Images,
              as: 'ImageForUser'
            },
            ],
          }).then(async userdata => {

            if (userdata.instaToken != null) {
              var insta = await axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token=' + userdata.instaToken)
                .then(function (responses) {
                  if (responses.data)
                    return responses.data.data
                }).catch(function (error) {
                  // handle error
                  res.error = error
                  reject(res)
                })
            }
            if (userdata) {
              res.success = true
              if (insta != undefined) {
                var instaData = insta
              } else {
                var instaData = []
              }

              res.data = {
                "id": userdata.id,
                "email": userdata.email,
                "roleId": userdata.roleId,
                "linkedinId": userdata.linkedinId,
                "AppleID": userdata.AppleID,
                "isLinkedinUser": userdata.isLinkedinUser,
                "status": userdata.status,
                "statusByadmin": userdata.statusByadmin,
                "isRejected": userdata.isRejected,
                "isReported": userdata.isReported,
                "isVerified": userdata.isVerified,
                "isPremium": userdata.isPremium,
                "approvesIn": userdata.approvesIn,
                "instaTokenCreated": userdata.instaTokenCreated,
                "instaToken": userdata.instaToken,
                "deletedAt": userdata.deletedAt,
                "createdAt": userdata.createdAt,
                "updatedAt": userdata.updatedAt,
                "profileOfUser": userdata.profileOfUser,
                "ImageForUser": userdata.ImageForUser,
                "insta": instaData
              }


              resolve(res)
            }
            else {
              console.log("Data not found !")
            }
          }).catch(err => {
            console.log(err);
            res.message = "Unable to fetch data of USER. !"
            reject(res)
          })

        })

      } catch (err) {
        console.log('errr.........', err)
        res.message = 'Something went wrong !'
        res.success = false
        reject(res)
      }
    })
  },


  /*************
   * 
   * Services to propose time after match
   * 
   * ***********/

  async proposeTime(userId, body) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {

        Matches.findOne({
          where: {
            [Op.or]: [{ fromId: userId }, { toId: userId }]
          }
        }).then(matchfound => {

          let __date = moment.utc(body.time).format()

          if (matchfound) {

            CallRequests.findOne({
              where: {
                [Op.and]: [
                  {
                    [Op.or]: [{ fromId: userId }, { toId: userId }]
                  },
                  {
                    [Op.or]: [{ fromId: body.matchId }, { toId: body.matchId }]
                  }
                ]
              }
            }).then(requestfound => {
              if (requestfound) {

                CallRequests.findOne({
                  where: {
                    [Op.and]: [
                      {
                        [Op.or]: [{ fromId: userId }, { toId: userId }]
                      },
                      {
                        [Op.or]: [{ fromId: body.matchId }, { toId: body.matchId }]
                      },
                      { proposeTime: __date }
                    ]
                  }
                }).then(reqfind => {

                  if (reqfind) {

                    CallRequests.findOne({
                      where: {
                        fromId: userId,
                        toId: body.matchId
                      }
                    }).then(found => {

                      if (found) {
                        res.message = "You are proposing same time"
                        reject(res)
                      }
                      else {
                        reqfind.update(
                          {
                            fromId: userId,
                            toId: body.matchId,
                            proposeTime: __date,
                            Status: "Agree"
                          }).then(onagreecall => {
                            res.success = true
                            res.status = onagreecall
                            res.proposeTime = __date,
                              res.message = "Call confirmed on " + __date
                            resolve(res)
                          }).catch(err => {
                            res.message = "Cannot put Call On Hold"
                            reject(res)
                          })
                      }

                    }).catch(err => {
                      res.message = "Unable to Propose Time !"
                      reject(res)
                    })
                  }
                  else {
                    CallRequests.update(
                      {
                        fromId: userId,
                        toId: body.matchId,
                        proposeTime: __date,
                        Status: "onHold"
                      },
                      {
                        where: {
                          [Op.and]: [
                            {
                              [Op.or]: [{ fromId: userId }, { toId: userId }]
                            },
                            {
                              [Op.or]: [{ fromId: body.matchId }, { toId: body.matchId }]
                            }
                          ]
                        }
                      }).then(onholdcall => {
                        res.success = true,
                          res.proposeTime = __date,
                          res.message = "You proposed to call on " + __date
                        resolve(res)
                      }).catch(err => {
                        res.message = "Cannot put Call On Hold"
                        reject(res)
                      })
                  }

                }).catch(err => {
                  console.log("------------", err)
                  res.message = "Unable to found Propose Time"
                  reject(res)
                })
              }
              else {
                CallRequests.create({
                  "fromId": userId,
                  "toId": body.matchId,
                  "proposeTime": __date,
                }).then(requestcreate => {
                  res.success = true
                  res.status = requestcreate
                  res.proposeTime = __date,
                    res.message = "You proposed to call on " + __date
                  resolve(res)
                }).catch(err => {
                  res.message = "Unable to create Record"
                  reject(res)
                })
              }
            }).catch(err => {
              console.log("---------------->>>>>>>>>>>>>.", err)
            })

            // CallRequests.findOne({
            //   where: {
            //     [Op.and]: [{ fromId: body.matchId }, { toId: userId }, { proposeTime: __date }]
            //   }
            // }).then(agree => {

            //   console.log("Counting Call Requests------------",agree)

            //   // if (agree.length != 0) {
            //   //   console.log("Inside the agree''''''''''''''''''''''''''''")
            //   //   CallRequests.update({
            //   //     "fromId": userId,
            //   //     "toId": body.matchId,
            //   //     "proposeTime": __date,
            //   //     "Status": "Agree"
            //   //   }).then(finalagree => {
            //   //     res.success = true,
            //   //       res.match = finalagree
            //   //     resolve(res)
            //   //   }).catch(err => {
            //   //     console.log("-----------:::::::::---------", err)
            //   //     res.message = "Unable to agree"
            //   //     reject(res)
            //   //   })

            //   // }
            //   // else {
            //   //   CallRequests.create({
            //   //     "fromId": userId,
            //   //     "toId": body.matchId,
            //   //     "proposeTime": __date,
            //   //   }).then(callschedule => {
            //   //     res.success = true,
            //   //       res.scheduledTime = callschedule,
            //   //       resolve(res)
            //   //   }).catch(err => {
            //   //     console.log("-------------", err)
            //   //     res.message = "Unable to access Scheduled Calls",
            //   //       reject(res)
            //   //   })
            //   // }

            // }).catch(err => {
            //   console.log("/////////////-------------------///////////", err)
            //   reject(res)
            // })

          }
          else {
            res.message = "Matches not Found",
              reject(res)
          }

        }).catch(err => {
          console.log("Errorrrrrrrrrrrrrrrrrr isssssssss-------------", err)
          res.message = "Unable to find matches",
            reject(res)
        })

      } catch (err) {
        res.message = 'Something went wrong.'
        res.error = err
        res.success = false
        reject(res)
      }
    })
  },


  /*************
 * 
 * Services to get proposed Time of a match
 * 
 * ***********/

  async getproposeTime(userId, matchId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {

        CallRequests.findOne({
          where: {
            [Op.and]: [
              {
                [Op.or]: [{ fromId: userId }, { toId: userId }]
              },
              {
                [Op.or]: [{ fromId: matchId }, { toId: matchId }]
              }
            ]
          },
        }).then(getrecord => {

          if (getrecord) {
            res.success = true
            res.proposedTime = getrecord
            res.message = "List of fetched Details"
            resolve(res)
          }
          else {
            res.message = "Proposed Time record Not Found !"
            reject(res)
          }
        }).catch(err => {
          res.message = "Unable to fetch Records"
          reject(res)
        })

      } catch (err) {
        res.message = 'Something went wrong.'
        res.error = err
        res.success = false
        reject(res)
      }
    })
  },


  /*************
   * 
   * Services to answer question of matches
   * 
   * ***********/

  async getAnswers(userId, matchId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {

        Matches.findOne({
          where: {
            [Op.or]: [{ fromId: userId }, { toId: userId }]
          }
        }).then(async foundmatch => {

          if (foundmatch) {

            await Answers.findOne({
              where: {
                [Op.and]: [{ userId: matchId }, { matchId: userId }]
              }
            }).then(getanswers => {

              if (getanswers) {
                res.answers = getanswers
                res.success = true
                resolve(res)
              }
              else {
                res.message = "Answers not given yet"
                reject(res)
              }

            }).catch(err => {
              console.log("Getting error is-------------------", err)
              reject(res)
            })

          }
          else {
            console.log("UNABLE TO FOUND")
          }

        }).catch(err => {
          console.log("Error is--------------------", err)
          res.message = "UNABLE TO FIND MATCHES"
          res.success = false
          reject(res)
        })

      } catch (err) {
        console.log('errr.........', err)
        res.message = 'Something went wrong.'
        res.success = false
        reject(res)
      }
    })
  },

  /*************
  * 
  * Services to rewind the reaction
  * 
  * ***********/

  async rewind(userId, matchId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }

      try {

        Reactions.findOne({
          where: {
            [Op.and]: [{ fromId: userId }, { toId: matchId }]
          }
        }).then(reactionfound => {

          if (reactionfound) {

            console.log("=================>>>>>>>>>>>>>>>>>>>>>", reactionfound.dataValues.reaction)

            if (reactionfound.dataValues.reaction == "superlike") {
              Peoples.findOne({
                where: {
                  userId: userId
                },
                attributes: ['superLikesCount']
              }).then(async superlikeupdate => {
                if (superlikeupdate) {
                  console.log("SUPERLIKE DATA FETCHED---------------", superlikeupdate.dataValues.superLikesCount)

                  await Peoples.update({
                    superLikesCount: superlikeupdate.dataValues.superLikesCount + 1,
                  },
                    {
                      where: {
                        userId: userId
                      }
                    }).then(superupd => {
                      console.log("Superlike reverted back Succesfully !")
                    }).catch(err => {
                      res.message = "UNABLE TO REWIND THE SUPERLIKE"
                      reject(res)
                    })

                }
              }).catch(err => {
                console.log(err)
                res.message = "UNABLE TO FOUND USER DATA !"
                reject(res)
              })
            }

            Reactions.destroy({
              where: {
                [Op.and]: [{ fromId: userId }, { toId: matchId }]
              }
            }).then(delmatch => {

              Matches.findOne({
                where: {
                  [Op.and]: [
                    {
                      [Op.or]: [{ fromId: userId }, { toId: userId }]
                    },
                    {
                      [Op.or]: [{ fromId: matchId }, { toId: matchId }]
                    }
                  ]
                }
              }).then(matchdel => {

                if (matchdel) {
                  console.log("Match Found-----------------", matchdel.dataValues.id)
                  Matches.destroy({
                    where: {
                      "id": matchdel.dataValues.id
                    }
                  }).then(dismatch => {
                    console.log("Match is deleted on rewinding reaction")
                  }).catch(err => {
                    console.log("Unable to delete the Match")
                  })

                }

              }).catch(err => {
                res.message = "Something went wrong"
                reject(res)
              })

              res.success = true
              res.message = "Reaction is rewinded"
              resolve(res)
            }).catch(err => {
              res.message = "Unable to rewind reactions"
              reject(res)
            })

          }

          else {
            res.message = "UNABLE TO FIND REACTIONS"
            reject(res)
          }

        }).catch(err => {
          res.message = "Something went wrong 1"
          reject(res)
        })

      } catch (err) {
        console.log('errr.........', err)
        res.message = 'Something went wrong.'
        res.success = false
        reject(res)
      }
    })
  },

  /*************
   * 
   * Services to unmatch the matches
   * 
   * ***********/

  async unmatch(userId, matchId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }

      try {

        Matches.findAll({
          where: {
            [Op.or]: [
              {
                [Op.and]: [{ fromId: userId }, { toId: matchId }]
              },
              {
                [Op.and]: [{ fromId: matchId }, { toId: userId }]
              }
            ]
          }
        }).then(matchfound => {


          if (matchfound.length != 0) {

            Matches.destroy({
              where: {
                [Op.or]: [
                  {
                    [Op.and]: [{ fromId: userId }, { toId: matchId }]
                  },
                  {
                    [Op.and]: [{ fromId: matchId }, { toId: userId }]
                  }
                ]
              }
            }).then(unmatchdata => {

              Chat.destroy({
                where: {
                  [Op.or]: [
                    {
                      [Op.and]: [{ from_id: userId }, { to_id: matchId }]
                    },
                    {
                      [Op.and]: [{ from_id: matchId }, { to_id: userId }]
                    }
                  ]
                }
              })

              /* Code for Push Notifications to Unmatch */

              // Peoples.findOne({
              //   where: {
              //     "userId": matchId
              //   },
              //   attributes: ['userId', 'name']
              // }).then(sendmatch => {
              //   let pushData = {
              //     message: 'You are unmatched with ' + sendmatch.dataValues.name,
              //     userId: matchId,
              //     action: 2
              //   };
              //   push.sendPush(userId, pushData);
              // }).catch(err => {
              //   console.log("Unable to send match data.....", err)
              // })


              // Peoples.findOne({
              //   where: {
              //     "userId": userId
              //   },
              //   attributes: ['userId', 'name']
              // }).then(getmatch => {
              //   let pushData1 = {
              //     message: 'You are unmatched with ' + getmatch.dataValues.name,
              //     userId: userId,
              //     action: 2
              //   };
              //   push.sendPush(matchId, pushData1);
              // }).catch(err => {
              //   console.log("Unable to get match data.....", err)
              // })


              res.success = true,
                res.message = "User is Unmatched"
              resolve(res)
            }).catch(err => {
              res.message = "Unable to unmatch"
              reject(res)
            })

          }

          else {
            res.message = "Match not Found"
            reject(res)
          }

        }).catch(err => {
          res.message = 'Something went wrong 1.'
          res.success = false
          reject(res)
        })

      } catch (err) {
        res.message = 'Something went wrong 2.'
        res.success = false
        reject(res)
      }
    })
  },



  async chatDelete() {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }

      try {
        Chat.findAll().then(async result => {
          for (let val of result) {
            console.log(val.from_id, '...............', val.to_id)
            await Matches.findAll({
              where: {
                [Op.or]: [
                  {
                    [Op.and]: [{ fromId: val.from_id }, { toId: val.to_id }]
                  },
                  {
                    [Op.and]: [{ fromId: val.to_id }, { toId: val.from_id }]
                  }
                ]
              }
            }).then(match => {
              if (match.length == 0) {
                console.log(match)
                Chat.destroy({
                  where: {
                    [Op.or]: [
                      {
                        [Op.and]: [{ from_id: val.to_id }, { to_id: val.from_id }]
                      },
                      {
                        [Op.and]: [{ from_id: val.from_id }, { to_id: val.to_id }]
                      }
                    ]
                  }
                })
              }
            })
          }
          res.success = true,
            res.message = "Chat deleted successfully."
          resolve(res)
        }).catch(err => {
          res.message = 'Something went wrong 2.'
          res.success = false
          reject(res)
        })
      } catch (err) {
        res.message = 'Something went wrong 2.'
        res.success = false
        reject(res)
      }
    })
  },
}
