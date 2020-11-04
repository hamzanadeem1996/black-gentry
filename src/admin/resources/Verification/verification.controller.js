import verificationService from '../Verification/verification.service';
import verificationValidation from '../Verification/verification.validation';
var moment = require('moment');


export default {

  // To list all users
  async index(req, res) {
    try {
      verificationService.list().then(r => {
        // console.log("Users Data-------------------------",r.data[0].dataValues)
        // console.log("Peoples Data -------------------------",r.data[0].dataValues.profileOfUser.dataValues)
        var message = req.flash('message')
        if (r.error == false) {
          if (message[0]) {
            message = message[0]
            res.render('pages/verifications/verifyuserslist', {
              message: message, list: r.data,moment:moment
            });
          } else {
            res.render('pages/verifications/verifyuserslist', {
              message: r.message, list: r.data,moment:moment
            });
          }
        } else {
          res.render('pages/verifications/verifyuserslist', {
            message: r.message, list: r.data,moment:moment
          });
        }
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  //To List of rejected Users
  async rejectlist(req, res) {
    try {
      console.log("INSIDE THE REJECTION CONTROLLER----!")
      verificationService.rejectlist().then(r => {
        // console.log("Users Data-------------------------",r.data[0].dataValues)
        // console.log("Peoples Data -------------------------",r.data[0].dataValues.profileOfUser.dataValues)
        var message = req.flash('message')
        if (r.error == false) {
          if (message[0]) {
            message = message[0]
            res.render('pages/verifications/rejectuserlist', {
              message: message, list: r.data,moment:moment
            });
          } else {
            res.render('pages/verifications/rejectuserlist', {
              message: r.message, list: r.data,moment:moment
            });
          }
        } else {
          res.render('pages/verifications/rejectuserlist', {
            message: r.message, list: r.data,moment:moment
          });
        }
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  
  async changeActiveStatus(req, res) {
    try {
      var id = req.params.id;
      var value = "Deactive";
      var message = {};
      await verificationService.changeActiveStatus(id, value).then(r => {
        message.code = 200;
        message.desc = 'User is De-Activated successfully!'
        req.flash('message', message);
        res.redirect('/admin/users/list');
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  async changeInActiveStatus(req, res) {
    try {
      var id = req.params.id;
      var value = "Active";
      var message = {};
      await verificationService.changeInActiveStatus(id, value).then(r => {
        message.code = 200;
        message.desc = 'User is Activated successfully!'
        req.flash('message', message);
        res.redirect('/admin/users/list');
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  async changeVerifyStatus(req, res) { console.log("INSIDE THE VERIFICATION CONTROLLER------------>>>>>>>")
    try {
      var id = req.params.id;
      var value = "Yes";
      var message = {};
      await verificationService.changeVerifyStatus(id, value).then(r => {
        message.code = 200;
        message.desc = 'User is verified successfully !'
        req.flash('message', message);
        res.redirect('/admin/verifications/list');
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  async changeDenyStatus(req, res) { console.log("INSIDE THE DENY CONTROLLER------------>>>>>>>")
    try {
      var id = req.params.id;
      var value = "No";
      var message = {};
      await verificationService.changeDenyStatus(id, value).then(r => {
        message.code = 200;
        message.desc = 'User is verified successfully !'
        req.flash('message', message);
        res.redirect('/admin/verifications/list');
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  
  //To view the user record in Detail
  async view(req, res) {
    try {
      const id = req.params.id;
      console.log("ID ISSSSSSSSSSSSSSSSSSSSSSS-----------------",id)
      verificationService.edit(id).then(r => {
        res.render('pages/verifications/view', {
          message: '', data: r.data
        });
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // async userdelete(req, res) {
  //   try {
  //     const id = req.params.id;

  //     console.log("INSIDE THE REJECTION CONTROLLER----!")
  //     verificationService.userdelete(id).then(r => {
  //       // console.log("Users Data-------------------------",r.data[0].dataValues)
  //       // console.log("Peoples Data -------------------------",r.data[0].dataValues.profileOfUser.dataValues)
  //       var message = req.flash('message')
  //       if (r.error == false) {
  //         if (message[0]) {
  //           message = message[0]
  //           res.render('pages/verifications/rejectuserlist', {
  //             message: message, list: r.data,moment:moment
  //           });
  //         } else {
  //           res.render('pages/verifications/rejectuserlist', {
  //             message: r.message, list: r.data,moment:moment
  //           });
  //         }
  //       } else {
  //         res.render('pages/verifications/rejectuserlist', {
  //           message: r.message, list: r.data,moment:moment
  //         });
  //       }
  //     });
  //   } catch (err) {
  //     return res.status(500).send(err);
  //   }
  // },
  async DeleteStatus(req, res) {
    try {
      console.log("INSIDE THE DELETE CONTROLLERRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
      var id = req.params.id;
      // var message = {};
      await verificationService.DeleteStatus(id).then(r => {
        console.log("HANDLING RETURN IN COTROLLER............", r)
        // res.render('pages/verifications/rejectuserlist'
        
     res.redirect('/admin/verifications/rejectlist');
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
}