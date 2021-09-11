const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

const room = {};
const guests = {};
const host = {};

wss.on('connection', function connection(ws, request) {
    const {url} = request;
    const query = url.split('?')[1];
    const roomId = getQueryVariableValue(
        query,
        'roomId'
    );
    const memberName = getQueryVariableValue(
        query,
        'memberName'
    )
    console.log(`member name: ${memberName}, wants to join room: ${roomId}`)
  if (roomId !== 'a2ac1zQ3' || !memberName || !memberName.trim()) {
      ws.send('rejected');
      ws.close();
  }

  ws.send('connected');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  

});

function getQueryVariableValue(query, variable) {
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}