const fs = require('fs');
const https = require('https');
var WebSocketServer = require('ws').Server;
const serverConfig = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

import chatService from './src/api/resources/chat/chat.service';
import chatValidation from './src/api/resources/chat/chat.validation'
console.log('==========here')

export const socketHelper = () => {
  console.log('repeat mode on')
  //pass in your credentials to create an https server
  var httpsServer = https.createServer(serverConfig);
  //httpsServer.listen(process.env.SOCKET_PORT);
  httpsServer.listen(process.env.SOCKET_PORT, function () {
    console.log('listening on for socket', process.env.SOCKET_PORT);
  });
  var wss = new WebSocketServer({
    server: httpsServer
  });

  var connnections = {}


  wss.on('connection', function (ws) {
                console.log('user is getting connected');
                // ws.on('close',function(code,message){
                //   // delete  people[data.userid];
                //   delete connections[this.id];
                //   //console.log('a user died on us...',i);
                // })
                ws.on('message', function (message) {
                  console.log('new message comes');
                  // 1. handling new connections
                  // 2. handle sdp signals
                  // 3. handle other broadcast
                  var newdata = JSON.parse(message)
                  switch (newdata.command) {
                    case "connect":
                        // wss.send({'msg':"testing the connection"})
                      connnections[newdata.data.id] = ws;
                      console.log('ws data issssssssssssssssssssssssssssssssssssssssssss---->', connnections)
                      console.log("-----------------")
                      console.log('new user added-->', connnections)
                      break;
                    case "message":

                      console.log('new message received', newdata.data)
                      const validates = chatValidation.validateMessagelist(newdata.data);
                      if (validates.error == true) {
                        console.log('validate is false', validates)
                        return validates;
                      } else {
                        console.log('sending datato this soket.................',newdata.data.id)
                        connnections[newdata.data.toid].send(message);
                        let msgsent = chatService.sendmsg(newdata.data);
                        // console.log("------->>>>>>----->>>>>>>>>>>>>>>>>>>>>>",newdata.data.toid)
                        // console.log('-------------------------->connnections ',connnections)
                        if (msgsent.success) {
                          connnections[newdata.data.toid].send(message);
                          console.log('handling message', message);
                        }

                      }
                      //  if(connnections[newdata.data.toid]){
                      //    console.log('user connectted');
                      //    
                      //  }else{
                      //    console.log('user is not connected')
                      //  }

                      break;
                    default:
                      wss.broadcast(message);
                      console.log('default of message');
                  }
                });
      });
}