import tokenService from '../Tokens/token.service';
import tokenValidation from '../Tokens/token.validation';
var moment = require('moment');


export default {

  // To list all users
  async index(req, res) {
    try {
      tokenService.list().then(r => {
        // console.log("Users Data-------------------------",r.data[0].dataValues)
        // console.log("Peoples Data -------------------------",r.data[0].dataValues.profileOfUser.dataValues)
        var message = req.flash('message')
        if (r.error == false) {
          if (message[0]) {
            message = message[0]
            res.render('pages/tokens/alluserslist', {
              message: message, list: r.data,moment:moment
            });
          } else {
            res.render('pages/tokens/alluserslist', {
              message: r.message, list: r.data,moment:moment
            });
          }
        } else {
          res.render('pages/tokens/alluserslist', {
            message: r.message, list: r.data,moment:moment
          });
        }
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  //To view the user record in Detail
  async view(req, res) {
    try {
      const id = req.params.id;
      console.log("ID ISSSSSSSSSSSSSSSSSSSSSSS-----------------", id)
      tokenService.edit(id).then(r => {
        res.render('pages/tokens/view', {
          message: '', data: r.data
        });
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

}