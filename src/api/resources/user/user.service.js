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
const tokenRecords = require('../../../../models').tokenRecords
const usersPurchases = require('../../../../models').usersPurchases
const axios = require('axios');



import push from '../../sendPush.service'


var ejs = require("ejs");

// var colors = require('colors/safe')
import jwt from '../../helpers/jwt'
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const env = process.env.NODE_ENV || 'development';
const config = require('../../../../config/config.json')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

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

var randomize = require('randomatic');

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

const requestImageSize = require('request-image-size');

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
//::::::::::::::::   CUSTOM functions for different operations   :::::::::::::::::::::::::::::://

//To  get all Images By User Id:::::::::::::::::::::::::::::::::::::::::


function getImages(userid) {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      Image.findAll({
        where: {
          "userId": userid
        },
        order: [
          ['orderId', 'ASC']
        ],
        attributes: ['id', 'orderId', 'imageUrl'],
        raw: true
      }).then(userImages => {

        // if (userImages.length != 0) {
        //   console.log("Image length is.......", 3)
        //   var countImage = 2 * userImages.length
        // }

        // Peoples.findOne({
        //   where:{
        //     userId:userid
        //   }
        // }).then(pep =>{
        //     if(pep){
        //         pep.update({
        //           completed: pep.dataValues.completed + countImage
        //         })
        //     }
        // })

        res.success = true
        res.data = userImages
        resolve(res)
      }).catch(err => {
        console.log("ERROR OF IMAGES IS-------------", err)
        // res.error = err
        res.message = "UNABLE TO FETCH IMAGES"
        reject(res)
      })
    } catch (err) {
      // res.err = err
      res.message = 'Something went wrong!'
      reject(res)
    }
  })

}

//To generate Otp ::::::::::::::::::::::::::::::::::::::::::::::::::::::

function generateOtp() {
  let res = {
    success: false
  }
  try {
    var VALIDOTP = Math.floor(100000 + Math.random() * 900000);
    res.success = true
    res.data = VALIDOTP
    return (res)
  } catch (err) {
    // res.err = err
    res.message = 'Something went wrong!'
    return (res)
  }
}

//To calculate completion status :::::::::::::::::::::::::::::::::::::::

function calculateStatus(usersid) {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      Peoples.findOne({
        where: {
          userId: usersid
        }
      }).then(calculateCompletion => {

        // let countPer = 10 //For email which would be always there

        let countPer = 0

        if (calculateCompletion.name != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.aboutme != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.dob != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.gender != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.interested != null) {
          countPer = countPer + 3.5
        }


        if (calculateCompletion.Kids != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.height != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.ZodiacSign != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.education != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.school != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.occupation != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.Relegion != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.Political != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.Drink != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.Smoke != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.Exercise != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.City != null) {
          countPer = countPer + 3.5
        }

        // if (calculateCompletion.Question1 != null) {
        //   countPer = countPer + 3.5
        // }

        // if (calculateCompletion.Question2 != null) {
        //   countPer = countPer + 3.5
        // }

        // if (calculateCompletion.Question3 != null) {
        //   countPer = countPer + 3.5
        // }

        if (calculateCompletion.lookingFor != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.ambitions != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.pets != null) {
          countPer = countPer + 3.5
        }

        if (calculateCompletion.Answer1 != null) {
          countPer = countPer + 6
        }

        if (calculateCompletion.Answer2 != null) {
          countPer = countPer + 6
        }

        if (calculateCompletion.Answer3 != null) {
          countPer = countPer + 6
        }

        console.log("Total after calculating is=========>>>>>>>>>>>>>", countPer)

        res.success = true
        res.count = countPer
        resolve(res)
      }).catch(err => {
        // res.error = err
        console.log("===============", err)
        res.message = "Unable to find Record"
        reject(res)
      })
    } catch (err) {
      // res.error = err
      console.log("===============", err)

      res.message = 'Something went wrong!'
      reject(res)
    }

  })
}

function compress(path) {
  return  new Promise(async (resolve, reject) => { 
    var res ={

    }
    try {
      const files = await imagemin([path], {
        destination: 'uploads/images',
        plugins: [
            imageminJpegtran(),
            imageminMozjpeg(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
    
    resolve(files)
    } catch (err) {
      console.log('--errrr',err)
      res.message = 'Something went wrong'
      reject(res)
    }
})
}


function compressForOld(path) {
  return  new Promise(async (resolve, reject) => { 
    var res = {
      success: false
    }
    try {

      var fs = require("fs"); //Load the filesystem module

      var filesize = require("filesize"); 

      var stats = fs.statSync(path)
      // var fileSizeInMb = filesize(stats.size, {round: 0});
      var getArray = filesize(stats.size, {output: "array"}); 
      if (getArray[0] > '500' || getArray[0]*1024 > '500') {
          const files = await imagemin([path], {
            destination: 'buildNewCompress/images',
            plugins: [
                imageminJpegtran(),
                imageminMozjpeg(),
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        });
        resolve(files)
      } else {
        console.log('smallerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
       return ;
      }
  
    } catch (err) {
      console.log(err,'err----------------------------testingggggggggggggggggggg')
      res.message = 'Something went wrong'
      reject(res)
    }
})
}


//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://


export default {


  

  /*
   *
   * *****REPLACE Images** 
   * 
   */

  async replaceImages(userId, files, imageid) {
    return new Promise((resolve, reject) => {
      var res = {
        success: false
      }
      try {
          for(let element of files) {
          Image.findOne({
            where: {
              "userId": userId,
              "id": imageid,
            }
          }).then(async found => {
            if (found) {

              var getData =  await compress(element.path)
              var remove = getData[0].destinationPath;
              var getfileName = remove.replace("uploads/", "");

              Image.update({
                "imageUrl": getfileName
              }, {
                where: {
                  "id": imageid,
                }
              }).then(upd => {
                res.success = true,
                  res.images = {
                    id: found.dataValues.id,
                    userId: found.dataValues.userId,
                    orderId: found.dataValues.orderId,
                    imageUrl: "images/" + element.filename
                  },
                  // res.image = "images/" + element.filename,
                  resolve(res)
              }).catch(err => {
              
                res.error = "Something went wrong 1."
                reject(res)
              })
            }
            else {
              res.message = "Image doesn't exist"
              reject(res)
            }
          }).catch(err => {
            res.message = "Something went wrong 3"
            reject(res)
          })

        }


      } catch (err) {
        res.message = 'Something went wrong 2.'
        // res.error = err
        reject(res)
      }
    })
  },


  /*
  *
  * *****Upload Images** 
  * 
  */

  async uploadImages(userId, files) {

//    console.log(files,'files ---------------------check');

    return new Promise((resolve, reject) => {
      var missing = [];
      var res = {
        success: false
      }
      try {
        var orderNumber = 0;

        Image.findAll({
          where: {
            "userId": userId
          }
        }).then(async images => {
          var imagecount = Object.keys(images).length;
          if (imagecount == 6) {
            res.message = "You can't add more than 6 images."
            reject(res)
          }
        
          if (imagecount == 0) {
            if (files.length >= 3) {
            
              let data = []

              for(let file of files) {

               
                var getData =  await compress(file.path)
                var remove = getData[0].destinationPath;
                var getfileName = remove.replace("uploads/", "");
                 orderNumber = orderNumber + 1
                 data.push({
                  "userId": userId,
                  orderId: orderNumber,
                  "imageUrl": getfileName
                })
              }

              Image.bulkCreate(data).then(imageinsert => {
                res.success = true
                res.images = imageinsert
                res.insert = true
                res.message = "Image inserted succesfully"
                resolve(res)
              }).catch(err => {
                // res.err = err
                console.log('--errr',err)
                res.message = "Unable to insert Images"
                reject(res)
              })
            }
            else {
              res.message = "Atleast 3 images are needed"
              reject(res)
            }
          }
          else if ((imagecount < 6) && (imagecount >= 1)) {
            let piccal = imagecount
            var checkcount = piccal + files.length

            if (checkcount <= 6) {

              let data = []

              Image.findAll({
                where: {
                  userId: userId
                },
                attributes: ['orderId'],
                raw: true
              }).then(async img => {

                var finalArray = img.map(function (obj) {
                  return obj.orderId;
                });

                var PreviousArray = [1, 2, 3, 4, 5, 6]

                function findDeselectedItem(finalArray, PreviousArray) {
                  var CurrentArrSize = finalArray.length;
                  var PreviousArrSize = PreviousArray.length;
                  // loop through previous array
                  for (var j = 0; j < PreviousArrSize; j++) {
                    // look for same thing in new array
                    if (finalArray.indexOf(PreviousArray[j]) == -1) {
                      missing.push(PreviousArray[j])
                    }
                  }
                  return missing
                }

                var abc = findDeselectedItem(finalArray, PreviousArray);
                let data = []
                var i = 0;
                for(let file of files) {
                  var getData =  await compress(file.path)
                  var remove = getData[0].destinationPath;
                  var getfileName = remove.replace("uploads/", "");
                   orderNumber = orderNumber + 1
                  data.push({
                    "userId": userId,
                    orderId: abc[i],
                    "imageUrl": getfileName
                  })
                  i++ ;
                }

                setTimeout(() => {
                  Image.bulkCreate(data).then(imageinsert => {
                    res.success = true
                    res.images = imageinsert
                    res.insert = true
                    res.message = "Image inserted succesfully 1"
                    resolve(res)
                  }).catch(err => {
                    // res.err = err
                    console.log('---errr',err)
                    res.message = "Unable to insert Images"
                    reject(res)
                  })
                }, 500)

              }).catch(err => {
                reject(res)
                console.log("UNABLE TO FETCH IMAGES", err)
              })
            } else {
              console.log("Maximum 6 photos can be stored")
              res.message = "Maximum 6 photos can be stored"
              reject(res)
            }
          }
          else {
            console.log("Cannot store more than 6 images")
            res.message = "Cannot store more than 6 images"
            reject(res)
          }
        }).catch(err => {
          console.log(err)
          reject(res)
        })

      } catch (err) {
        res.message = 'Something went wrong 3.'
        // res.error = err
        console.log('--eerrrr',err)
        reject(res)
      }
    })
  },

  /*
  *
  * ****Upload Selfies
  *
  */

  async selfies(userId, files) {
    return new Promise((resolve, reject) => {
      var res = {
        success: false
      }
      try {
      //  console.log("FILES ARE ----------->>>>>>>>>>>>>>>>>.", files)

        Selfies.findOne({
          where: {
            "userId": userId
          }
        }).then(selfie => {

          Swipecounter.findOne({
            where: {
              "userId": userId
            }
          }).then(swpd => {
            if (swpd == null) {
              Swipecounter.create({
                "userId": userId,
                "likesCounter": 0
              })
            }
          })

          if (selfie) {
            Selfies.update({
              "selfieUrl": 'images/' + files[0].filename,
            },
              {
                where: {
                  "userId": userId,

                }
              })

            Users.update({
              isRejected: 0
            }, {
              where: {
                id: userId,
              }
            })

            res.message = "Selfie Image updated .. !"
            res.success = true
            res.selfieData = {
              "id": selfie.id,
              "userId": userId,
              "selfieUrl": 'images/' + files[0].filename
            }
            resolve(res)
          }
          else {
            Selfies.create({
              "userId": userId,
              "selfieUrl": 'images/' + files[0].filename
            }).then(aftercreate => {
              res.message = "Selfie Image uploaded .. !"
              res.success = true
              res.selfieData = aftercreate
              resolve(res)
            }).catch(err => {
              res.message = "Unable to upload Selfie !"
              reject(res)
            })
          }
        }).catch(err => {
          console.log(err)
          res.message = "Something Went Wrong !"
          reject(res)
        })
      } catch (err) {
        res.message = 'Something went wrong 3.'
        // res.error = err
        reject(res)
      }
    })
  },


  /*
  * 
  *Service for Updating Latitudes and Longitudes
  *
  */

  async latlong(body, userId) {
    return new Promise((resolve, reject) => {
      var res = {
        success: false
      }
      try {
        Peoples.findOne({
          where: {
            userId: userId,
            deletedAt: null
          },
        }).then(latlongitude => {

          Users.findOne({
            where: {
              id: userId
            },
            include: [{
              model: Swipecounter,
              as: 'swipeCounterForUser'
            }, {
              attributes: [[Sequelize.literal(`CURRENT_TIMESTAMP`), 'ServerTime']],
              model: Peoples,
              as: 'profileOfUser'

            }]
          }).then(userswipe => {

        //    console.log("------->>>>>>>>>>>>>>", userswipe.dataValues.profileOfUser.dataValues.ServerTime)

            if (latlongitude) {
              latlongitude.update({
                "longitude": body.longitude,
                "latitude": body.latitude
              }).then(chklat => {
                res.success = true
                res.message = "Latitudes and Longitudes succesfully updated"
                res.swipesData = userswipe.dataValues.swipeCounterForUser
                res.latitude = chklat.latitude
                res.longitude = chklat.longitude
                res.ServerTime = userswipe.dataValues.profileOfUser.dataValues.ServerTime
                resolve(res)
              }).catch(err => {
                res.message = "Unable to update latitudes and longitudes"
                reject(res)
              })
            } else {
              res.message = "User Record Not found"
              reject(res)
            }
          })

        }).catch(err => {
          res.message = "Something Went Wrong 1.........."
          reject(res)
        })
      }
      catch (err) {
        res.message = 'Something went wrong..........2'
        // res.error = err
        res.success = false
        reject(res)
      }
    })
  },

  /*
  *
  * Service for User login
  * Params: [email,Otp]
  */

  async login(body) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        //FACEBOOK////////////////////////////////////
        if (body.socialType == 2) {
          Users.findOne({
            where: {
              email: body.email,
              deletedAt: null
            },
            include: [{
              model: Login,
              as: 'loginForUser'
            },
            {
              model: Peoples,
              as: 'profileOfUser'
            },
            {
              model: Subscription,
              as: 'subscriptionForUser'
            }
            ]
          }).then(user => {

            if (user) {
              //LOGIN WITH FACEBOOK
           //   console.log("============FACEBOOK USER======================", JSON.stringify(user.statusByadmin))

              if (user.statusByadmin == "Deactivate") {
                res.message = "User is Deactivated By Admin !"
                reject(res)
              }
              else {
                var token = jwt.issue({ id: user.id }, '1d');

                Peoples.update({
                  userId: user.id
                }, {
                  where: {
                    userId: user.id
                  }
                })

                Login.destroy({
                  where: {
                    userId: user.id
                  }
                })

                Login.create({
                  userId: user.id,
                  auth_token: token,
                  deviceId: "DeviceID",
                  deviceType: body.deviceType,
                  devicetoken: body.devicetoken,
                  socialType: "2",
                  socialId: body.socialId
                }, {
                  where: {
                    userId: user.id
                  }
                }).then(loginupdate => {

                  Users.findOne({
                    where: {
                      id: user.id
                    },
                    include: [{
                      model: Peoples,
                      as: 'profileOfUser'
                    },
                    {
                      model: Selfies,
                      as: 'SelfiesForUser'
                    },
                    {
                      model: Subscription,
                      as: 'subscriptionForUser'
                    }]
                  }).then(async peopledata => {

                    if (peopledata) {
                      peopledata.update({
                        status: "Active"
                      })

                      var checkImage = await getImages(user.id)
                      if(peopledata.instaToken != null) {
                        await axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token='+peopledata.instaToken)
                        .then(function (responses) {
                          if(responses.data)
                          res.insta = responses.data.data
                        })
                        .catch(function (error) {
                          // handle error
                          res.error =error
                          reject(res)
                        })
                      }
                      if (checkImage.success == true) {
                        
                        res.success = true
                        res.login = true
                        res.token = token
                        res.images = checkImage
                        res.user = peopledata
                        res.message = "Login succesfully through facebook"
                        resolve(res)
                      } else {
                        res.success = true
                        res.login = true
                        res.token = token
                        res.user = peopledata
                        res.message = "Login succesfully through facebook"
                        resolve(res)
                      }
                    }

                  }).catch(err => {
                    console.log("error is-------------------------", err)
                    res.message = "Profile details cannot be fetched"
                    // res.error = err
                    reject(res)
                  })
                })
              }

            } else {
              //REGISTER WITH FACEBOOK
              Users.create(body, {
              }).then(user => {
               // console.log("user issssss........." + user);
                var token = jwt.issue({ id: user.id }, '1d');
                Peoples.create({
                  userId: user.id,
                })

                Login.create({
                  userId: user.id,
                  auth_token: token,
                  deviceId: "jsdvfhsdjfh",
                  "deviceType": body.deviceType,
                  "devicetoken": body.devicetoken,
                  socialType: "2",
                  socialId: body.socialId
                }).then(loginupdate => {

                  Users.findOne({
                    where: {
                      id: user.id
                    },
                    include: [{
                      model: Peoples,
                      as: 'profileOfUser'
                    },
                    {
                      model: Selfies,
                      as: 'SelfiesForUser'
                    },
                    {
                      model: Subscription,
                      as: 'subscriptionForUser'
                    }]
                  }).then(peopledata => {

                    peopledata.update({
                      status: "Active"
                    })

                    res.success = true
                    res.token = token
                    res.message = "Facebook user succesfully registered"
                    res.user = peopledata
                    res.register = true
                    resolve(res)
                  }).catch(err => {
                    console.log("Error 4-------------------", err)
                    res.message = "Profile details cannot be fetched"
                    // res.error = err
                    reject(res)
                  })
                })
              }).catch(err => {
                console.log("eRROR 3------------------------------", err);
                res.message = 'Something went wrong 1.'
                // res.error = err
                console.log(res);
                res.success = false
                reject(res)
              })
            }

          }).catch(err => {
            res.message = 'Something went wrong....1'
            // res.error = err
            console.log("ERROR 2--------------------------->", err)
            res.success = false
            reject(res)
          })

        }
        //GMAIL///////////////////////////////////////
        else if (body.socialType == 3) {
          console.log("Login with Google")
        }
        //LINKEDIN////////////////////////////////////
        else if (body.socialType == 4) {

          Users.findOne({
            where: {
              email: body.email,
              // linkedinId: body.linkedinId,
              deletedAt: null
            },
            include: [{
              model: Login,
              as: 'loginForUser'
            },
            {
              model: Peoples,
              as: 'profileOfUser'
            },
            {
              model: Subscription,
              as: 'subscriptionForUser'
            }
            ]
          }).then(user => {

            if (user) {
              //LOGIN WITH LINKEDIN
             // console.log("============LINKEDIN USER======================", JSON.stringify(user))

              if (user.statusByadmin == "Deactivate") {
                res.message = "User is Deactivated By Admin !"
                reject(res)
              }
              else {
                var token = jwt.issue({ id: user.id }, '1d');

                Peoples.update({
                  userId: user.id
                }, {
                  where: {
                    userId: user.id
                  }
                })

                Login.destroy({
                  where: {
                    userId: user.id
                  }
                })

                Login.create({
                  userId: user.id,
                  auth_token: token,
                  deviceId: "DeviceID",
                  deviceType: body.deviceType,
                  devicetoken: body.devicetoken,
                  socialType: "4",
                }, {
                  where: {
                    userId: user.id
                  }
                }).then(loginupdate => {

                  Users.findOne({
                    where: {
                      id: user.id
                    },
                    include: [{
                      model: Peoples,
                      as: 'profileOfUser'
                    },
                    {
                      model: Selfies,
                      as: 'SelfiesForUser'
                    },
                    {
                      model: Subscription,
                      as: 'subscriptionForUser'
                    }]
                  }).then(async peopledata => {

                    if (peopledata) {
                      peopledata.update({
                        status: "Active"
                      })

                      var checkImage = await getImages(user.id)
                      if(peopledata.instaToken != null) {
                        await axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token='+peopledata.instaToken)
                        .then(function (responses) {
                          if(responses.data)
                          res.insta = responses.data.data
                        })
                        .catch(function (error) {
                          // handle error
                          res.error =error
                          reject(res)
                        })
                      }
                      if (checkImage.success == true) {
                        res.success = true
                        res.login = true
                        res.token = token
                        res.images = checkImage
                        res.user = peopledata
                        res.message = "Login succesfully through Linkedin"
                        resolve(res)
                      } else {
                        res.success = true
                        res.login = true
                        res.token = token
                        res.user = peopledata
                        res.message = "Login succesfully through Linkedin"
                        resolve(res)
                      }
                    }

                  }).catch(err => {
                    console.log("error is-------------------------", err)
                    res.message = "Profile details cannot be fetched"
                    // res.error = err
                    reject(res)
                  })
                })
              }

            } else {
              console.log("REGISTER WITH LINKEDIN")
              //REGISTER WITH LINKEDIN
              Users.create({
                "email": body.email,
                "linkedinId": body.linkedinId,
                "isLinkedinUser": "Yes"
              }).then(user => {
                console.log("user issssss........." + user);
                var token = jwt.issue({ id: user.id }, '1d');
                Peoples.create({
                  userId: user.id,
                  name: body.name
                })

                Login.create({
                  userId: user.id,
                  auth_token: token,
                  deviceId: "jsdvfhsdjfh",
                  "deviceType": body.deviceType,
                  "devicetoken": body.devicetoken,
                  socialType: "4"
                }).then(loginupdate => {


                  Users.findOne({
                    where: {
                      id: user.id
                    },
                    include: [{
                      model: Peoples,
                      as: 'profileOfUser'
                    },
                    {
                      model: Selfies,
                      as: 'SelfiesForUser'
                    },
                    {
                      model: Subscription,
                      as: 'subscriptionForUser'
                    }]
                  }).then(peopledata => {

                    peopledata.update({
                      status: "Active"
                    })

                    res.success = true
                    res.token = token
                    res.message = "Linkedin user succesfully registered"
                    res.user = peopledata
                    res.register = true
                    resolve(res)
                  }).catch(err => {
                    console.log("Error 4-------------------", err)
                    res.message = "Profile details cannot be fetched"
                    // res.error = err
                    reject(res)
                  })
                })
              }).catch(err => {
                console.log("eRROR 3------------------------------", err);
                res.message = 'Something went wrong 1.'
                // res.error = err
                console.log(res);
                res.success = false
                reject(res)
              })
            }

          }).catch(err => {
            res.message = 'Something went wrong....1'
            // res.error = err
            console.log("ERROR 2--------------------------->", err)
            res.success = false
            reject(res)
          })

        }
        //APPLE ACCOUNT////////////////////////////////////
        else if (body.socialType == 5) {

          Users.findOne({
            where: {
              "AppleID": body.socialId,
              deletedAt: null
            },
            include: [{
              model: Login,
              as: 'loginForUser'
            },
            {
              model: Peoples,
              as: 'profileOfUser'
            },
            {
              model: Subscription,
              as: 'subscriptionForUser'
            }
            ]
          }).then(user => {

            if (user) {
              //LOGIN WITH APPLE
              console.log("APPLE LOGIN-------------------")
              if (user.statusByadmin == "Deactivate") {
                res.message = "User is Deactivated By Admin !"
                reject(res)
              }
              else {

                user.update({
                  "email": body.email
                })

                var token = jwt.issue({ id: user.id }, '1d');

                Peoples.update({
                  userId: user.id
                }, {
                  where: {
                    userId: user.id
                  }
                })

                Login.destroy({
                  where: {
                    userId: user.id
                  }
                })

                Login.create({
                  userId: user.id,
                  auth_token: token,
                  deviceId: "DeviceID",
                  socialId: body.socialId,
                  deviceType: body.deviceType,
                  devicetoken: body.devicetoken,
                  socialType: "5",
                }, {
                  where: {
                    userId: user.id
                  }
                }).then(loginupdate => {

                  Users.findOne({
                    where: {
                      id: user.id
                    },
                    include: [{
                      model: Peoples,
                      as: 'profileOfUser'
                    },
                    {
                      model: Selfies,
                      as: 'SelfiesForUser'
                    },
                    {
                      model: Subscription,
                      as: 'subscriptionForUser'
                    }]
                  }).then(async peopledata => {

                    if (peopledata) {
                      peopledata.update({
                        status: "Active"
                      })

                      var checkImage = await getImages(user.id)

                      if (checkImage.success == true) {
                        res.success = true
                        res.login = true
                        res.token = token
                        res.images = checkImage
                        res.user = peopledata
                        res.message = "Login succesfully through Apple Account"
                        resolve(res)
                      } else {
                        res.success = true
                        res.login = true
                        res.token = token
                        res.user = peopledata
                        res.message = "Login succesfully through Apple Account"
                        resolve(res)
                      }
                    }

                  }).catch(err => {
                    console.log("error is-------------------------", err)
                    res.message = "Profile details cannot be fetched"
                    // res.error = err
                    reject(res)
                  })
                })
              }

            } else {
              console.log("REGISTER WITH APPLE")
              //REGISTER WITH APPLE
              Users.create({
                "email": body.email,
                "AppleID": body.socialId
              }).then(user => {
                Peoples.create({
                  userId: user.id,
                })
            //    console.log("user issssss........." + user);
                var token = jwt.issue({ id: user.id }, '1d');


                Login.create({
                  userId: user.id,
                  auth_token: token,
                  deviceId: "jsdvfhsdjfh",
                  socialId: body.socialId,
                  "deviceType": body.deviceType,
                  "devicetoken": body.devicetoken,
                  socialType: "5"
                }).then(loginupdate => {


                  Users.findOne({
                    where: {
                      id: user.id
                    },
                    include: [{
                      model: Peoples,
                      as: 'profileOfUser'
                    },
                    {
                      model: Selfies,
                      as: 'SelfiesForUser'
                    },
                    {
                      model: Subscription,
                      as: 'subscriptionForUser'
                    }]
                  }).then(peopledata => {

                    peopledata.update({
                      status: "Active"
                    })

                    res.success = true
                    res.token = token
                    res.message = "Apple user succesfully registered"
                    res.user = peopledata
                    res.register = true
                    resolve(res)
                  }).catch(err => {
                    console.log("Error 4-------------------", err)
                    res.message = "Profile details cannot be fetched"
                    // res.error = err
                    reject(res)
                  })
                })
              }).catch(err => {
                console.log("eRROR 3------------------------------", err);
                res.message = 'Please delete the existing account first, then create a new account using Continue with Apple !'
                // res.error = err
                console.log(res);
                res.success = false
                reject(res)
              })
            }

          }).catch(err => {
            res.message = 'Something went wrong....1'
            // res.error = err
            console.log("ERROR 2--------------------------->", err)
            res.success = false
            reject(res)
          })

        }
        //EMAIL///////////////////////////////////////
        else {
          Users.findOne({
            where: {
              email: body.email,
            },
            include: {
              model: Otp,
              as: 'otpOfUser'
            }
          }).then(user => {
        //    console.log("user object is............" + JSON.stringify(user))
            if (user) {

              if (user.statusByadmin == "Deactivate") {
                res.message = "User is Deactivated By Admin !"
                reject(res)
              }
              else {
                if (user.deletedAt == null) {

                  if (user.email == "iossuperuser@ios.com") {
                    let res = {
                      message: 'Verify profile with following otp :: 397968 '
                    }
                    res.success = true
                    res.login = true
                    resolve(res)
                  }
                  else {
                    var chk = generateOtp()
                 //   console.log("Checking otp is.............", chk)
                    if (chk.success = true) {

                      emailService.sendMail("BlackGentry OTP <support@blackgentryapp.com>", chk.data, 'otp.ejs', user.email, "BlackGentry Authentication Code")

                      Otp.findOne({
                        where: {
                          userId: user.id
                        }
                      }).then(otpfound => {

                        if (otpfound) {

                          Otp.update({
                            otp: chk.data
                          },
                            {
                              where:
                              {
                                userId: user.id
                              }
                            }).then(result => {
                              let res = {
                                message: 'Passcode has been sent to your email succesfully.'
                              }
                              res.success = true
                              res.login = true
                              resolve(res)
                              console.log("Result isssssssssssss" + JSON.stringify(result))
                            }).catch(err => console.log(err))
                        }
                        else {
                          Otp.create({
                            userId: user.id,
                            otp: chk.data,
                            counter: 1
                          }).then(result => {
                            let res = {
                              message: 'Passcode has been sent to your email succesfully.'
                            }
                            res.success = true
                            res.login = true
                            resolve(res)
                            console.log("Result isssssssssssss" + JSON.stringify(result))
                          }).catch(err => console.log(err))
                        }

                      }).catch(err => {
                        res.message = "Something went wrong !"
                        reject(res)
                      })

                    }
                    else {
                      res.message = "Unable to Generate Passcode"
                      reject(res)
                    }
                  }

                } else {
                  body.deletedAt = null
                  var chk = generateOtp()

                  if (chk.success == true) {
                    let otpOfUser = {
                      otp: chk.data,
                      counter: 1
                    };
                    let profileOfUser = {
                    };
                    Users.update(body, {
                      where: { id: user.id }
                    }).then(users => {
                      console.log("user issssssssssssssssss........." + user);
                      var token = jwt.issue({ id: user.id }, '1d');
                      Otp.update(otpOfUser, { where: { userId: user.id } })
                      Login.create({
                        userId: user.id,
                        auth_token: token,
                        deviceId: "jsdvfhsdjfh",
                        "deviceType": body.deviceType,
                        "devicetoken": body.devicetoken,
                        socialType: "2",
                        socialId: body.socialId
                      }).then(loginupdate => {

                        Users.findOne({
                          where: {
                            id: user.id
                          },
                          include: [{
                            model: Peoples,
                            as: 'profileOfUser'
                          },
                          {
                            model: Subscription,
                            as: 'subscriptionForUser'
                          }]
                        }).then(peopledata => {

                          peopledata.update({
                            status: "Active"
                          })

                          res.success = true
                          res.token = token
                          res.message = "Facebook user succesfully registered"
                          res.user = peopledata
                          res.register = true
                          // res.token = jwt.issue({ id: user.id }, '1d'),
                          resolve(res)
                          
                        }).catch(err => {
                          res.message = "Profile details cannot be fetched"
                          // res.error = err
                          reject(res)
                        })
                      })
                    }).catch(err => {
                      console.log("I am hereeeeeeeeee 0", err);
                      res.message = 'Something went wrong 1.'
                      // res.error = err
                      console.log(res);
                      res.success = false
                      reject(res)
                    })
                  } else {
                    res.message = "Unable to Create Passcode"
                    res.success = false
                    reject(res)
                  }
                }
              }

            } else { //Register

              var chk = generateOtp()

              if (chk.success == true) {
                body.otpOfUser = {
                  otp: chk.data,
                  counter: 1
                };
                body.profileOfUser = {
                };
                Users.create(body, {
                  include: [
                    {
                      model: Otp,
                      as: 'otpOfUser'
                    },
                    {
                      model: Peoples,
                      as: 'profileOfUser'
                    },
                    {
                      model: Subscription,
                      as: 'subscriptionForUser'
                    }
                  ]
                }).then(user => {
                  res.success = true
                  // res.token = jwt.issue({ id: user.id }, '1d'),
                  res.message = 'Passcode has been sent to your email succesfully.'
                  res.register = true
                  console.log("Passcode for mail isssssss " + chk.data);

                  emailService.sendMail("BlackGentry OTP <support@blackgentryapp.com>", chk.data, 'otp.ejs', user.email, "BlackGentry Authentication Code")

                  resolve(res)
                }).catch(err => {
                  console.log("I am hereeeeeeeeee 0", err);
                  res.message = 'Something went wrong 1.'
                  // res.error = err
                  res.success = false
                  console.log(res);
                  reject(res)
                })
              }
              else {
                res.message = "Unable to Create Passcode"
                res.success = false
                reject(res)
              }
              // var OTPRegister = randomize('000000');
              // console.log("Otp while registeration is............" + OTPRegister)
            }
          }).catch(err => {
            res.message = 'Something went wrong....1'
            // res.error = err
            res.success = false
            console.log("Error is......." + err)
            reject(res)
          })
        }

      } catch (err) {
        res.message = 'Something went wrong..........2'
        // res.error = err
        res.success = false
        reject(res)
      }
    })
  },

  async resendPhoneOtp(body) {
    return new Promise((resolve, reject) => {
      var generatedOtp = generateOtp();
      var res = {
        success: false
      };

      if (generatedOtp.success == true) {
        Users.findOne({
          where: {
            phone: body.phone
          }
        }).then(async user => { 
          if (user) {
            Otp.findOne({
              where: {
                userId: user.id,
                isPhoneOtp: 1
              }
            }).then(async userOtp => {
              if (userOtp) {
                Otp.update({
                  otp: generatedOtp.data,
                },{
                  where: {
                    userId: user.id
                  }
                }).then(async response => {
                  res.success = true
                  res.message = 'OTP sent succesfully!.'
                  res.register = true
                  let sendOtp = await this.sendTwilioMessage(body.phone, generatedOtp.data);
                  resolve(res)
                })
              }
            })
          } else {
            res.message = "User does not exists"
            reject(res)
          }
        });
      }
    });
  },

  async sendOtpToEmail(body) {
    return new Promise((resolve, reject) => {
      var res = {
        success: false
      };

      Users.findOne({
        where: {
          email: body.email
        }
      }).then(async user => { 
        if (user) {

          Users.findOne({
            where: {
              phone: body.phone
            }
          }).then(async newUser => {
            var userId = newUser.id;
            console.log('User with email found')
            
            Answer.destroy({
              where: {
                [Op.or]: [{ userId: userId }, { matchId: userId }]
              }
            }).catch(err => {
              console.log("unable to delete ANSWERS !")
            })

            Matches.destroy({
              where: {
                [Op.or]: [{ fromId: userId }, { toId: userId }]
              }
            }).catch(err => {
              console.log("UNABLE TO DELETE MATCHES !")
            })

            Chat.destroy({
              where: {
                [Op.or]: [{ from_id: userId }, { to_id: userId }]
              }
            }).catch(err => {
              console.log("UNABLE TO DELETE CHATS")
            })

            tokenRecords.destroy({
              where: {
                userId: userId
              }
            }).catch(err => {
              console.log("UNABLE TO DELETE TOKEN RECORDS")
            })

            usersPurchases.destroy({
              where: {
                userId: userId
              }
            }).catch(err => {
              console.log("UNABLE TO DELETE USER PURCHASES")
            })

            Swipecounter.destroy({
              where: {
                userId: userId
              }
            }).catch(err => {
              console.log("UNABLE TO DELETE SWIPES")
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


            Selfies.destroy(
              {
                where:
                {
                  userId: userId
                }
              }).catch(err => {
                console.log("UNABLE TO DELETE SELFIES")
              })

            Subscription.destroy(
              {
                where:
                {
                  userId: userId
                }
              }).catch(err => {
                console.log("UNABLE TO DELETE ")
              })


            Users.destroy({
              where:
              {
                id: userId
              }
            }).then(lastuser => {
              console.log('USER PROFILE DELETED SUCCESFULLY')
              Users.update({
                phone: body.phone
              }, {
                where: {
                  email: user.email
                }
              }).then(response => {
                var chk = generateOtp()
                if (chk.success = true) {
                  emailService.sendMail("BlackGentry OTP <support@blackgentryapp.com>", chk.data, 'otp.ejs', body.email, "BlackGentry Authentication Code")

                  Otp.findOne({
                    where: {
                      userId: user.id
                    }
                  }).then(otpfound => {
                    if (otpfound) {
                      Otp.update({
                        otp: chk.data
                      },
                      {
                        where:
                        {
                          userId: user.id,
                          isPhoneOtp: 0
                        }
                      }).then(result => {
                        let res = {
                          message: 'OTP send to email successfully'
                        }
                        res.success = true
                        res.login = true
                        res.otp = chk.data;
                        resolve(res)
                      }).catch(err => console.log(err))
                    }
                    else {
                      Otp.create({
                        userId: user.id,
                        otp: chk.data,
                        counter: 1,
                        isPhoneOtp: 0
                      }).then(result => {
                        let res = {
                          message: 'OTP send to email successfully'
                        }
                        res.success = true
                        res.login = true
                        res.otp = chk.data;
                        resolve(res)
                      }).catch(err => console.log(err))
                    }

                  }).catch(err => {
                    res.message = "Internal Server Error"
                    reject(res)
                  })

                } else {
                  res.message = "Internal Server Error"
                  reject(res)
                }
                res.success = true;
                res.message = 'OTP send to email successfully';
                resolve(res);
              })
            }).catch(err => {
              console.log("Unable to delete Users data", err)
              res.success = false;
              res.message = 'Internal Server Error';
              reject(res);
            })
          });
        } else {
          console.log('This is new user')
          var chk = generateOtp()
          if (chk.success = true) {
            emailService.sendMail("BlackGentry OTP <support@blackgentryapp.com>", chk.data, 'otp.ejs', body.email, "BlackGentry Authentication Code")
            Users.findOne({
              where: {
                phone: body.phone
              }
            }).then(async newUser => {
              if (newUser) {
                Users.update({
                  email: body.email
                }, {
                  where: {
                    phone: body.phone
                  }
                });
                Otp.create({
                  userId: newUser.id,
                  otp: chk.data,
                  counter: 1,
                  isPhoneOtp: 0
                }).then(result => {
                  let res = {
                    message: 'OTP send to email successfully'
                  }
                  res.success = true
                  res.login = true
                  resolve(res)
                }).catch(err => console.log(err))
              } else {
                res.message = 'User does not exists';
                reject(res)
              }
            });
          } else {
            res.message = "Internal Server Error"
            reject(res)
          }
          
        }
      });
    });
  },

  async updateUserAddress(body) {
    return new Promise((resolve, reject) => { 
      var res = {
        success: false
      };
      Users.findOne({
        where: {
          id: body.id
        }
      }).then(async user => {
        if (user) {
          Peoples.findOne({
            where: {
              userId: user.id
            }
          }).then(async people => {
            if (people) {
              people.update({
                country: body.country,
                City: body.city ? body.city : null,
                state: body.state ? body.state : null
              }).then(async updated => {
                res.message = 'Address updated successfully'
                res.success = true
                resolve(res);
              })
            } else {
              res.message = 'User does not exists'
              res.success = false
              reject(res);
            }
          })
        } else {
          res.message = 'User does not exists'
          res.success = false
          reject(res);
        }
      }).catch(err => {
        console.log("ERR in update address :", err);
        res.message = 'Something went wrong, please try again later.'
        res.success = false
        reject(res);
      })
    });
  },

  async sendOtpToPhoneNumber(body) {
    return new Promise((resolve, reject) => {
      var generatedOtp = generateOtp();
      var res = {
        success: false
      };
      if (generatedOtp.success == true) {

        Users.findOne({
          where: {
            phone: body.phone
          }
        }).then(async userFound => {
          if (userFound) {
            Otp.findOne({
              where: {
                userId: userFound.id,
                isPhoneOtp: 1
              }
            }).then(async otpFound => {
              if (otpFound) {
                Otp.update({
                  otp: generatedOtp.data
                }, {
                  where: {
                    userId: userFound.id
                  }
                }).then( async otpUpdated => {
                  let sendOtp = await this.sendTwilioMessage(body.phone, generatedOtp.data);
                  res.success = true
                  res.message = 'OTP sent succesfully!.'
                  res.register = true
                  resolve(res)
                }).catch(err => {
                  console.log("ERR in OTP :", err);
                  res.message = 'Something went wrong, please try again later.'
                  res.success = false
                  reject(res);
                })
              } else {
                Otp.create({
                  userId: userFound.id,
                  otp: generatedOtp.data,
                  isPhoneOtp: 1,
                  counter: 1
                }).then( async otpCreated => {
                  let sendOtp = await this.sendTwilioMessage(body.phone, generatedOtp.data);
                  res.success = true
                  res.message = 'OTP sent succesfully!.'
                  res.register = true
                  resolve(res)
                }).catch(err => {
                  console.log("ERR in OTP :", err);
                  res.message = 'Something went wrong, please try again later.'
                  res.success = false
                  reject(res);
                })
              }
            })
          } else {
            body.otpOfUser = {
              otp: generatedOtp.data,
              counter: 1,
              isPhoneOtp: true
            };
            body.profileOfUser = {
            };
            
            Users.create(body, {
              include: [
                {
                  model: Otp,
                  as: 'otpOfUser'
                },
                {
                  model: Peoples,
                  as: 'profileOfUser'
                },
                {
                  model: Subscription,
                  as: 'subscriptionForUser'
                }
              ]
            }).then(async (user) => {
              res.success = true
              res.message = 'OTP sent succesfully!.'
              res.register = true
              let sendOtp = await this.sendTwilioMessage(body.phone, generatedOtp.data);
              resolve(res)
            }).catch(err => {
              console.log("ERR in OTP :", err);
              res.message = 'Something went wrong, please try again later.'
              res.success = false
              reject(res);
            })
          }
        })
      }
      else {
        res.message = "Unable to Create Passcode"
        res.success = false
        reject(res)
      }
    })
    
  },

  async sendTwilioMessage(phone, val) {
    return new Promise((resolve, reject) => {
      const accountSid = process.env.TWILIO_ACCOUNT_ID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const twilio = require('twilio')(accountSid, authToken);

      twilio.messages.create({
        body: `This is you Black Gentry verification Code: ${val}.`,
        from: '+12565968513',
        to: phone
      }).then(message => {
          console.log(message.sid);
          resolve({status: 200, message: 'OTP send successfully'});
      }).catch(err => {
          console.log(err);
          reject({status: 500, message: 'Internal Server Error'});
      });
    });
  },

  async verifyPhoneOtp(body) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }

      try {
        Users.findOne({
          where: {
            phone: body.phone
          },
          include: [{
            model: Otp,
            as: 'otpOfUser'
          }, {
            model: Peoples,
            as: 'profileOfUser'
          },
          {
            model: Selfies,
            as: 'SelfiesForUser'
          },
          {
            model: Subscription,
            as: 'subscriptionForUser'
          }
          ]
        }).then(async user => { 
          if (user) {
            console.log('======================================')
            console.log('======================================')
            console.log('======================================')
            console.log('User ID :', user.id)
            console.log('======================================')
            console.log('======================================')
            console.log('======================================')
            Otp.findOne({
              where: {
                userId: user.id,
                isPhoneOtp: 1
              }
            }).then(async userOtp => {
              console.log('======================================')
              console.log('======================================')
              console.log('======================================')
              console.log('User OTP :', userOtp)
              console.log('======================================')
              console.log('======================================')
              console.log('======================================')
              if (body.otp == userOtp.otp) {
                console.log('OTP success')
                user.update({
                  status: 'Active'
                });

                if (user.email) {
                  console.log('User email found')
                  var token = jwt.issue({ id: user.id }, '1d');
                  Login.findOne({
                    where: {
                      userId: user.id
                    }
                  }).then(loginchk => {

                    Users.findOne({
                      where: {
                        phone: body.phone
                      },
                      include: {
                        model: Login,
                        as: 'loginForUser'
                      }
                    }).then(checklogin => {
                      if (body.linkedinId) {
                        Login.update({
                          userId: user.id,
                          auth_token: token,
                          deviceId: "DeviceID",
                          socialType: 4,
                          deviceType: body.deviceType,
                          devicetoken: body.devicetoken,
                        }, {
                          where: {
                            userId: checklogin.id
                          }
                        }).then(async loginemail => {
                          var checkImage = await getImages(user.id)
                          if(user.instaToken != null) {
                            await axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token='+user.instaToken)
                            .then(function (responses) {
                              if(responses.data)
                              res.insta = responses.data.data
                            })
                            .catch(function (error) {
                              res.error = error
                              reject(res)
                            })
                          }
                          res.success = true
                          res.token = token,
                          res.user = user,
                          res.images = checkImage,
                          res.login = true,
                          res.message = 'Registered successfully with Linkedin'
                          resolve(res)
                          
                        }).catch(err => {
                          res.message = "Internal Server Error"
                          reject(res)
                        })
                      }
                      else {
                        if (loginchk) {
                          Login.destroy(
                            {
                              where: {
                                "userId": user.id
                              }
                            })
                        }
                        Login.create({
                          userId: user.id,
                          auth_token: token,
                          deviceId: "DeviceID",
                          deviceType: body.deviceType,
                          devicetoken: body.devicetoken,
                        }).then(async loginemail => {
                          var checkImage = await getImages(user.id)
                          if(user.instaToken != null) {
                            axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token='+user.instaToken)
                            .then(function (responses) {
                              if(responses.data)
                              res.insta = responses.data
                            })
                            .catch(function (error) {
                              // handle error
                              res.error =error
                              reject(res)
                            })
                          }
                          res.success = true
                          res.token = token,
                          res.user = user,
                          res.images = checkImage,
                          res.login = true,
                          res.message = 'Registered successfully with Email'
                          resolve(res)
                          
                        }).catch(err => {
                          console.log("Error :", err)
                          res.message = "Unable to Login 1"
                          reject(res)
                        })
                      }
                    })
                  }).catch(err => {
                    console.log(err)
                    res.message = "Internal Server Error"
                    reject(res)
                  })
                } else {
                  res.success = true
                  res.token = null,
                  res.user = null,
                  res.images = null,
                  res.login = false,
                  res.message = 'OTP verified successfully'
                  resolve(res)
                }
              } else {
                res.message = "OTP does not match"
                reject(res)
              }
            })
          } else {
            res.message = "User does not exists"
            reject(res)
          }
        });
      } catch (err) {
        res.message = "Internal Server Error"
        reject(res)
      }
    });
  },

  async appleLogin(body) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        Users.findOne({
          where: {
            "AppleID": body.socialId,
            deletedAt: null
          },
          include: [{
            model: Login,
            as: 'loginForUser'
          },
          {
            model: Peoples,
            as: 'profileOfUser'
          },
          {
            model: Subscription,
            as: 'subscriptionForUser'
          }
          ]
        }).then(user => {
          if (user) {
            //LOGIN WITH APPLE
            if (user.statusByadmin == "Deactivate") {
              res.message = "User is Deactivated By Admin !"
              reject(res)
            }
            else {
                user.update({
                  "email": user.email
                })
  
                var token = jwt.issue({ id: user.id }, '1d');
  
                Peoples.update({
                  userId: user.id
                }, {
                  where: {
                    userId: user.id
                  }
                })
  
                Login.destroy({
                  where: {
                    userId: user.id
                  }
                })
  
                Login.create({
                  userId: user.id,
                  auth_token: token,
                  deviceId: "DeviceID",
                  socialId: body.socialId,
                  deviceType: body.deviceType,
                  devicetoken: body.devicetoken,
                  socialType: "5",
                }, {
                  where: {
                    userId: user.id
                  }
                }).then(loginupdate => {
  
                  Users.findOne({
                    where: {
                      id: user.id
                    },
                    include: [{
                      model: Peoples,
                      as: 'profileOfUser'
                    },
                    {
                      model: Selfies,
                      as: 'SelfiesForUser'
                    },
                    {
                      model: Subscription,
                      as: 'subscriptionForUser'
                    }]
                  }).then(async peopledata => {
  
                    if (peopledata) {
                      peopledata.update({
                        status: "Active"
                      })
  
                      var checkImage = await getImages(user.id)
  
                      if (checkImage.success == true) {
                        res.success = true
                        res.login = true
                        res.token = token
                        res.images = checkImage
                        res.user = peopledata
                        res.message = "Login succesfully through Apple Account"
                        resolve(res)
                      } else {
                        res.success = true
                        res.login = true
                        res.token = token
                        res.user = peopledata
                        res.message = "Login succesfully through Apple Account"
                        resolve(res)
                      }
                    }
  
                  }).catch(err => {
                    console.log("error is-------------------------", err)
                    res.message = "Profile details cannot be fetched"
                    // res.error = err
                    reject(res)
                  })
                })
             
            } //----
          } else {
            if(body.email != undefined) { 

              Users.create({
                "email": body.email,
                "AppleID": body.socialId
              }).then(user => {
                Peoples.create({
                  userId: user.id,
                })
               // console.log("user issssss........." + user);
                var token = jwt.issue({ id: user.id }, '1d');
  
  
                Login.create({
                  userId: user.id,
                  auth_token: token,
                  deviceId: "jsdvfhsdjfh",
                  socialId: body.socialId,
                  "deviceType": body.deviceType,
                  "devicetoken": body.devicetoken,
                  socialType: "5"
                }).then(loginupdate => {
  
  
                  Users.findOne({
                    where: {
                      id: user.id
                    },
                    include: [{
                      model: Peoples,
                      as: 'profileOfUser'
                    },
                    {
                      model: Selfies,
                      as: 'SelfiesForUser'
                    },
                    {
                      model: Subscription,
                      as: 'subscriptionForUser'
                    }]
                  }).then(peopledata => {
  
                    peopledata.update({
                      status: "Active"
                    })
  
                    res.success = true
                    res.token = token
                    res.message = "Apple user succesfully registered"
                    res.user = peopledata
                    res.register = true
                    resolve(res)
                  }).catch(err => {
                    console.log("Error 4-------------------", err)
                    res.message = "Profile details cannot be fetched"
                    // res.error = err
                    reject(res)
                  })
                })
              }).catch(err => {
                console.log("eRROR 3------------------------------", err);
                res.message = 'Please delete the existing account first, then create a new account using Continue with Apple !'
                // res.error = err
                console.log(res);
                res.success = false
                reject(res)
              })
            } else {
              res.message = 'Email is required ..... !'
              // res.error = err
              res.success = false
              reject(res)
            }
            
          }

        }).catch(err => {
          res.message = 'Something went wrong....1'
          // res.error = err
          console.log("ERROR 2--------------------------->", err)
          res.success = false
          reject(res)
        })

           } catch (err) {
        res.message = 'Something went wrong..........2'
        // res.error = err
        res.success = false
        reject(res)
      }
    })
  },
  /*
  * 
  * Service for Linkedin login
  * Params: [email,Otp]
  */

  async linkedin(body) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {

        Users.findOne({
          where: {
            // socialType: 4,
            // email: body.email,
            linkedinId: body.linkedinId,
            status: "Active"
          }
        }).then(linkedinfound => {

         // console.log("--------------------->>>>>>>>>>>>", linkedinfound)

          if (linkedinfound) {
          //  console.log("--------->>>>>>>>>>>>>>>>>", linkedinfound.id)

            if (linkedinfound.statusByadmin == "Deactivate") {
              res.message = "User is Deactivated By Admin !"
              reject(res)
            }
            else {
              Peoples.update({
                name: body.name
              }, {
                where: {
                  userId: linkedinfound.id
                }
              }).then(insertname => {

                Users.findOne({
                  where: {
                    id: linkedinfound.id
                  },
                  include: [{
                    model: Peoples,
                    as: 'profileOfUser'
                  },
                  {
                    model: Selfies,
                    as: 'SelfiesForUser'
                  },
                  {
                    model: Subscription,
                    as: 'subscriptionForUser'
                  }]
                }).then(async userfound => {

                  if (userfound) {

                //    console.log("-----------------------", userfound.dataValues.status)

                    var token = jwt.issue({ id: linkedinfound.id }, '1d');

                    var checkImage = await getImages(linkedinfound.id)



                    if (userfound.dataValues.status == "Active") {


                      Login.findOne({
                        where: {
                          userId: linkedinfound.id
                        }
                      }).then(tokenupdate => {

                        if (tokenupdate) {
                          Login.update({
                            auth_token: token,
                            socialType: 4,
                            deviceId: "deviceID",
                            devicetoken: body.devicetoken,
                            deviceType: body.deviceType
                          }, {
                            where: {
                              userId: linkedinfound.id
                            }
                          })
                        }
                        else {
                          Login.create({
                            userId: linkedinfound.id,
                            auth_token: token,
                            socialType: 4,
                            deviceId: "deviceID",
                            devicetoken: body.devicetoken,
                            deviceType: body.deviceType
                          })
                        }

                        res.success = true
                        res.login = true
                        res.token = token
                        res.images = checkImage
                        res.user = userfound
                        resolve(res)

                      })

                    }
                    else {
                      res.message = "User not verified !"
                      reject(res)
                    }


                  }
                  else {
                    res.message = "USER DOESN'T EXIST"
                    reject(res)
                  }

                }).catch(err => {
                  console.log("ERROR IS-----------------", err)
                  reject(res)
                })
              })

            }

          }
          else {
            res.message = "Linkedin User doesn't Exist !"
            reject(res)
          }
        }).catch(err => {
          res.message = "Something went wrong !"
        })



      }
      catch (err) {
        console.log(err)
        res.message = 'Something went wrong..........2'
        // res.error = err
        res.success = false
        reject(res)
      }
    })
  },
  /*
  *
  * Service for User to Verify Otp
  * Params: [Otp]
  * 
  */

  async verifyOtp(body) {

    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {

        Users.findOne({
          where: {
            email: body.email
          },
          include: [{
            model: Otp,
            as: 'otpOfUser'
          }, {
            model: Peoples,
            as: 'profileOfUser'
          },
          {
            model: Selfies,
            as: 'SelfiesForUser'
          },
          {
            model: Subscription,
            as: 'subscriptionForUser'
          }
          ]
        }).then(async user => {
          //console.log("I foundedddddddddddddddddddd" + JSON.stringify(user));
          if (user) {
            Otp.findOne({
              where: {
                userId: user.id,
                isPhoneOtp: 0
              }
            }).then(async emailOtp => {
              if (emailOtp) {
                if (body.otp == emailOtp.otp) {
                  console.log("Otp is matched");
                  user.update({
                    status: 'Active'
                  })
                  var token = jwt.issue({ id: user.id }, '1d');
    
                  Login.findOne({
                    where: {
                      userId: user.id
                    }
                  }).then(loginchk => {
    
                    Users.findOne({
                      where: {
                        email: body.email
                      },
                      include: {
                        model: Login,
                        as: 'loginForUser'
                      }
                    }).then(checklogin => {
    
                  //    console.log("------------------------->", JSON.stringify(checklogin))
    
    
                      // console.log("------------------------->", checklogin.dataValues.linkedinId)
    
                      // console.log("------------------------->", checklogin.dataValues.loginForUser.linkedinId)
    
                      if (body.linkedinId) {
    
                        Login.update({
                          userId: user.id,
                          auth_token: token,
                          deviceId: "DeviceID",
                          socialType: 4,
                          deviceType: body.deviceType,
                          devicetoken: body.devicetoken,
                        }, {
                          where: {
                            userId: checklogin.id
                          }
                        }).then(async loginemail => {
                          var checkImage = await getImages(user.id)
                          if(user.instaToken != null) {
                            await axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token='+user.instaToken)
                            .then(function (responses) {
                              if(responses.data)
                              res.insta = responses.data.data
                            })
                            .catch(function (error) {
                              // handle error
                              res.error =error
                              reject(res)
                            })
                          }
                          res.success = true
                          res.token = token,
                            res.user = user,
                            res.images = checkImage,
                            res.login = true,
                            res.message = 'Registered successfully with Linkedin'
                          resolve(res)
                          console.log("Login record inserted");
                        }).catch(err => {
                          res.message = "Unable to Login 2"
                          reject(res)
                        })
                      }
                      else {
                        if (loginchk) {
                          Login.destroy(
                            {
                              where: {
                                "userId": user.id
                              }
                            })
                        }
    
    
                        Login.create({
                          userId: user.id,
                          auth_token: token,
                          deviceId: "DeviceID",
                          deviceType: body.deviceType,
                          devicetoken: body.devicetoken,
                        }).then(async loginemail => {
                          var checkImage = await getImages(user.id)
                          if(user.instaToken != null) {
                            axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token='+user.instaToken)
                            .then(function (responses) {
                              if(responses.data)
                              res.insta = responses.data
                            })
                            .catch(function (error) {
                              // handle error
                              res.error =error
                              reject(res)
                            })
                          }
                          res.success = true
                          res.token = token,
                            res.user = user,
                            res.images = checkImage,
                            res.login = true,
                            res.message = 'Registered successfully with Email'
                          resolve(res)
                          console.log("Login record inserted");
                        }).catch(err => {
                          res.message = "Unable to Login 1"
                          reject(res)
                        })
                      }
                    })
    
    
    
    
                  }).catch(err => {
                    console.log(err)
                    res.message = "Something went wrong"
                    reject(res)
                  })
    
                } //profile
    
                else {
                  console.log("Passcode doesn't match");
                  reject(res)
                }
              } else {
                res.message = "OTP does not exists"
                reject(res)
              }
            })
          } else {
            res.message = 'Email does not exists.'
            // res.error = err
            reject(res)
          }
        }).catch(err => {
          console.log(err)
          res.message = 'Something went wrong 1.'
          // res.error = err
          console.log(err);
          reject(res)
        })
      } catch (err) {
        res.message = 'Something went wrong 3.'
        // res.error = err
        reject(res)
      }
    })
  },

  /*
  *
  * Service for User to Resend Otp.....
  * Params: [Otp]
  */

  async resendOtp(body) {

    return new Promise((resolve, reject) => {
      var res = {
        success: false
      }
      try {
        Users.findOne({
          where: {
            email: body.email
          },
          include: {
            model: Otp,
            as: 'otpOfUser'
          }
        }).then(async user => {
          if (user) {

            var chk = generateOtp()

            if (chk.success == true) {


              await emailService.sendMail("BlackGentry OTP <support@blackgentryapp.com>", chk.data, 'otp.ejs', user.email, "BlackGentry Authentication Code")

              Otp.update({
                otp: chk.data
              },
                {
                  where:
                  {
                    userId: user.id
                  }
                }).then(result => {
                  let res = {
                    message: 'Passcode has been sent to your email succesfully.'
                  }
                  res.success = true
                  res.login = true
                  resolve(res)
                  console.log("Result isssssssssssss" + JSON.stringify(result))
                }).catch(err => console.log(err))

            } else {
              res.message = "Unable to Generate Passcode"
              reject(res)
            }

          } else {
            res.message = 'Email does not exists.'
            reject(res)
          }
        }).catch(err => {
          console.log('err......', err)
          res.message = 'Something went wrong 1.'
          // res.error = err
          reject(res)
        })
      } catch (err) {
        res.message = 'Something went wrong 3.'
        // res.error = err
        reject(res)
      }
    })
  },

  /*
  *
  * Services for Get all roles
  * 
  */

  roles() {
    return new Promise((resolve, reject) => {
      var res = {
        success: false
      }
      try {
        Roles.findAll().then(roles => {
          if (roles) {
            res.success = true
            res.roles = roles
            resolve(res)
          }
        }).catch(err => {
          res.message = 'Something went wrong.'
          // res.error = err
          reject(res)
        })
      } catch (err) {
        res.message = 'Something went wrong.'
        // res.error = err
        reject(res)
      }
    })
  },

  /*
  *
  * Services for update profile
  * return data of user
  */

  updateProfile(body, userId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        Peoples.findOne({
          where: {
            userId: userId,
            deletedAt: null
          },
          include: {
            model: Users,
            as: 'profileOfUser'
          }
        }).then(user => {

          if (user) {

            if (user.profileOfUser.status == 'Active') {

              if ((body.gender == "Male") || (body.gender == "Female")) {
                console.log("No Male and female========================")
                body.showmeto = null

                user.update(body).then(user => {
                  console.log("======================", JSON.stringify(user))
                  Users.findOne({
                    where: {
                      id: userId,
                      deletedAt: null
                    },
                    include: {
                      model: Peoples,
                      as: 'profileOfUser'
                    }
                  }).then(async usr => {

                    var gettingstatus = await calculateStatus(userId)
                    var countQuestions = gettingstatus.count

                    var checkImage = await getImages(userId)

                    if (checkImage.data.length != 0) {
                   //   console.log("Image length is.......", 3)
                      var countImage = 2 * checkImage.data.length
                    }

                  //  console.log("------------->>>>>>>>>>>>>", countImage)
                    if(user.profileOfUser.instaToken != null) {
                      await axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token='+user.profileOfUser.instaToken)
                      .then(function (responses) {
                        if(responses.data)
                        res.insta = responses.data.data
                      })
                      .catch(function (error) {
                        // handle error
                        res.error =error
                        reject(res)
                      })
                    }
                    if (checkImage.data.length != 0) {
                      Peoples.update(
                        {
                          "completed": countQuestions + countImage
                        }, {
                        where: {
                          userId: userId
                        }
                      }).then(uppp => {

                        Users.findOne({
                          where: {
                            id: userId
                          },
                          include: {
                            model: Peoples,
                            as: 'profileOfUser'
                          }
                        }).then(useri => {
                          res.ProfileCompleted = countQuestions + countImage
                          res.success = true
                          res.user = useri
                          res.message = 'Profile updated successfully.'
                          resolve(res)
                        })

                      }).catch(err => {
                        console.log("Nottttttttttttttt Workingggggggggggggggggggggg", err)
                      })
                    }
                    else {
                      Peoples.update(
                        {
                          "completed": countQuestions
                        }, {
                        where: {
                          userId: userId
                        }
                      }).then(uppp => {

                        Users.findOne({
                          where: {
                            id: userId
                          },
                          include: {
                            model: Peoples,
                            as: 'profileOfUser'
                          }
                        }).then(useri => {
                          res.ProfileCompleted = countQuestions
                          res.success = true
                          res.user = useri
                          res.message = 'Profile updated successfully.'
                          resolve(res)
                        })

                      }).catch(err => {
                        console.log("Nottttttttttttttt Workingggggggggggggggggggggg", err)
                      })
                    }

                  }).catch(err => {
                    console.log(err)
                    res.message = 'Something went wrong. 1'
                    // res.error = err
                    reject(res)
                  })
                }).catch(err => {
                  res.message = 'Something went wrong. 2'
                  // res.error = err
                  reject(res)
                })
              }
              else {

                user.update(body).then(user => {
                  Users.findOne({
                    where: {
                      id: userId,
                      deletedAt: null
                    },
                    include: {
                      model: Peoples,
                      as: 'profileOfUser'
                    }
                  }).then(async usr => {

                    var gettingstatus = await calculateStatus(userId)
                    var countQuestions = gettingstatus.count

                    var checkImage = await getImages(userId)

                    if (checkImage.data.length != 0) {
                      console.log("Image length is.......", 3)
                      var countImage = 2 * checkImage.data.length
                    }

                  //  console.log("Total status is ===>>>>>>>>>>>", countQuestions)

                    if (checkImage.data.length != 0) {

                      var totalfinal = countQuestions + countImage
                      console.log("count image and dataaaaaaaaaaaaaaaaaaaaaaa", countImage)

                      Peoples.update(
                        {
                          "completed": countQuestions + countImage
                        }, {
                        where: {
                          userId: userId
                        }
                      }).then(chkres => {
                        res.ProfileCompleted = countQuestions + countImage
                        res.success = true
                        res.user = usr
                        res.message = 'Profile updated successfully.'
                        resolve(res)
                      }).catch(err => {
                        console.log("ERROR ISSSSSSSSSSSSSSSSSS", err)
                      })
                    }
                    else {
                      Peoples.update(
                        {
                          "completed": countQuestions
                        }, {
                        where: {
                          userId: userId
                        }
                      }).then(chkres => {
                        res.ProfileCompleted = countQuestions
                        res.success = true
                        res.user = usr
                        res.message = 'Profile updated successfully.'
                        resolve(res)
                      })
                    }

                  }).catch(err => {
                    console.log(err)
                    res.message = 'Something went wrong. 1'
                    // res.error = err
                    reject(res)
                  })
                }).catch(err => {
                  res.message = 'Something went wrong. 2'
                  // res.error = err
                  reject(res)
                })
              }

           //   console.log("Gender isssssssssssssssssssssssssssss", body.showmeto)


            } else {
              res.message = 'This account is deactive. Please contact to admin for further details.'
              res.code = 'BAD_REQUEST'
              reject(res)
            }
          }
        }).catch(err => {
          res.message = 'Something went wrong. 1'
          // res.error = err
          console.log("ERRRRRRRRRRRRRRR================", err)
          reject(res)
        })
      } catch (err) {
        res.message = 'Something went wrong. 2'
        // res.error = err
        reject(res)
      }
    })
  },

  /**
   * 
   * ****** 3 ANSWERS API **
   * 
   **/

  answersProfile(body, userId) {
    return new Promise((resolve, reject) => {
      var res = {
        success: false
      }
      try {
        Peoples.findOne({
          where: {
            userId: userId,
            deletedAt: null
          },
          include: {
            model: Users,
            as: 'profileOfUser'
          }
        }).then(user => {
       //   console.log("Return data is..." + JSON.stringify(user))

          if (user) {
            if (user.profileOfUser.status == 'Active') {

              Answer.findOne({
                where: {
                  userId: userId,
                  matchId: body.matchId,
                  deletedAt: null
                }
              }).then(answer => {
                if (answer) {
                  answer.update({
                    "userId": userId,
                    "matchId": body.matchId,
                    "Answer1": body.Answer1,
                    "Answer2": body.Answer2,
                    "Answer3": body.Answer3
                  }, {
                    where: {
                      "userId": userId,
                    }
                  }).then(updateanswer => {
                    res.success = true
                    res.answer = answer
                    res.message = 'Answers updated successfully.'
                    resolve(res)
                  }).catch(err => {
                    res.message = 'Something went wrong. 1'
                    // res.error = err
                    console.log(err)
                    reject(res)
                  })
                }
                else {

                  Answer.create({
                    "userId": userId,
                    "matchId": body.matchId,
                    "Answer1": body.Answer1,
                    "Answer2": body.Answer2,
                    "Answer3": body.Answer3
                  }).then(createanswer => {
                    let pushData = {
                      message: user.name + ' has given Answers.',
                      userId: userId,
                      answers: createanswer.dataValues,
                      action: 3
                    };
                    push.sendPush(body.matchId, pushData);

                    res.answer = createanswer
                    res.message = 'Answers submitted successfully.'
                    res.success = true
                    resolve(res)
                  }).catch(err => {

                  })

                }
              }).catch(err => {
                res.message = "Answers cannot be found"
                reject(res)
              })

              // Answer.findOne({
              //   where: {
              //     userId: body.matchId,
              //     matchId: userId,
              //     deletedAt: null
              //   }
              // }).then(matchupdate => {

              //   if (matchupdate) {
              //     Matches.update({
              //       "answersGiven": "Yes"
              //     }, {
              //       where: {
              //         [Op.and]: [
              //           {
              //             [Op.or]: [{ fromId: userId }, { toId: userId }]
              //           },
              //           {
              //             [Op.or]: [{ fromId: body.matchId }, { toId: body.matchId }]
              //           }
              //         ]
              //       }
              //     }).then(afterupdate => {
              //       console.log("Match updated !")
              //     }).catch(err => {
              //       console.log("Unable to update Match data")
              //     })
              //   }
              //   else {
              //     console.log("Inside the Elseeeeeeeeeeeeeeeee")
              //   }

              // }).catch(err => {
              //   res.message = "Unable to access Matched Data"
              //   reject(res)
              // })

            } else {
              res.message = 'This account is deactive. Please contact to admin for further details.'
              res.code = 'BAD_REQUEST'
              reject(res)
            }
          }
          else {
            res.message = "user not found"
            reject(res)
          }
        }).catch(err => {
          res.message = 'Something went wrong. 2'
          // res.error = err
          console.log(err)
          reject(res)
        })
      } catch (err) {
        res.message = 'Something went wrong. 3'
        // res.error = err
        reject(res)
      }
    })
  },

  /** 
   * 
   ******** Api for sharing contacts 
   * 
   ***/

  contactShare(body, userId) {
    return new Promise((resolve, reject) => {
      var res = {
        success: false
      }

      try {
        Answer.findOne({
          where: {
            userId: userId,
            matchId: body.matchId
          }
        }).then(answer => {

          if (answer) {

            answer.update({
              ContactNumber: body.contact
            }).then(contactupdate => {

              res.contactDetails = {
                id: contactupdate.id,
                userId: contactupdate.userId,
                matchId: contactupdate.matchId,
                contactNumber: contactupdate.ContactNumber
              }

              res.success = true,

                resolve(res)
            }).catch(err => {
              res.message = "Unable to create Answers"
              reject(res)
            })
          }

          else {
            res.message = "Answer Questions First !"
            reject(res)
          }

        }).catch(err => {

        })

      } catch (err) {
        res.message = 'Something went wrong.'
        // res.error = err
        reject(res)
      }
    })
  },

  /****
   * 
   **** Services for reporting User 
   * 
   ****/

  reportUser(body, userId) {
    return new Promise((resolve, reject) => {
      var res = {
        success: false
      }

      try {

        Reports.findOne({
          where: {
            [Op.and]: [{ reportedBy: userId }, { reportedFor: body.reportedfor }]
          }
        }).then(reportfound => {

          if (reportfound) {
            res.message = "Already recieved a Report"
            reject(res)
          }

          else {
            Reports.create({
              reportedBy: userId,
              reportedFor: body.reportedfor,
              reason: body.reason
            }).then(reportcreate => {
              res.success = true
              res.report = reportcreate
              resolve(res)
            }).catch(err => {
              res.message = "Unable to accept report !"
              reject(res)
            })
          }

        }).catch(err => {
          res.message = "Something went wrong !"
          reject(res)
        })

      } catch (err) {
        res.message = 'Something went wrong.'
        // res.error = err
        reject(res)
      }
    })
  },


  /*
  *
  * Services for getting profile information from peoples table
  * 
  */

  profile(UserId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        Users.findOne({
          where: {
            id: UserId,
            deletedAt: null
          },
          include: {
            model: Peoples,
            as: 'profileOfUser'
          }
        }).then(async user => {

          if (user) {

            var pepupd = user.dataValues.profileOfUser.dataValues


            var gettingstatus = await calculateStatus(user.id)
            var countQuestions = gettingstatus.count

            var checkImage = await getImages(user.id)

            if (checkImage.data.length != 0) {
              var countImage = 2 * checkImage.data.length
            }
            if(user.instaToken != null) {
              await axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token='+user.instaToken)
              .then(function (responses) {
                if(responses.data) {
                  res.insta = responses.data.data
                }
              })
              .catch(function (error) {
                // handle error
                res.error =error
                reject(res)
              })
              
            } else {
              res.insta = []
            }
            if (checkImage.success == true) {
              pepupd.completed = countQuestions + countImage
              res.success = true
              res.user = user
              res.images = checkImage
              resolve(res)
            } else {
              res.success = true
              res.user = user
              resolve(res)
            }
          }
          else {
            res.message = "Record not found"
            reject(res)
          }
        }).catch(err => {
          console.log(err)
          res.message = 'Something went wrong.'
          // res.error = err
          reject(res)
        })
      } catch (err) {
        res.message = 'Something went wrong.'
        // res.error = err
        reject(res)
      }
    })
  },


  /*
  *
  * Services for Get all users
  * 
  */

  userList() {
    return new Promise((resolve, reject) => {
      var res = {
        success: false
      }
      try {
        Users.findAll({
          include: [
            {
              model: Peoples,
              as: 'profileOfUser'
            },
            {
              model: Image,
              as: 'ImageForUser'
            }
          ],
        }).then(users => {
          if (users) {
            res.success = true
            res.users = users
            resolve(res)
          }
        }).catch(err => {
          res.message = 'Something went wrong. 1'
          // res.error = err
          console.log(err)
          reject(res)
        })
      } catch (err) {
        res.message = 'Something went wrong. 2'
        // res.error = err
        reject(res)
      }
    })
  },

  /**
   *
   * Services to Delete User 
   * 
   *  
   **/

  deleteProfile(userId) {
    console.log("User Id issssssssssss........" + userId);
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        Users.findOne({
          where: {
            id: userId,
            deletedAt: null
          }
        }).then(async user => {
          if (user) {

            Answer.destroy({
              where: {
                [Op.or]: [{ userId: userId }, { matchId: userId }]
              }
            }).catch(err => {
              console.log("unable to delete ANSWERS !")
            })

            Matches.destroy({
              where: {
                [Op.or]: [{ fromId: userId }, { toId: userId }]
              }
            }).catch(err => {
              console.log("UNABLE TO DELETE MATCHES !")
            })

            Chat.destroy({
              where: {
                [Op.or]: [{ from_id: userId }, { to_id: userId }]
              }
            }).catch(err => {
              console.log("UNABLE TO DELETE CHATS")
            })

            tokenRecords.destroy({
              where: {
                userId: userId
              }
            }).catch(err => {
              console.log("UNABLE TO DELETE TOKEN RECORDS")
            })

            usersPurchases.destroy({
              where: {
                userId: userId
              }
            }).catch(err => {
              console.log("UNABLE TO DELETE USER PURCHASES")
            })

            Swipecounter.destroy({
              where: {
                userId: userId
              }
            }).catch(err => {
              console.log("UNABLE TO DELETE SWIPES")
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


            Selfies.destroy(
              {
                where:
                {
                  userId: userId
                }
              }).catch(err => {
                console.log("UNABLE TO DELETE SELFIES")
              })

            Subscription.destroy(
              {
                where:
                {
                  userId: userId
                }
              }).catch(err => {
                console.log("UNABLE TO DELETE ")
              })


            Users.destroy({
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
              reject(res)
            })

          } else {
            res.message = 'User Profile not found.'
            reject(res)
          }
        }).catch(err => {
          res.message = 'Something went wrong 1.'
          // res.error = err
          console.log("Error issssssss................" + err)
          reject(res)
        })
      } catch (err) {
        res.message = 'Something went wrong 2.'
        // res.error = err
        reject(res)
      }
    })
  },

  /******
   * 
   * **** Services to Set order of Images 
   */

  async imageOrder(req) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        if (req.body.images) {

          console.log("USER IDDDDDDDDDDDD", req.user.id)
          var imagedata = req.body.images


          imagedata.forEach(element => {

            Image.update({
              "imageUrl": element.imageUrl
            }, {
              where: {
                orderId: element.orderId,
                userId: req.user.id
              },
            }).then(imgord => {
            }).catch(err => {
              res.message = "UNABLE TO EDIT THE ORDERS OF IMAGES !"
              reject(res)
            })

          })

          var image = {
            "success": true,
            "data": imagedata
          }

        }

        res.success = true
        res.images = image
        resolve(res)

      }
      catch (err) {
        res.message = "Something went wrong 2"
        console.log("Error is.........", err)
        // res.error = err
        reject(res)
      }


    })
  },

  /**
   * 
   *  Services for deleting IMAGES
   * 
   **/

  async deleteimage(req) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        Image.findOne({
          where: {
            id: req.params.id,
            userId: req.user.id,
            deletedAt: null
          }
        }).then(async imgdel => {

          imgdel.destroy({}).then(async delit => {

            var checkImage = await getImages(req.user.id)
            let newdata = []
            let orderNumber = 0
            checkImage.data.forEach(element => {
              orderNumber = orderNumber + 1
              newdata.push({
                "userId": req.user.id,
                orderId: orderNumber,
                "imageUrl": element.imageUrl
              })
            })

            console.log("New DATA IS -------------------", newdata)

            Image.destroy({
              where: {
                userId: req.user.id
              }
            })

            await Image.bulkCreate(newdata)

            // Image.update({newdata,
            // where:{
            //   userId: req.user.id
            // }
            // }).then(orderupdate => {
            // console.log("Updating orders of Images")
            // })

            res.success = true
            res.message = "Image deleted succesfully"
            resolve(res)
          }).catch(err => {
            console.log(err)
            res.message = "UNABLE TO DELETE IMAGES"
            reject(res)
          })
        }).catch(err => {
          res.message = "Image not found"
          reject(res)
        })
      } catch (err) {
        console.log(err)
        res.message = 'Something went wrong. 2'
        // res.error = err
        reject(res)
      }
    })
  },

  /*
  *
  ******SERVICES FOR LOGOUT
  **
  **/

  logout(req) {
    return new Promise((resolve, reject) => {
      var res = {
        success: false
      }
      try {
        Users.findOne({
          where: {
            id: req.user.id,
            deletedAt: null
          }
        }).then(users => {
          if (users) {
            Login.destroy(
              {
                where: {
                  "userId": req.user.id
                }
              })

            res.success = true
            res.message = "SUCCESFULLY LOGGED OUT"
            res.logout = true
            resolve(res)
          }
          else {
            res.message = "USER NOT FOUND"
            reject(res)
          }
        }).catch(err => {
          res.message = 'Something went wrong. 1'
          console.log("==============================", err)
          // res.error = err
          console.log(err)
          reject(res)
        })
      } catch (err) {
        res.message = 'Something went wrong. 2'
        // res.error = err
        reject(res)
      }
    })
  },


  /*
  *
  * Services for Get insta toekn and update in db
  * 
  */

  instaToken(userId, token) {
    return new Promise((resolve, reject) => {
      var res = {
        success: false
      }
      try {
        
        /*  */
        axios.get('https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=fd383798355e157a9177f7b5d62b39c7&access_token='+token)
          .then(function (response) {
            // handle success
            console.log(response.data.access_token);
            if(response.data)  {
            Users.update({
              instaToken:response.data.access_token,
              instaTokenCreated: new Date()
            },{
              where: {
                id: userId
              }
            }).then(user => {
              axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token='+response.data.access_token)
                .then(function (responses) {
                  if(responses.data)
                    res.data = responses.data
                      resolve(res)
                })
                .catch(function (error) {
                  // handle error
                  res.error =error
                  reject(res)
                })
            })
          }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })/*  */
      } catch (err) {
        res.message = 'Something went wrong. 2'
        // res.error = err
        reject(res)
      }
    })
  },

  /*
  *
  * Dummy function for compressing old images
  * 
  */
 compressOld () {
  console.log('compress-------------------------------');

    // sequelize.query("SELECT id,imageUrl FROM duplicate_images",{ type: Sequelize.QueryTypes.SELECT}).then(async image => {
    //   for(let file of image) {
    //     var imageFile = 'buildNew/'+file.imageUrl ;
    //     await compressForOld(imageFile).then(test => {
    //       console.log(test,'test-----------------------------------------------')
    //     }).catch( err => console.log(err))
    //     sequelize.query("UPDATE duplicate_images SET status = false WHERE id = "+file.id,{ type: Sequelize.QueryTypes.UPDATE}).then(async chat => {
    //       console.log('DONE-------------------------------');
    //       })
    //   } 
    //   })

    sequelize.query("SELECT COUNT(imageUrl) FROM duplicate_images WHERE status IS false",{ type: Sequelize.QueryTypes.SELECT}).then(async image => {
    
      console.log('image---------count------false----------------------',image);
      })
    

      sequelize.query("SELECT COUNT(imageUrl) FROM duplicate_images WHERE status IS true",{ type: Sequelize.QueryTypes.SELECT}).then(async imageTrue => {
    
        console.log('image---------count------true----------------------',imageTrue);
        })
      console.log('Testinggggggggggggggggg-------------------------------');


    // sequelize.query("SELECT id,imageUrl FROM Images ORDER BY id DESC LIMIT 2",{ type: Sequelize.QueryTypes.SELECT}).then(async image => {
    //   for(let file of image) {
    //     var imageFile = 'buildNew/'+file.imageUrl ;
    //     var actualFile= file.imageUrl;
    //     await compressForOld(imageFile,actualFile).then(test => {
    //       console.log(test)
    //     }).catch( err => console.log(err))

    //   } 
    //   })
      return

   

   
    }
}
