const HTTPS_PORT = 3002;
const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
//  Yes, TLS is required
const serverConfig = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};
// ----------------------------------------------------------------------------------------
// Create a server for the client html page
const handleRequest = function(request, response) {
  // Render the single client html file for any request the HTTP server receives
  console.log('request received: ' + request.url);
  if(request.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(fs.readFileSync('client/index.html'));
  } else if(request.url === '/webrtc.js') {
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    response.end(fs.readFileSync('client/webrtc.js'));
  }
};
const httpsServer = https.createServer(serverConfig, handleRequest);
httpsServer.listen(HTTPS_PORT, '0.0.0.0');
// ----------------------------------------------------------------------------------------

// Create a server for handling websocket calls
const wss = new WebSocketServer({server: httpsServer});
connnections={}
wss.on('connection', function(ws) {
console.log('user is getting connected');
  // ws.on('close',function(code,message){
  //   // delete  people[data.userid];
  //   delete connections[this.id];
  //   //console.log('a user died on us...',i);
  // })
  ws.on('message', function(message) {
    console.log('new message comes');
    // 1. handling new connections
    // 2. handle sdp signals
    // 3. handle other broadcast
    var newdata = JSON.parse(message)
    switch(newdata.command) {
      case "connect":
        connnections[newdata.data.id] = ws;
        console.log('new user added-->',connnections)
        break;
      case "message":
      
       console.log('new message received')
       if(connnections[newdata.data.toid]){
         console.log('user connectted');
         connnections[newdata.data.toid].send(message);
       }else{
         console.log('user is not connected')
       }
       
      break;
      default:
         wss.broadcast(message);
        console.log('default of message');
    }    
  });
});

wss.broadcast = function(data) {
  this.clients.forEach(function(client) {
    if(client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

console.log('Server running. Visit https://localhost:' + HTTPS_PORT + ' in Firefox/Chrome.\n\n\
Some important notes:\n\
  * Note the HTTPS; there is no HTTP -> HTTPS redirect.\n\
  * You\'ll also need to accept the invalid TLS certificate.\n\
  * Some browsers or OSs may not allow the webcam to be used by multiple pages at once. You may need to use two different browsers or machines.\n'
);
