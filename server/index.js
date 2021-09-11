const WebSocket = require('ws');
const {
    NEW_MEMBER_JOINED, 
    SUBMIT_ESTIMATE, 
    UPDATE_GUESTS, 
    UPDATE_ESTIMATE_DISPLAY_STATE
} = require('./socketServerConstants');

const wss = new WebSocket.WebSocketServer({ port: 8080 });

/**
 * {
 * name: {
 *  estimate,
 *  isHost
 * },
 * }
 */
const guests = {};

const connections = {};

function broadcast(message) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(serializeData(message));
        }
      });
}

function clearGuestsEstimate() {
    Object.keys(guests)
        .forEach((name) => {
            guests[name] = {
                ...guests[name],
                estimate: ''
            }
        })
}

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
  
  guests[memberName] = {
      estimate: '',
      isHost: memberName === 'Yuan'
  };
  console.log(`guests list for room: ${roomId} updated to ${JSON.stringify(guests)}`);

  // notify all connected clients
  broadcast({
    action: NEW_MEMBER_JOINED,
    value: guests
    })  

  ws.on('message', function incoming(message) {
    // const data = JSON.parse(message);
    const parsedMessage = JSON.parse(message);
    console.log('!!!!!message received', message);
    const {action, value} = parsedMessage;
    if (action === SUBMIT_ESTIMATE) {
        const {name, estimate} = value;
        guests[name] = {
            ...guests[name],
            estimate
        }
        broadcast({
            action: UPDATE_GUESTS,
            value: guests
        })
    } else if (action === UPDATE_ESTIMATE_DISPLAY_STATE) {
        if (!value) {
            clearGuestsEstimate(guests);
            broadcast({
                action: UPDATE_GUESTS,
                value: guests
            })
        }
        broadcast({
            action: UPDATE_ESTIMATE_DISPLAY_STATE,
            value
        })
    }
    console.log('estimate updated', guests);
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
            const query = url.split('?')[1];
            const memberName = getQueryVariableValue(
                query,
                'memberName'
            )
            delete guests[memberName];
            broadcast({
                action: UPDATE_GUESTS,
                value: guests
            })
            console.log(`URL: ${url} is closed and removed from connections.`);
        }
    })
  }, 2000);

function getQueryVariableValue(query, variable) {
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function serializeData(data) {
    return JSON.stringify(data);
}