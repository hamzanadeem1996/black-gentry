import settingValidation from './setting.validation'
import settingService from './setting.service'
var HttpStatus = require('http-status-codes')

export default {
   
    /*
    *
    * Api for get settings
    *  
    * return data
    * 
    */
    async getAll(req, res) {
        try {
            await settingService.getAll(req.user.id).then(response => {
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
    * Api for update settings
    * 
    * return data
    * 
    */
   async update(req, res) {
    try {
        const validates = await settingValidation.validateUpdate(req.body)
        if (validates.error == true) {                   /// if validations failed
            return res.status(400).json(validates).end()
        }
        await settingService.update(validates, req.user.id).then(response => {
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
    * Api for update settings
    * 
    * return data
    * 
    */
   async getSuperLikes(req, res) {
    try {
        const validates = await settingValidation.validateGetSuperLikes(req.body)
        if (validates.error == true) {                   /// if validations failed
            return res.status(400).json(validates).end()
        }
        await settingService.getSuperLikes(validates, req.user.id).then(response => {
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