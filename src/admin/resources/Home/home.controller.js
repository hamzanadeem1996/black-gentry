import homeService from '../Home/home.service';
import homeValidation from '../Home/home.validation';

export default {

  // async dashboard(req, res) {
  //   res.render('dashboard/index');
  // },

  async dashboard(req, res) {
    try {
      console.log("INSIDE THE HOME CONTROLLERRRRRRRRRRRRRRRRR")
      homeService.dashboard().then(r => {
        // console.log("Users Data-------------------------",r.data[0].dataValues)
        // console.log("Peoples Data -------------------------",r.data[0].dataValues.profileOfUser.dataValues)
        var message = req.flash('message')
        if (r.error == false) {
          if (message[0]) {
            message = message[0]
            res.render('dashboard/index', {
              message: message, list: r.data
            });
          } else {
            res.render('dashboard/index', {
              message: r.message, list: r.data
            });
          }
        } else {
          res.render('dashboard/index', {
            message: r.message, list: r.data
          });
        }
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  async index(req, res) {
    res.render('pages/home/login', { message: '' });
  },

  async getforgetpassword(req, res) {
    res.render('pages/home/forget', { message: '' });
  },

  async forgetpassword(req, res) {
    try {
      const validates = await homeValidation.validateforget(req.body);
      console.log('.........',validates)
      if (validates.error == true && validates.message != '') {
        res.render('pages/home/forget', { message: validates.message });
      } else {
        
        let response = await homeService.forgetpassword(req.body)
        //console.log('response......',response)
        if(response.error == false) 
          // console.log('response......',response)
          res.redirect('/admin/resetpassword/'+ response.data);
        else 
          res.render('pages/home/forget', { message: response.message });
      }
    } catch (err) {
      return res.status(500).send(err);
    } 
  },

  async getresetpassword(req, res) {
    res.render('pages/home/reset', { message: '', token : req.params.token, error: {} });
  },

  async resetpassword(req, res) {
    try {
      const validates = await homeValidation.validatereset(req.body);
      if (validates.error == true) {
        res.render('pages/home/reset', {error : validates, message: '', token : req.params.token});
      } else {
        if(req.body.password == req.body.confirmpswrd) {
          let response = await homeService.resetpassword(req.body,req.params.token)
          console.log('response......',response)
          if(response.error == false) {
            let message = {}
            message.code = 200;
            message.desc = 'Password changed successfully!'
            req.flash('message', message);
            res.redirect('/admin/login/');
          } else 
            res.render('pages/home/reset', { message: response.message, token : req.params.token, error: {}  });
        } else {
          res.render('pages/home/reset', { message: 'Password and Confirm password should be same.', token : req.params.token, error: {}  });
        }
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },


  async getchangepassword(req, res) {
    res.render('pages/home/changepassword', { message: '',success:'', error: {} });
  },

  async changepassword(req, res) {
    try {
      const validates = await homeValidation.validatechange(req.body);
      if (validates.error == true) {
        res.render('pages/home/changepassword', {error : validates, success: '', message: ''});
      } else {
        if(req.body.password == req.body.confirmpswrd) {
            let response = await homeService.changepassword(req.body,req.session.data.id)
            
            if(response.error == false) {  
              res.render('pages/home/changepassword', { message: '', success: 'Password updated successfully.', error: {}  });
            }
            else 
              res.render('pages/home/changepassword', { message: response.message, success: '', error: {}  });
        } else {
          res.render('pages/home/changepassword', { message: 'Password and Confirm password should be same.', success: '', error: {}  });
        }
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },



  async login(req, res) {
    try {
      console.log("INSIDE THE LOGIN---------------------->>>>>>>>>", req.body)
      const validates = await homeValidation.validateLogin(req.body);
      if (validates.error == true && validates.message != '') {
        res.render('pages/home/login', { message: validates.message });
      } else {
        homeService.login(req.body).then(r => {
          if (r.error == false) {
            req.session.email = r.data.email;
            req.session.password = r.data.password;
            req.session.data = r.data;
            req.session.success = true;
            res.redirect('/admin/dashboard');
          } else {
            req.session.success = false;
            res.render('pages/home/login', { message: r.message });
          }
        });
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return console.log(err);
        }
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.redirect('back');
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  async getregister(req, res) {
    res.render('pages/home/register', { message: '' });
  },
  async register(req, res) {
    console.log("INSIDE THE REGISTER CONTROLLER")
    try {
      const validates = await homeValidation.validateRegister(req.body);
      if (validates.error == true && validates.message != '') {
        res.render('pages/home/register', { message: validates.message });
      } else {
        homeService.register(req.body).then(r => {
          if (r.error == false) {
            req.session.email = r.data.email;
            req.session.password = r.data.password;
            req.session.data = r.data;
            req.session.success = true;
            res.redirect('/admin/dashboard');
          } else {
            req.session.success = false;
            res.render('pages/home/register', { message: r.message });
          }
        });
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
}