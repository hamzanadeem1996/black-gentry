
export const videe = () => {
    var connnections = {}
    const WebSocket = require('ws');
    const webSocketServer = new WebSocket.Server({ port: 8443 });
    console.log("Websocket listening on 8443")
    webSocketServer.on('connection', (webSocket) => {
      webSocket.on('message', (message) => {
        var newdata = JSON.parse(message)
        switch (newdata.command) {
            case "connect":
              connnections[newdata.data.id] = webSocket;
              console.log('connection is established');
              break;
            case "message":
                console.log('all the connections',connnections);
                if(connnections[newdata.data.to_id]){
                    connnections[newdata.data.to_id].send(message);
                }else{
                    console.log('user not available for message',newdata.data.to_id)
                }
             
              break;
            case "start_call":
                if(connnections[newdata.data.to_id]){
                    connnections[newdata.data.to_id].send(message);
                }else{
                    console.log('user not available for start_call',newdata.data.to_id)
                }
              break;
            case "call_accepted":
                if(connnections[newdata.data.to_id]){
                    connnections[newdata.data.to_id].send(message);
                }else{
                    console.log('user not available for call_accepted',newdata.data.to_id)
                }
              break;
            case "offer":
                if(connnections[newdata.data.to_id]){
                    connnections[newdata.data.to_id].send(message);
                }else{
                    console.log('user not available for offer',newdata.data.to_id)
                }
              break;
            case "call_answer":
                if(connnections[newdata.data.to_id]){
                    connnections[newdata.data.to_id].send(message);
                }else{
                    console.log('user not available for offer',newdata.data.to_id)
                }
              break;
            case "candidate":
                if(connnections[newdata.data.to_id]){
                    connnections[newdata.data.to_id].send(message);
                }else{
                    console.log('user not available for candidate',newdata.data.to_id)
                }
                break;
    
            default:
                console.log('default is invoked') 
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                      client.send(data);
                    }
                });
               
          }
        
        
        //broadcast(message);
        });
    });
    
    // function broadcast(data) {
    //   webSocketServer.clients.forEach((client) => {
    //     if (client.readyState === WebSocket.OPEN) {
    //       client.send(data);
    //     }
    //   });
    // }
  
}