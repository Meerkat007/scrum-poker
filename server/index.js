const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

const room = {};
const guests = {};
const host = {};

wss.on('connection', function connection(ws, request) {
  if (!request.url.includes('a2ac1zQ3')) {
      ws.send('rejected');
      ws.close();
  }

  ws.send('connected');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  

});