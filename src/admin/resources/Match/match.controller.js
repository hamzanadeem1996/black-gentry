import matchService from '../Match/match.service';
import matchValidation from '../Match/match.validation';
var moment = require('moment');



export default {

    // To list all users
    async index(req, res) {
        try {
            matchService.list().then(r => {
                console.log(r.data,'data================================');
                var message = req.flash('message')
                if (r.error == false) {
                    if (message[0]) {
                        message = message[0]
                        res.render('pages/matches/allmatcheslist', {
                            message: message, list: r.data,moment:moment
                        });
                    } else {
                        res.render('pages/matches/allmatcheslist', {
                            message: r.message, list: r.data,moment:moment
                        });
                    }
                } else {
                    res.render('pages/matches/allmatcheslist', {
                        message: r.message, list: r.data,moment:moment
                    });
                }
            });
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    // To list all scheduled calls
    async callList(req, res) {
        try {
            matchService.callList().then(r => {
                var message = req.flash('message')
                if (r.error == false) {
                    if (message[0]) {
                        message = message[0]
                        res.render('pages/matches/allcallrequestlist', {
                            message: message, list: r.data
                        });
                    } else {
                        res.render('pages/matches/allcallrequestlist', {
                            message: r.message, list: r.data
                        });
                    }
                } else {
                    res.render('pages/matches/allcallrequestlist', {
                        message: r.message, list: r.data
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
            
            matchService.edit(id).then(viewer => {
                console.log("--------->>>>>>>>>>>>>>>>>>",viewer)
                res.render('pages/matches/viewMatch', {
                    message: '', 
                    list: viewer
                });
            }).catch(err => {
                console.log("ERROR FROM CONTROLLER ---------------",err)
            });
        } catch (err) {
            return res.status(500).send(err);
        }
    },

}