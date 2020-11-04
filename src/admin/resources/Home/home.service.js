const Bcrypt = require("bcryptjs");
var ejs = require("ejs");
const Admin = require('../../../../models').Admins;
const User = require('../../../../models').Users;

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
const tokenRecords = require('../../../../models').tokenRecords
const Subscription = require('../../../../models').Subscriptions


import jwt from '../../../api/helpers/jwt'

import emailService from '../../../email/email.service'
const nodemailer = require('nodemailer');
var jwtDecode = require('jwt-decode');

const Sequelize = require('sequelize')

const Op = Sequelize.Op



function calculateIosUsers() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      Login.count({
        where: {
          deviceType: "IOS"
        }
      }).then(androidall => {

        res.success = true
        res.count = androidall
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

function calculateMaleUsers() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      User.count({
        where: {
          // status: "Active",
          statusByadmin:'Activate',
          isVerified:"Yes"
        },
        include: [{
          model: Peoples,
          as: 'profileOfUser',
          required:true,
          where: {
            gender: 'Male'
          }
        },
        {
          model: Selfies,
          as: 'SelfiesForUser',
          required:true
        }],
        
      }).then(androidall => {
        console.log('=======================androidall',androidall)
        res.success = true
        res.count = androidall
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

function calculateFemaleUsers() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      User.count({
        where: {
          // status: "Active",
          statusByadmin:'Activate',
          isVerified:"Yes"
        },
        include: [{
          model: Peoples,
          as: 'profileOfUser',
          required:true,
          where: {
            gender: 'Female'
          }
        },
        {
          model: Selfies,
          as: 'SelfiesForUser',
          required:true
        }],
        
      }).then(androidall => {

        res.success = true
        res.count = androidall
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

function calculateOtherUsers() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      Peoples.count({
        where: {
          gender: {[Op.or]: [{ [Op.and]: [{ [Op.ne]: "Male" }, { [Op.ne]: "Female" }] },{ [Op.eq]: null }]}
        },
        include:
          {
            model:User,
            as:"profileOfUser",
            required:true,
            where:{
           
            //  status: "Active",
             statusByadmin:"Activate",
              isVerified:"Yes"
            }
          }
      }).then(androidall => {
        console.log("OTHERSSSSSS DATAAAAAAAAAAAAAAAAA", androidall)
        res.success = true
        res.count = androidall
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

function calculateAndroidUsers() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      Login.count({
        where: {
          deviceType: "ANDROID"
        }
      }).then(androidall => {

        res.success = true
        res.count = androidall
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

function calculateTotalUsers() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      Peoples.count({

      }).then(androidall => {

        res.success = true
        res.count = androidall
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

function Matchescount() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      Matches.count({

      }).then(matchcount => {

        console.log("MATCH COUNT IS--------------------------", matchcount)

        res.success = true
        res.count = matchcount
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

function ReportsCount() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      Reports.count({

      }).then(reportcount => {

        res.success = true
        res.count = reportcount
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

function PendingCount() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      User.findAll({
        where: {
          isVerified: "No",
          isRejected: 0,
        },
        include: [{
          model: Peoples,
          as: 'profileOfUser',
          required:true
        },
        {
          model: Selfies,
          as: 'SelfiesForUser',
          required:true

        }
      
      ],
        order: [['profileOfUser', 'name', 'ASC']]
      }).then(reportcount => {
        res.success = true
        res.count = reportcount.length
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

function RejectedCount() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      User.count({
        where: {
          // isVerified: "No",
          isRejected: 1
        },
        include: [{
          model: Peoples,
          as: 'profileOfUser',
          required:true
        },
        {
          model: Selfies,
          as: 'SelfiesForUser',
        }],
      }).then(reportcount => {

        res.success = true
        res.count = reportcount
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

function ActiveCount() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      User.count({
        where: {
          // status: "Active",
          statusByadmin:'Activate',
          isVerified:"Yes"
        },
        include: [{
          model: Peoples,
          as: 'profileOfUser',
          required:true
        },
        {
          model: Selfies,
          as: 'SelfiesForUser',
          required:true
        }],
      }).then(reportcount => {

        res.success = true
        res.count = reportcount
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

function LoginCount() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      Login.count({
      }).then(reportcount => {

        res.success = true
        res.count = reportcount
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

function CrushCount() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      tokenRecords.findAll({
        where: {
          superlikesPurchased: { [Op.ne]: null },
        }
      }).then(crushcount => {

        // console.log("CRUSH COUNT---------------",crushcount)

        var total = 0

        crushcount.forEach(element => {

          console.log("----------------", element.superlikesPurchased)
          total = total + element.superlikesPurchased

        })

        console.log("Totals............", total)

        res.success = true
        res.count = total
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

function TimeTokensCount() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      tokenRecords.findAll({
        where: {
          timeTokensPurchased: { [Op.ne]: null },
        }
      }).then(crushcount => {

        // console.log("CRUSH COUNT---------------",crushcount)

        var total = 0

        crushcount.forEach(element => {

          console.log("----------------", element.timeTokensPurchased)
          total = total + element.timeTokensPurchased

        })

        console.log("Totals............", total)

        res.success = true
        res.count = total
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

function TimeEarnings() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      tokenRecords.findAll({
      }).then(crushcount => {

        // console.log("CRUSH COUNT---------------",crushcount)

        var total = 0

        crushcount.forEach(element => {

          console.log("----------------", element.price)
          total = total + element.price

        })

        console.log("Totals............", total)

        res.success = true
        res.count = total
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

function SubscriptionEarnings() {
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      Subscription.findAll({
      }).then(crushcount => {

        // console.log("CRUSH COUNT---------------",crushcount)

        var total = 0

        crushcount.forEach(element => {

          console.log("----------------", element.price)
          total = total + element.price

        })

        console.log("Totals............", total)

        res.success = true
        res.count = total
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
function Incomplete()
{
  return new Promise((resolve,reject)=>{
   let res = {
     success : false
   }
   try{
   User.findAll({
    include: [{
      model: Peoples,
      as: 'profileOfUser',
      required:true
    },
    {
      model: Selfies,
      as: 'SelfiesForUser'
    }],
     
   }).then(user =>{
     var total = 0;
     for(var element of user)
     {
       if(element.SelfiesForUser == null)
       {
         total = total +1
       }

     }
      res.count = total
      resolve(res)
   }).catch(err =>{
     res.message = "Something went wrong"
     res.error = err
     reject(res)
   })
  }catch(err)
  {
     res.message = "Something went wrong"
     res.error = err
     reject(res)

  }
  })
}
function Loginuser()
{
  return new Promise((resolve,reject) =>{
  let res = {
    success : false
  }
  try{
    User.findAll({
      // where:{
      //  isVerified:"Yes"
      // },
      include:[{
       model:Peoples,
       as:'profileOfUser'
      },
      {
        model:Selfies,
        as:'SelfiesForUser'
      }
      ],
      limit:5,
      order:[ ['createdAt', 'DESC']]

    }).then(active =>{
       res.count = active
       resolve(res)
    }).catch(err => {
      res.message = "Something went wrong",
      res.error = err
      reject(res)
    })
 
  }catch(err)
  {
    res.message = "Something went wrong",
    res.error = err
    reject(res)
  }

  })
}
// function chart()
// {
//   return new Promise((resolve,reject) =>{
//    let res = {
//      success:false
//    }
//    try{
    
//     sequelize.query('select year(createdAt),month(createdAt),count(id)  from Chats   group by year(createdAt),month(createdAt) ',
//      {
//           type: Sequelize.QueryTypes.SELECT
//       }).then(count =>{
//         res.count = count
//         resolve(res)
//         }).catch(err => {
//         res.message = "Something went wrong",
//         res.error = err
//         reject(res)
//        })

//    }catch(err)
//    {
//     res.message = "Something went wrong",
//     res.error = err
//     reject(res)
//    }
//   })
// }

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
function deactivecount()
{
  return new Promise((resolve, reject) => {
    let res = {
      success: false
    }
    try {
      User.count({
        where: {
          // status: "Active",
          statusByadmin:'Deactivate',
          isVerified:"Yes"
        },
        include: [{
          model: Peoples,
          as: 'profileOfUser',
          required:true
        },
        {
          model: Selfies,
          as: 'SelfiesForUser',
          required:true
        }],
      }).then(reportcount => {

        res.success = true
        res.count = reportcount
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
// var chk = generateOtp()
// console.log("Checking otp is.............", chk)

export default {

  async forgetpassword(body) {
    try {
      var chk = generateOtp()
      return await Admin.findOne({
        where: {
          email: body.email
        }
      }).then(async detail => {
        if (detail) {
          await detail.update({ ForgetToken: chk.data })
          let token = jwt.issue({ id: detail.id }, '1d')
          await emailService.sendMail("RESET PASSWORD <otp@blackgentry.com>", chk, 'forgetPassword.ejs', body.email, "BlackGentry Forget Password")
          let response = {
            data: token,
            message: "Check your email.",
            error: false
          }
          return (response);
        } else {
          let response = {
            data: '',
            message: 'Wrong email.',
            error: true
          }
          return (response);
        }
      }).catch(err => {
        let response = {
          data: '',
          message: err.message,
          error: true
        }
        return (response);
      });

    }
    catch (error) {
      let response = {
        data: '',
        message: error.message,
        error: true
      }
      return (response);
    }
  },

  async resetpassword(body, token) {
    try {
      let tokenData = jwtDecode(token)
      return await Admin.findOne({
        where: {
          id: tokenData.id
        }
      }).then(async detail => {
        if (detail) {
          if (detail.ForgetToken == body.otp) {
            return detail.update({ password: body.password, ForgetToken: '' }).then(() => {
              return {
                data: '',
                message: 'Password changed successfully.',
                error: false
              }
            }).catch(err => {
              let response = {
                data: '',
                message: err.message,
                error: true
              }
              return (response);
            })
          } else {
            let response = {
              data: '',
              message: 'Wrong OTP.',
              error: true
            }
            return (response);
          }
        } else {
          let response = {
            data: '',
            message: 'You are using wrong link. Try again.',
            error: true
          }
          return (response);
        }
      }).catch(err => {
        let response = {
          data: '',
          message: err.message,
          error: true
        }
        return (response);
      })
    }
    catch (error) {
      let response = {
        data: '',
        message: error.message,
        error: true
      }
      return (response);
    }
  },
  async changepassword(body, id) {
    try {
      return await Admin.findOne({
        where: {
          id: id
        }
      }).then(async detail => {
        if (detail) {
          if (body.oldpassword != body.password) {
            if (Bcrypt.compareSync(body.oldpassword, detail.password)) {
              return detail.update({ password: body.password }).then(() => {
                let response = {
                  data: "",
                  message: "Password changed successfully.",
                  error: false
                }
                return response;
              })
            } else {
              let response = {
                data: "",
                message: "Incorrect Old Password.",
                error: true
              }
              return response;
            }
          } else {
            let response = {
              data: '',
              message: 'Old password and new password can not be same.',
              error: true
            }
            return (response);
          }
        } else {
          let response = {
            data: '',
            message: 'Something went wrong. Please try again!',
            error: true
          }
          return (response);
        }
      }).catch(err => {
        let response = {
          data: '',
          message: err.message,
          error: true
        }
        return (response);
      })
    }
    catch (error) {
      let response = {
        data: '',
        message: error.message,
        error: true
      }
      return (response);
    }
  },
  async dashboard() {
    try {
      return User.findAll({
        where: { roleId: 2 },
        include: {
          model: Peoples,
          as: 'profileOfUser'
        }
      }).then(async list => {
        return Promise.all([
          ActiveCount(),
          RejectedCount(),
          PendingCount(),
          calculateTotalUsers(),
          calculateIosUsers(),
          calculateAndroidUsers(),
          Matchescount(),
          ReportsCount(),
          calculateMaleUsers(),
          calculateFemaleUsers(),
          calculateOtherUsers(),
          LoginCount(),
          CrushCount(),
          TimeTokensCount(),
          TimeEarnings(),
          SubscriptionEarnings(),
          Incomplete(),
          Loginuser(),
          deactivecount(),
         

        ]).then(values => {
          console.log(values)
          let count_res = {
            list: list,
            active_users_count: values[0].count,
            rejected_count: values[1].count,
            pending_count: values[2].count,
            allusers_count: values[3].count,
            ios_count: values[4].count,
            android_count: values[5].count,
            match_count: values[6].count,
            report_count: values[7].count,
            male_count: values[8].count,
            female_count: values[9].count,
            other_count: values[10].count,
            login_count: values[11].count,
            crush_count: values[12].count,
            time_count: values[13].count,
            time_earnings: Math.round(values[14].count),
            subscription_earnings: Math.round(values[15].count),
            incomplete:values[16].count,
            active_user:values[17].count,
            deactivate_user:values[18].count
            
          }
          let response =  {
            data: count_res,
            message: "",
            error: false
          }
          return response
        })
        .catch(err => console.log(err))
      }).catch(err => console.log(err))
    } catch (error) {
      console.log(error)
      let response = {
        data: '',
        message: error.message,
        error: true
      }
      return Promise.resolve(response);
    }
  },
  async login(data) {
    console.log("INSIDE THE SERVICE PAGEEEEEEE")
    try {
      var usersdetail = await Admin.findOne({
        where: {
          email: data.email
        }
      }).then(detail => {
        if (detail)
          return detail.get();
      }).catch(err => {
        console.log(err);
        return false;
      });
      if (usersdetail && Bcrypt.compareSync(data.password, usersdetail.password)) {
        let response = {
          data: usersdetail,
          message: "Successfully Login",
          error: false
        }
        return response;
      } else {
        let response = {
          data: "",
          message: "Incorrect Email or Password.",
          error: true
        }
        return response;
      }
    }
    catch (error) {
      let response = {
        data: '',
        message: error.message,
        error: true
      }
      return Promise.resolve(response);
    }
  },
  async register(data) {
    try {
      var usersdetail = await User.findOne({
        where: {
          email: data.email
        }
      }).then(detail => {
        if (detail)
          return detail.get();
      }).catch(err => {
        console.log(err);
        return false;
      });

      if (usersdetail && Bcrypt.compareSync(data.password, usersdetail.password)) {
        let response = {
          data: usersdetail,
          message: "Successfully Login",
          error: false
        }
        return response;
      } else {
        let response = {
          data: "",
          message: "Incorrect Email or Password.",
          error: true
        }
        return response;
      }
    }
    catch (error) {
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
      var userList = await User.findOne({
        attributes: ['id', 'email', 'PhoneNo', 'status'],
        where: { 'id': id },
        include: [{
          model: Consumer,
          as: 'users',
          attributes: ['firstName', 'lastName', 'dob', 'gender'],
          required: true,
        }],
      }).then(list => {
        if (list)
          return list;
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
      var adminList = await User.findOne({
        attributes: ['id'],
        where: { 'role': 'Admin' },
      }).then(list => {
        if (list)
          return list;
      })
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
      await User.update({ PhoneNo: data.PhoneNo }, { where: { 'id': adminList.id } }).then(users => {
        if (users)
          return users;
      }).catch(err => {
        let response = {
          data: '',
          message: err,
          error: true
        }
        return Promise.resolve(response);
      });
      await Consumer.update({ firstName: data.firstName, lastName: data.lastName, dob: data.dob, gender: data.gender }, { where: { 'userId': adminList.id } }).then(consumers => {
        if (consumers)
          return consumers;
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
  async verifyPassword(data, id) {
    try {
      return new Promise(function (resolve, reject) {
        User.findOne({
          where: {
            email: data.email,
            role: 'Admin'
          }
        }).then(async detail => {
          if (detail && Bcrypt.compare(data.old_password, detail.password)) {
            let tokenData = { id: id };
            var userToken = await jwt.issue(tokenData, '6h');
            let link = `${process.env.BASEURL}` + 'resetPassword/' + userToken;
            ejs.renderFile(__dirname + "/EmailTemplate/resetPassword.ejs", { link: link }, function (err, data) {
              if (err) {
                console.log(err);
              } else {
                var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'abcdef9689@gmail.com', // generated ethereal user
                    pass: 'qiasefsfhsqsyhwq' // generated ethereal password
                  }
                });
                var mailOptions = {
                  from: 'abcdef9689@gmail.com', // sender address
                  to: detail.email, // list of receivers
                  subject: 'Reset Password', // Subject line
                  html: data // html body
                };
                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    return console.log(error, 'error');
                  } else {
                    console.log('Message sent: ' + info.response);
                    let response = {
                      message: 'Email Sent Successfully! Please check your inbox.',
                      error: false
                    }
                    return resolve(response);
                  }
                });
              }
            });
          } else {
            let response = {
              data: "",
              message: "Incorrect Email or Password.",
              error: true
            }
            return reject(response);
          }
        }).catch(err => {
          console.log(err);
          return false;
        });
      })
    } catch (error) {
      let response = {
        data: '',
        message: error.message,
        error: true
      }
      return Promise.reject(response);
    }
  },
  async getResetPassword(token) {
    try {
      var decoded = jwtDecode(token);
      var tokens = await User.findOne({ where: { id: decoded.id } }).then(verifytoken => {
        if (verifytoken) {
          return verifytoken;
        }
      });
      let userInfo = {
        message: "Token is correct.",
        error: false
      }
      return userInfo;
    } catch (err) {
      let response = {
        message: err.message,
        error: true
      }
      return response;
    }
  },
  async updateResetPassword(token, cPassword) {
    try {
      return new Promise(function (resolve, reject) {
        var decoded = jwtDecode(token);
        User.findOne({ where: { id: decoded.id } }).then(verifytoken => {
          if (verifytoken) {
            verifytoken.update({ password: cPassword }).then(function () {
              return verifytoken;
            })
            let response = {
              message: "Password is updated successfully.",
              error: false,
              authorized: true
            }
            return resolve(response);
          } else {
            var message = "You are not allowed to access this link.";
            let response = {
              message: message,
              error: true,
              authorized: false
            }
            return resolve(response);
          }
        });
      })
    } catch (err) {
      let response = {
        message: err.message,
        error: true
      }
      return Promise.resolve(response);
    }
  },
};
