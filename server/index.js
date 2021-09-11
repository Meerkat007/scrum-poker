const { WebSocketServer } = require('ws');
const {NEW_MEMBER_JOINED} = require('./socketServerConstants');

const wss = new WebSocketServer({ port: 8080 });

const room = {};
const guests = {};
const host = {};
const connections = {};


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

  // Added to connections to check if it is still alive.
  connections[request.url] = ws;
  console.log(`member name: ${memberName}, joined room: ${roomId}`);
  
  guests[memberName] = -1;
  console.log(`guests list for room: ${roomId} updated to ${JSON.stringify(guests)}`);

  // notify all connected clients
  ws.send(serializeData({
      action: NEW_MEMBER_JOINED,
      value: guests
  }))

  ws.on('message', function incoming(message) {
    // const data = JSON.parse(message);
    console.log('!!!!!message received', message);
  });

  ws.on('close', function(code, data) {
      console.log('closed!!!!!', code);
  })
});

setInterval(function() {
    const connectionsEntries = Object.entries(connections);
    connectionsEntries.forEach(([url, ws]) => {
        if (ws.readyState === 3) {
            delete connections[url]
            console.log(`URL: ${url} is closed and removed from connections.`);
        }
    })
  }, 2000);

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

function serializeData(data) {
    return JSON.stringify(data);
}