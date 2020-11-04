import { sequelize } from '../../../../models';

const Chat         = require('../../../../models').Chat;
const User         = require('../../../../models').User;
const Op            = require('sequelize').Op;
export default  {
   /* async getChatmsg(condition){
        return new Promise((resolve, reject) => {    
            User.findAll({
              includes: [{
                model: models.Chat,
               // required: true          
               }],
            // where: {
            //     [Op.or]: [ { to_id: condition.to, from_id: condition.from} , 
            //                 { to_id: condition.from, from_id: condition.to} ]                               
            // },
           order: [
            ['createdAt', 'ASC'],
            ]
          })
          .then(chat => {
              resolve(chat)            
          })
          .catch(err => {
              let res = {
                  error: true,
                  message : err
              }
            reject(err)
          })
        })
      },*/
      async getChatmsg(condition){
        return new Promise((resolve, reject) => {
                 sequelize.query("SET GLOBAL sql_mode='', SESSION sql_mode=''");
                           // select `chats`.*,`users`.`profileImg` FROM `chats` LEFT JOIN `users` ON `users`.id = `Chats`.from_id where (`from_id` =1 AND to_id =131) OR (`from_id` =131 AND to_id =1) ORDER BY `chats`.`id`
            sequelize.query("select Chats.*,Users.`profileImg` FROM `Chats` LEFT JOIN Users ON Users.id = Chats.from_id WHERE (`from_id` ="+ condition.from +" AND to_id ="+condition.to+") OR (`from_id` ="+ condition.to +" AND to_id ="+condition.from+") ORDER BY `Chats`.`id`")
          .then(chat => {
              console.log('we are here')
            //   console.log(chat)
              resolve(chat)            
          })
          .catch(err => {
              let res = {
                  error: true,
                  message : err
              }
            reject(err)
          })
         })
      },
    getChatmsglist(condition){
            return new Promise((resolve, reject) => { 
          sequelize.query("SET GLOBAL sql_mode='', SESSION sql_mode=''");
            sequelize.query("select tbl2.*,name,profileImg,(select if(count(status),count(status),0) as unread_messages from Chats where to_id="+ condition.id +" and from_id=tbl2.other_user_id and STATUS='0') as unread_messages from (SELECT tbl3 . * , message, createdAt FROM (SELECT MAX( `id` ) AS `id` , IF( to_id = "+ condition.id +", `from_id` , to_id ) other_user_id, `from_id` , to_id FROM `Chats` WHERE (`from_id` ="+ condition.id +" OR to_id ="+condition.id+") GROUP BY `other_user_id` ORDER BY `id` DESC ) tbl3 LEFT JOIN Chats ON Chats.id = tbl3.id) tbl2 LEFT JOIN Users ON Users.id = tbl2.other_user_id")
          .then(chat => {
              console.log('we are here')
            //   console.log(chat)
              resolve(chat)            
          })
          .catch(err => {
              let res = {
                  error: true,
                  message : err
              }
            reject(err)
          })
        })
    },
    /* fucntion to to set status to 1(read)
    * accepts tthe toid, fromid
    * sends the response of updations
    */
    setMessageread(condition){      
      return new Promise((resolve,reject)=>{
                console.log("from:"+condition.fromid+": to"+condition.toid)
                sequelize.query("update Chats set status='1' where (from_id="+condition.fromid+" and to_id="+condition.toid+" and status='0')")
              //  Chat.update({
              //   status: '1',                
              // },{
              //       where: {
                      
              //         [Op.and]:[{to_id:condition.toid },{from_id:condition.fromid,}  ]                             
              //       }
              //   })
              .then(count => {
                console.log(count.length)                   
                    resolve(count)
                }).catch(err=>{
                  let res = {
                    status: false,
                    message : err
                }
              reject(res)
                })
      })
    }   
}
