const Users = require('../../../../models').Users
const Peoples = require('../../../../models').Peoples
const Images = require('../../../../models').Images
const Answers = require('../../../../models').Answers

const Sequelize = require('sequelize')
const Op = Sequelize.Op


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
  async getAll(userId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        await Peoples.findOne({
          attributes: ['longitude', 'latitude', 'visible', 'maxAgePrefer', 'minAgePrefer', 'distance', 'chatNotify', 'matchNotify', 'expiredMatches', 'matchUpdates'],
          where: {
            userId: userId
          }
        }).then(settings => {
          if (settings) {
            res.success = true
            res.settings = settings
            res.message = "Settings listed successfully."
            resolve(res)
          } else {
            res.message = 'Settings not found'
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
  * Service for get matches details
  * 
  * return data
  * 
  */
  async update(body, userId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        await Peoples.findOne({
          attributes: ['id', 'longitude', 'latitude', 'visible', 'maxAgePrefer', 'minAgePrefer', 'distance', 'expiredMatches', 'matchNotify', 'chatNotify', 'matchUpdates'],
          where: {
            userId: userId
          }
        }).then(settings => {
          console.log("-------------",settings)
          if (settings) {
            Peoples.update({
              visible: body.visible,
              maxAgePrefer: body.maxAgePrefer,
              minAgePrefer: body.minAgePrefer,
              distance: body.distance,
              chatNotify: body.chatNotify,
              matchNotify: body.matchNotify,
              expiredMatches: body.expiredMatches,
              matchUpdates: body.matchUpdates,
            }, {
              where: {
                userId: userId
              }
            }).then(settings => {

              Peoples.findOne({
                where: {
                  userId: userId
                },
                attributes: ['visible','maxAgePrefer', 'minAgePrefer', 'distance', 'chatNotify', 'matchNotify', 'expiredMatches', 'matchUpdates']
              }).then(peoplechk => {
                res.success = true
                res.settings = peoplechk
                res.message = "Settings listed successfully."
                resolve(res)
              })

            }).catch(err => {
              console.log('errr.........', err)
              res.message = 'Something went wrong.'
              res.error = err
              res.success = false
              reject(res)
            })
          } else {
            res.message = 'Settings not found'
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
* Service for get matches details
* 
* return data
* 
*/
  async getSuperLikes(body, userId) {
    return new Promise(async (resolve, reject) => {
      var res = {
        success: false
      }
      try {
        await Peoples.findOne({
          attributes: ['id', 'superLikesCount'],
          where: {
            userId: userId
          }
        }).then(settings => {
          if (settings) {
            body.superLikesCount = settings.superLikesCount + body.superLikesCount
            settings.update(body).then(settings => {
              /*************************Payment code*******************************/
              res.success = true
              res.settings = settings
              res.message = "Super likes token added successfully."
              resolve(res)
            }).catch(err => {
              console.log('errr.........', err)
              res.message = 'Something went wrong.'
              res.error = err
              res.success = false
              reject(res)
            })
          } else {
            res.message = 'Settings not found'
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
}
