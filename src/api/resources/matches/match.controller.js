import matchValidation from './match.validation'
import matchService from './match.service'
var HttpStatus = require('http-status-codes')

export default {

    /*
    *
    * Api for get matches
    * 
    * return data
    * 
    */
    async getAll(req, res) { 
        try {
            var setLimit ;
            if(req.query.limit != undefined) {
                setLimit = req.query.limit;
            } else {
                setLimit = 10 ;
            }
            await matchService.getAll(req.user.id, req.params.pageNumber , setLimit).then(response => {
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
            console.log("I catcheddddddddddd")
            return res.status(500).send(err)
        }
    },
    /*
        *
        * Api for paticular match details
        * 
        * return data
        * 
        */
    async getById(req, res) {
        try {
            await matchService.getById(req.params.matchId, req.user.id).then(response => {
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
        * Api for react for match
        * 
        * params: [toId, reaction]
        * 
        * return data
        * 
        */
    async react(req, res) {
        try {
            const validates = await matchValidation.validateReact(req.body)
            if (validates.error == true) {                   /// if validations failed
                return res.status(400).json(validates).end()
            }
            await matchService.react(validates, req.user.id).then(response => {
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

    // new function for react V1

    async reactForV1(req, res) {
        try {
            const validates = await matchValidation.validateReact(req.body)
            if (validates.error == true) {                   /// if validations failed
                return res.status(400).json(validates).end()
            }
            await matchService.reactForV1(validates, req.user.id).then(response => {
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

    //new function

    // async reactFor(req, res) {
    //     try {
    //         const validates = await matchValidation.validateReact(req.body)
    //         if (validates.error == true) {                   /// if validations failed
    //             return res.status(400).json(validates).end()
    //         }
    //         await matchService.reactFor(validates, req.user.id).then(response => {
    //             return res.status(HttpStatus.OK).send(response)
    //         }).catch(error => {
    //             if (error.error) {
    //                 return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    //             } else if (error.code) {
    //                 return res.status(HttpStatus.BAD_REQUEST).send(error)
    //             } else {
    //                 return res.status(HttpStatus.NOT_FOUND).send(error)
    //             }
    //         })
    //     } catch (err) {
    //         return res.status(500).send(err)
    //     }
    // },
 async reactForV2(req, res) {
        try {
            const validates = await matchValidation.validateReact(req.body)
            if (validates.error == true) {                   /// if validations failed
                return res.status(400).json(validates).end()
            }
            await matchService.reactForV2(validates, req.user.id).then(response => {
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
        * Api for list for match
        * 
        * params: [toId, reaction]
        * 
        * return data
        * 
        */
    async list(req, res) {
        try {
            await matchService.list(req.user.id, req.params.pageNumber).then(response => {
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
        * Api for new matches list for match
        * 
        * params: [toId, reaction]
        * 
        * return data
        * 
        */
       async newMatchList(req, res) {
        try {
            await matchService.newMatchList(req.user.id, req.params.pageNumber).then(response => {
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
        * Api to get Data of Match
        * 
        * params: [Match Id]
        * 
        * return data
        * 
        */
    async getMatchData(req, res) {
        try {
            await matchService.getMatchData(req.user.id, req.params.id).then(response => {
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
    Controller to propose time after match
    *
    */

    async proposeTime(req, res) {
        try {
            await matchService.proposeTime(req.user.id, req.body).then(response => {
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
    Controller to get proposed time for call
    *
    */

    async getproposeTime(req, res) {
        try {
            await matchService.getproposeTime(req.user.id, req.params.id).then(response => {
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
     *
     * Controller to add Time Tokens 
     * 
     ****/

    async addTimeTokens(req, res) {
        try {
            await matchService.addTimeTokens(req.user.id, req.body).then(response => {
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

    /*******
     * 
     * Controller to add superlikes or crush tokens
     * 
     * *****/

    async addSuperLikes(req, res) {
        try {
            await matchService.addSuperLikes(req.user.id, req.body).then(response => {
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

    /*******
    * 
    * Controller to apply Time Tokens
    * 
    * *****/

    async applyTimeTokens(req, res) {
        try {
            await matchService.applyTimeTokens(req.user.id, req.body).then(response => {
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
     * 
     *Controller to get Answers of matches 
     *  
     ****/

    async getAnswers(req, res) {
        try {
            await matchService.getAnswers(req.user.id, req.params.id).then(response => {
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
 * 
 *Controller to get Answers of matches 
 *  
 ****/

    async getAnswers(req, res) {
        try {
            await matchService.getAnswers(req.user.id, req.params.id).then(response => {
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
    * 
    *Controller to rewind the reaction
    *  
    ****/

    async rewind(req, res) {
        try {
            await matchService.rewind(req.user.id, req.params.id).then(response => {
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
    * 
    *Controller to unmatch the matches
    *  
    ****/

    async unmatch(req, res) {
        try {
            await matchService.unmatch(req.user.id, req.params.id).then(response => {
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
    * 
    *Controller to delete chat of unmatched users
    *  
    ****/

   async chatDelete(req, res) {
    try {
        await matchService.chatDelete().then(response => {
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
}