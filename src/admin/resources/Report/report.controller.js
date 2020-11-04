import reportService from '../Report/report.service';
import reportValidation from '../Report/report.validation';
var moment = require('moment');


export default {

    // To list all users
    async index(req, res) {
        try {
            reportService.list().then(r => {
                // console.log("Data------------------>>>>>>>>>>>>",r.data)
                var message = req.flash('message')
                if (r.error == false) {
                    if (message[0]) {
                        message = message[0]
                        res.render('pages/reports/allcomplaints', {
                            message: message, list: r.data,moment:moment
                        });
                    } else {
                        res.render('pages/reports/allcomplaints', {
                            message: r.message, list: r.data,moment:moment
                        });
                    }
                } else {
                    res.render('pages/reports/allcomplaints', {
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
          var message = {};
          await reportService.changeActiveStatus(id).then(r => {
            message.code = 200;
            message.desc = 'User is De-Activated successfully!'
            req.flash('message', message);
            res.redirect('/admin/complaints/list');
          });
        } catch (err) {
          return res.status(500).send(err);
        }
      },
      async ActiveStatus(req, res) {
        try {
          var id = req.params.id;
          var message = {};
          await reportService.ActiveStatus(id).then(r => {
            message.code = 200;
            message.desc = 'User is Activated successfully!'
            req.flash('message', message);
            res.redirect('/admin/complaints/list');
          });
        } catch (err) {
          return res.status(500).send(err);
        }
      },
      async DeactivateStatus(req, res) {
        try {
          var id = req.params.id;
          var message = {};
          await reportService.DeactivateStatus(id).then(r => {
            message.code = 200;
            message.desc = 'User is De-Activated successfully!'
            req.flash('message', message);
            res.redirect('/admin/complaints/list');
          });
        } catch (err) {
          return res.status(500).send(err);
        }
      },
}