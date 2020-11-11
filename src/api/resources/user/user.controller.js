import userValidation from './user.validation'
import userService from './user.service'
var HttpStatus = require('http-status-codes')
const requestIp = require('request-ip')
var multer = require('multer')
var path = require('path')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
var upload = multer({ storage: storage }).array('profilePic', 6);



export default {

    
    /**
     *  
     * ****** Replace IMAGES  Aceepts Image id, order id and image to be replaced 
     * 
     **/

    async replaceImages(req, res) {
        try {

            upload(req, res, async function (err) {
                if (err) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err)
                } else {
                    // console.log("==========================",req.body.id)
                    await userService.replaceImages(req.user.id, req.files ,req.body.id).then(response => {
                        return res.status(HttpStatus.OK).send(response)
                    }).catch(error => {
                        if (error.error) {
                            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                        } else if (error.code) {
                            return res.status(HttpStatus.BAD_REQUEST).send(error)
                        } else {
                            return res.status(HttpStatus.NOT_FOUND).send(error)
                        }
                    })
                }
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    },




    /**
     *  
     * ****** UPLOAD IMAGES  Max. = 6 Min. =3  
     * 
     **/

    async uploadImages(req, res) {
        try {
            upload(req, res, async function (err) {
                if (err) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err)
                } else {
                    await userService.uploadImages(req.user.id, req.files).then(response => {
                        return res.status(HttpStatus.OK).send(response)
                    }).catch(error => {
                        console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii error',error);
                        if (error.error) {
                            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                        } else if (error.code) {
                            return res.status(HttpStatus.BAD_REQUEST).send(error)
                        } else {
                            return res.status(HttpStatus.NOT_FOUND).send(error)
                        }
                    })
                }
            })
        } catch (err) {
            console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii err',err);
            return res.status(500).send(err)
        }
    },

    /**
     *  
     * ****** UPLOAD Selfies=  
     * 
     **/

    async selfies(req, res) {
        try {
            upload(req, res, async function (err) {
                if (err) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err)
                } else {
                    await userService.selfies(req.user.id, req.files).then(response => {
                        return res.status(HttpStatus.OK).send(response)
                    }).catch(error => {
                        if (error.error) {
                            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                        } else if (error.code) {
                            return res.status(HttpStatus.BAD_REQUEST).send(error)
                        } else {
                            return res.status(HttpStatus.NOT_FOUND).send(error)
                        }
                    })
                }
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    /*
    *
    * Api for User login
    * Params: [email] 
    * send otp after filling the mail
    * 
    */

    async login(req, res) {
        try {
            const validates = await userValidation.validateLogin(req.body)
            if (validates.error == true) {                   /// if validations failed
                return res.status(400).json(validates).end()
            }
            await userService.login(validates).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    async sendEmailOtp(req, res) {
        try {
            const validates = await userValidation.validateSendEmailOtp(req.body)
            if (validates.error == true) {
                return res.status(400).json(validates).end()
            }
            await userService.sendOtpToEmail(validates).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    async sendPhoneOtp(req, res) {
        try {
            const validates = await userValidation.validatePhoneOtp(req.body)
            if (validates.error == true) {
                return res.status(400).json(validates).end()
            }
            await userService.sendOtpToPhoneNumber(validates).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    // New 

    async appleLogin(req, res) {
        try {
            const validates = await userValidation.validateAppleLogin(req.body)
            if (validates.error == true) {                   /// if validations failed
                return res.status(400).json(validates).end()
            }
            await userService.appleLogin(validates).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    //end 

    /*
    **
    ** Api for linkedin Login
    **
    */

    async linkedin(req, res){
        try {
            const validates = await userValidation.validateLinkedin(req.body)
            if (validates.error == true) {                   /// if validations failed
                return res.status(400).json(validates).end()
            }
            await userService.linkedin(validates).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    /*
    **
    ** Api for Updating Latitudes and Longitudes
    **
    */

    async latlong(req, res) {
        try {
            const validates = await userValidation.validateLatLong(req.body)
            if (validates.error == true) {                   /// if validations failed
                return res.status(400).json(validates).end()
            }

            req.body.ipAddress = requestIp.getClientIp(req)
            await userService.latlong(req.body, req.user.id).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    /****
     ** 
     ** Api for Verifying Otp
     **
     ***** */

    async verifyOtp(req, res) {
        try {
            
            const validates = await userValidation.validateVerifyOtp(req.body)
            if (validates.error == true) {                   /// if validations failed
                return res.status(400).json(validates).end()
            }
            await userService.verifyOtp(req.body).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                console.log("Inside the verify controllereeeeeeeee 1",error);
                if (error.error) {
                    console.log("Inside the verify controllereeeeeeeee 2");
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    console.log("Inside the verify controllereeeeeeeee 3");
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    console.log("Inside the verify controllereeeeeeeee 4",error);
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })

        } catch (err) {
            return res.status(500).send(err)
        }
    },

    async resendPhoneOtp(req, res) {
        try {
            
            const validates = await userValidation.validatePhoneOtp(req.body)
            if (validates.error == true) {
                return res.status(400).json(validates).end()
            }
            await userService.resendPhoneOtp(req.body).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                console.log("Inside the verify controllereeeeeeeee 1",error);
                if (error.error) {
                    console.log("Inside the verify controllereeeeeeeee 2");
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    console.log("Inside the verify controllereeeeeeeee 3");
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    console.log("Inside the verify controllereeeeeeeee 4",error);
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })

        } catch (err) {
            return res.status(500).send(err)
        }
    },

    async updateAddress(req, res) {
        try {
            const validates = await userValidation.validateUpdateAddress(req.body)
            if (validates.error == true) {
                return res.status(400).json(validates).end()
            }
            await userService.updateUserAddress(req.body).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                console.log("Inside the verify controllereeeeeeeee 1",error);
                if (error.error) {
                    console.log("Inside the verify controllereeeeeeeee 2");
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    console.log("Inside the verify controllereeeeeeeee 3");
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    console.log("Inside the verify controllereeeeeeeee 4",error);
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })

        } catch (err) {
            return res.status(500).send(err)
        }
    },

    async verifyPhoneOtp(req, res) {
        try {
            
            const validates = await userValidation.validateVerifyOtpPhone(req.body)
            if (validates.error == true) {
                return res.status(400).json(validates).end()
            }
            await userService.verifyPhoneOtp(req.body).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                console.log("Inside the verify controllereeeeeeeee 1",error);
                if (error.error) {
                    console.log("Inside the verify controllereeeeeeeee 2");
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    console.log("Inside the verify controllereeeeeeeee 3");
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    console.log("Inside the verify controllereeeeeeeee 4",error);
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })

        } catch (err) {
            return res.status(500).send(err)
        }
    },

    async resendOtp(req, res) {
        try {
            await userService.resendOtp(req.body).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })

        } catch (err) {
            return res.status(500).send(err)
        }
    },

    /*
    *
    * Api for get Roles
    * return roles
    * 
    */

    async roles(req, res) {
        try {
            await userService.roles().then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
    },


    /*
    *
    * Api for updateProfile
    * Params: [firstName,lastName, phone, address1, address2, city, state, zip] 
    * return user data
    * 
    */

    async updateProfile(req, res) {
        try {
            console.log('update==================================', req.body)

            var obj = req.body

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var val = obj[key];

                    if(val == "")
                    {
                        obj[key] = null
                    }

                }
                }   
            
            const validates = await userValidation.validateUpdateProfile(req.body)

            if (validates.error == true) {
                return res.status(HttpStatus.BAD_REQUEST).json(validates).end()
            }
            req.body.ipAddress = requestIp.getClientIp(req)
            await userService.updateProfile(req.body, req.user.id).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                }
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
    },

    /*
    *
    * Api for Profile
    * return user data
    * 
    */

    async profile(req, res) {
        try {
            // console.log(req.user,'ghfffffffffffffffffffffff')
            await userService.profile(req.user.id).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                }
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
    },

    /*
    *
    *****Api for checking the status of profile completed****
    *
    **/

    /*
    *
    * Api to get usersList
    * return usersList
    */

    async userList(req, res) {
        try {
            await userService.userList().then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
    },

    /*
     * 
     * Api to Delete User 
     * 
     */

    deleteProfile(req, res) {
        try {
            userService.deleteProfile(req.user.id).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else {
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
    },

    /***************** Api for 3 Answers ***************/

    async answersProfile(req, res) {
        try {
            const validates = await userValidation.answersProfile(req.body)
            if (validates.error == true) {                    /// if validations failed
                return res.status(HttpStatus.BAD_REQUEST).json(validates).end()
            }
            req.body.ipAddress = requestIp.getClientIp(req)
            await userService.answersProfile(req.body, req.user.id).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                }
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
    },

    /****************** Api for sharing contacts *******/

    async contactShare(req, res) {
        try {

            await userService.contactShare(req.body, req.user.id).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                }
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
    },

    /**********  Api for Reporting  User  **************/


    async reportUser(req, res) {
        try {

            await userService.reportUser(req.body, req.user.id).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                }
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
    },


    /******
     * 
     * **** Controller to Set order of Images 
     * 
     */
    async imageOrder(req, res) {
        try {
            const validates = await userValidation.validateOrder(req.body)

            //In case of fail validation
            if(validates.error == true) {
                return res.status(HttpStatus.BAD_REQUEST).json(validates).end()
            }

            await userService.imageOrder(req).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.code) {
                    return res.status(HttpStatus.BAD_REQUEST).send(error)
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                }
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
    },

    /*
     * 
     * Controller for deleting Images
     * deleteimage
     */

    deleteimage(req, res) {
        try {
            userService.deleteimage(req).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                if (error.error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
                } else {
                    return res.status(HttpStatus.NOT_FOUND).send(error)
                }
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
    },


    /*
     * 
     * **** API for logout
     * 
     */

    async logout(req, res) {
        try {
            await userService.logout(req).then(response => {
                return res.status(HttpStatus.OK).send(response)
            }).catch(error => {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
    },

    /*
    *
    * Get instagram live long token and update in db
    * 
    */
   async instaToken(req, res) {
    try {
        await userService.instaToken(req.user.id, req.params.token).then(response => {
            return res.status(HttpStatus.OK).send(response)
        }).catch(error => {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
        })
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
},

/*
    *
    * Dummy function for compressing all the old images 
    * 
    */
   async compressOld(req, res) {
    try {
        await userService.compressOld().then(response => {
            return res.status(HttpStatus.OK).send(response)
        }).catch(error => {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
        })
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
},



}