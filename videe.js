import chatService from './src/api/resources/chat/chat.service';
import chatValidation from './src/api/resources/chat/chat.validation'
import push from './src/api/sendPush.service'


export const videe = () => {

  var connnections = {}

  const WebSocket = require('ws');

  const webSocketServer = new WebSocket.Server({ port: 8001 });

  console.log(`Websocket listening on 8000`)

  webSocketServer.on('connection', (webSocket) => {

    webSocket.on('message', (message) => {

      var newdata = JSON.parse(message)

      switch (newdata.command) {

        case "connect":

          connnections[newdata.data.id] = webSocket;

        //  console.log('connection is established---------------------------------->>>>>');

          break;

        case "message":

          //console.log('all the connections------------------------->>>>>>>', connnections);

          let msgsent = chatService.sendmsg(newdata.data);


          if (connnections[newdata.data.to_id]) {

        //    console.log("--------ONLINE USERS------------------------",newdata.data)


            connnections[newdata.data.to_id].send(message);

            if (msgsent.success) {
              connnections[newdata.data.toid].send(message);
          //    console.log('handling message-------------->>>>>>>>>>>>>>>>', message);
            }

            chatService.pushsend(newdata.data);

          } else {

      //      console.log("--------OFFLINE USERS------------------------",newdata.data)

            chatService.pushsend(newdata.data);

            console.log('user not available for message', newdata.data.to_id)
        
          }
          break;
        default:
          console.log('default is invoked')
      }
    });

  });

}