import userService from '../User/user.service';
import userValidation from '../User/user.validation';
var moment = require('moment');


export default {

  // To list all users
  async index(req, res) {
    try {
      userService.list().then(r => {
        // console.log("users DAta -------------------------",r.data[1].SelfiesForUser)
        // console.log("Users Data-------------------------",r.data[0].dataValues)
        // console.log("Peoples Data -------------------------",r.data[0].dataValues.profileOfUser.dataValues)
        var message = req.flash('message')
        if (r.error == false) {
          if (message[0]) {
            message = message[0]
            res.render('pages/users/alluserslist', {
              message: message, list: r.data,moment:moment
            });
          } else {
            res.render('pages/users/alluserslist', {
              message: r.message, list: r.data,moment:moment
            });
          }
        } else {
          res.render('pages/users/alluserslist', {
            message: r.message, list: r.data,moment:moment
          });
        }
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  // To list all IOS users
  async iosList(req, res) {
    try {
      userService.iosList().then(r => {
        // console.log("Users Data-------------------------",r.data[0].dataValues)
        // console.log("Peoples Data -------------------------",r.data[0].dataValues.profileOfUser.dataValues)
        var message = req.flash('message')
        if (r.error == false) {
          if (message[0]) {
            message = message[0]
            res.render('pages/users/iosuserslist', {
              message: message, list: r.data,moment:moment
            });
          } else {
            res.render('pages/users/iosuserslist', {
              message: r.message, list: r.data,moment:moment
            });
          }
        } else {
          res.render('pages/users/iosuserslist', {
            message: r.message, list: r.data,moment:moment
          });
        }
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  //To list all Android  users
  async androidList(req, res) {
    try {
      userService.androidList().then(r => {
        // console.log("Users Data-------------------------",r.data[0].dataValues)
        // console.log("Peoples Data -------------------------",r.data[0].dataValues.profileOfUser.dataValues)
        var message = req.flash('message')
        if (r.error == false) {
          if (message[0]) {
            message = message[0]
            res.render('pages/users/androiduserslist', {
              message: message, list: r.data,moment:moment
            });
          } else {
            res.render('pages/users/androiduserslist', {
              message: r.message, list: r.data,moment:moment
            });
          }
        } else {
          res.render('pages/users/androiduserslist', {
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
      var value = "Deactivate";
      var message = {};
      await userService.changeActiveStatus(id, value).then(r => {
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
      var value = "Activate";
      var message = {};
      await userService.changeInActiveStatus(id, value).then(r => {
        message.code = 200;
        message.desc = 'User is Activated successfully!'
        req.flash('message', message);
        res.redirect('/admin/users/list');
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  async DeleteStatus(req, res) {
    try {
      console.log("INSIDE THE DELETE CONTROLLERRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
      var id = req.params.id;
      var message = {};
      await userService.DeleteStatus(id).then(r => {
        console.log("HANDLING RETURN IN COTROLLER............", r)
        res.redirect('/admin/users/list');
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  async edit(req, res) {
    try {
      var id = req.params.id;
      userService.edit(id).then(r => {
        res.render('pages/user/edit', {
          message: '', email: req.session.data.email, data: r.data
        });
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  async update(req, res) {
    try {
      console.log('body........', req.body)
      const validates = await userValidation.validateUser(req.body);
      var message = {};
      var id = req.params.id;
      if (validates.error == true) {
        userService.edit(id).then(edit => {
          if (edit.error == false) {
            res.render('pages/user/edit', {
              message: validates.message, data: req.body
            });
          } else {
            res.render('pages/user/edit', {
              message: edit.message, email: req.session.edit.email
            });
          }
        });
      } else {
        var data = {
          id: req.params.id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dob: req.body.dob,
          gender: req.body.gender,
          PhoneNo: req.body.PhoneNo
        }
        userService.update(data).then(r => {
          console.log('res,,,,,,,,', r)
          if (r.error == false) {
            message.code = 200;
            message.desc = 'User details are Updated successfully!'
            req.flash('message', message);
            res.redirect('/admin/users/list');
          } else if (r.error == true) {
            userService.edit(id).then(r => {
              res.render('pages/user/edit', {
                message: r.message, data: req.body, email: req.session.data.email
              });
            });
          } else {
            message.code = 400;
            message.desc = 'Opps! Something went wrong. Please try again.'
            req.flash('message', message);
            res.redirect('/admin/users/list');
          }
        });
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  //To view the user record in Detail
  async view(req, res) {
    try {
      const id = req.params.id;
      console.log("ID ISSSSSSSSSSSSSSSSSSSSSSS-----------------", id)
      userService.edit(id).then(r => {
        res.render('pages/users/view', {
          message: '', data: r.data
        });
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  //Controller for sending Message
  async getmessage(req, res) {
    try {
      var message = {};
      var id = req.params.id;

      userService.getmessage(id).then(r => {
        res.render('pages/users/messageview', {
          message: '', data: r.data
        });
      });

    }
    catch (err) {
      return res.status(500).send(err);
    }
  },

  async sendmessage(req, res) {
    try {
      const mess = req.body.custommessage

        userService.sendmessage(req.params.id,mess).then(r => {

          res.redirect('/admin/users/list');

        });
      
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  async viewChatUsers(req, res) {
    try {
      var id = req.params.id;
        userService.viewChatUsers(id).then(r => {
          if(r.data != ''){
            var getChatUserId = r.data[0].id;
            userService.viewChatMessages(id,getChatUserId).then(getDetails => {
              res.render('pages/users/viewChat', {
                message: '',id: id, data: r.data, chatDetail : getDetails.data, otherChatdetail : '',image: r.image,
                chatWithUserImage : getDetails.chatWithUserImage, nameChatUser : getDetails.nameChatUser,reports: '',
                getChatUserId: getChatUserId,chatId : ''
              });
            });
          } else {
            res.render('pages/users/viewChat', {
              message: '',id: id, data: r.data,chatDetail : '', otherChatdetail : '',image: r.image, chatWithUserImage : '',
              nameChatUser : '',reports: '',getChatUserId:'',chatId : ''
            });
          }
        });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  async viewChatMessages(req, res) {
    try {
      var chatId = req.params.id;
      var id = req.params.chatId;
         userService.viewChatMessages(id,chatId).then(r => {
          userService.viewChatUsers(id).then(chatList => {
            res.render('pages/users/viewChat', {
              message: '',id: id, data: chatList.data, chatDetail : '', otherChatdetail : r.data,image: chatList.image,
              chatWithUserImage : r.chatWithUserImage,nameChatUser : r.nameChatUser,reports: '',getChatUserId:'',chatId : ''
            });
        });
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  async viewReportChatMessages(req, res) {
    try {
      var chatId = req.params.id;
      var id = req.params.chatId;
         userService.viewChatMessages(id,chatId).then(r => {
          userService.viewChatUsers(id).then(chatList => {  
            res.render('pages/users/viewChat', {
              message: '',id: id, data: chatList.data, chatDetail : '', otherChatdetail : r.data,image: chatList.image,
              chatWithUserImage : r.chatWithUserImage,nameChatUser : r.nameChatUser,reports: '1',chatId : chatId,getChatUserId:''
            });
        });
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
}