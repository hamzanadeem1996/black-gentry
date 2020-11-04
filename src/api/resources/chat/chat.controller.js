var HttpStatus = require('http-status-codes')
import chatService from './chat.service';
import chatValidation from './chat.validation';
var multer  = require('multer')
var path    = require('path')
export default { 
  /*fucntion to upload audio chat*/
  async uploadaudio(req,res){
    try{
      var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname) //Appending extension
      }
    })
      var maxSize = 10000 * 1000 * 1000;
      var upload = multer({ storage: storage, limits: { fileSize: maxSize } 
      }).single('avatar');
      upload(req, res, function(err,result) {
          if(err){
          return res.json({'status':false,"messsage":"issue uploading imae"})
          }
          var path = req.file;       
          var response = {
            "status":true,
            "message":"file uploaded successfull",
            "filedetails": path
          }
          return res.json(response).end() 
        })    
    }catch(err){
      return res.end('issue uploading file') 
    }
  },
  async sendmessage(req, res) {
    try{
      // const validates = await chatValidation.validatemsg(req.body);
      // if(validates.error == true){                    /// if validations failed
      //   return res.status(400).json(validates).end();
      // }
      console.log("Controller------------->>>>>>",req.body)
      let sendmsg = await chatService.sendmsg(req.body)     
      if(sendmsg.success == false)
    
       
      return res.status(400).json(sendmsg);
      return res.status(200).json(sendmsg);
  
     }catch (err) {
      return res.status(500).send(err);
    }    
  },  
  async getChatList(req, res){
      try{        
        chatService.getChatList(req.user.id).then(response => {
          if(response.success == false){
            return res.status(400).json(userlist);
          }
            return res.status(HttpStatus.OK).send(response)
        })
        .catch(error => {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
        })
     }catch(err){
        return res.status(500).json(err);
      }
  },
  async guestChatList(req, res){
    try{        
      chatService.guestChatList(req.user.id).then(response => {
          return res.status(HttpStatus.OK).send(response)
      })
      .catch(error => {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
      })
   }catch(err){
      return res.status(500).json(err);
    }
},
  async getMessagelist(req,res){
    try{
      const validates = await chatValidation.validateMessagelist(req.body)
      if (validates.error == true) { /// if validations failed
          return res.status(HttpStatus.BAD_REQUEST).json(validates).end(validates)
      }
      console.log('req........',req.body)
      chatService.getMessagelist(req.body, req.user.id, req.params.pageNumber).then(response => {
          return res.status(HttpStatus.OK).send(response)
      })
      .catch(error => {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
      })
    }catch(err){
      return res.status(500).json({'message':err});
    }
  },
  async guestMessagelist(req,res){
    try{
      const validates = await chatValidation.validateMessagelist(req.body)
      if (validates.error == true) { /// if validations failed
          return res.status(HttpStatus.BAD_REQUEST).json(validates).end(validates)
      }
      chatService.guestMessagelist(req.body, req.user.id).then(response => {
          return res.status(HttpStatus.OK).send(response)
      })
      .catch(error => {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
      })
    }catch(err){
      return res.status(500).json({'message':err});
    }
  },
  async searchUserlist(req,res){
    try{
      var param = req.params.search; 
      let userlist = await chatService.searchUser({search:param,userid:req.user.id})
      if(userlist.success == false){
        return res.status(400).json(userlist);
      }
      return res.status(200).json(userlist);
      }catch(err){
        console.log(err)
      return res.status(500).json(err);
    }
  },

  async checkunread(req,res){
    try{
      var checkid = req.params.toid
      let userlist = await chatService.checkunread(req.user.id)
      if(userlist.success == false){
        return res.status(400).json(userlist);
      }
      return res.status(200).json(userlist);
      }catch(err){
        console.log(err)
      return res.status(500).json(err);
    }
  },
  

  /*this is test fucntion*/  
    
  async checktwilio(req,res){
    try{
      
      var accountSid = "AC5bbdebebc3ba29337b84f0f4fd302a56"
      var authToken = "f1d92132aafef4e8e0eec30629b99487"
   
      const client = require('twilio')(accountSid, authToken);

      /*client.lookups.phoneNumbers('+917018463601')
                    .fetch({type: ['carrier']})
                    .then(phone_number => {
                      if(phone_number.carrier.type === 'mobile'){
                        console.log(phone_number.carrier);
                      }else{
                        console.log("not a valid number");
                      }
                    }).catch(err=>{
                      console.log('invalid')
                    })
                      
                      
      return  res.json({'msg':"done"})*/
        var countrycode = '+01'
       
      let msgsent =await client.messages.create({
        body: 'checking with you', 
        //from: '+15005550006',
        from : '+12055399758',
        to: '+918699343627'
      })
      console.log("*****************here is the msg body******",msgsent)
      if(msgsent){
        return  res.json({'msg':"done"})
      }else{
        return  res.json({'msg':" not done"})
      }
    }catch(err){
      console.log(err)
      return res.json({'msgs': err })
    }
     

},
  async downloadaudio(req,res){    
      var file = req.params.file;
      var fileLocation =await path.join('./uploads',file);
      if(fileLocation){
          res.download(fileLocation, file);
      }else{
          res.json({'status':false,'message':"issue downloading"})
      }     
  },
  getsendmessage(req,res){
    try{        
      // console.log('---=-=-=-=-=-=-',req.params.fromid)
      // console.log('---=-=-=-=-=-=-',req.params.toid)
      // for get chatService.getsendmessage(req.params.fromid,req.params.toid)
      chatService.getsendmessage(req.body.from,req.body.to).then(response => {
          return res.status(HttpStatus.OK).send(response)
      })
      .catch(error => {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
      })
   }catch(err){
      return res.status(500).json(err);
    }
  },



  async hostInfoIdlist(req, res){
    try{        
      chatService.hostInfoIdlist(req.user.id).then(response => {
          return res.status(HttpStatus.OK).send(response)
      })
      .catch(error => {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
      })
   }catch(err){
      return res.status(500).json(err);
    }
},
async hostchatlist(req, res){
  try{        
    chatService.hostchatlist(req.user.id,req.query.id).then(response => {
        return res.status(HttpStatus.OK).send(response)
    })
    .catch(error => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    })
 }catch(err){
    return res.status(500).json(err);
  }
},

async guestInfoIdlist(req, res){
  try{        
    chatService.guestInfoIdlist(req.user.id).then(response => {
        return res.status(HttpStatus.OK).send(response)
    })
    .catch(error => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    })
 }catch(err){
    return res.status(500).json(err);
  }
},

async guestchatlist(req, res){
  try{       
    console.log('====query',req.query.id) 
    chatService.guestchatlist(req.user.id,req.query.id).then(response => {
        return res.status(HttpStatus.OK).send(response)
    })
    .catch(error => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    })
 }catch(err){
    return res.status(500).json(err);
  }
},

async changeStatus(req, res){
  try{       
    console.log('PARAMETERS---------------------',req.params.id) 
    console.log('PARAMETERS---------------------',req.user.id) 

    chatService.changeStatus(req.params.id,req.user.id).then(response => {
        return res.status(HttpStatus.OK).send(response)
    })
    .catch(error => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    })
 }catch(err){
    return res.status(500).json(err);
  }
}

}
