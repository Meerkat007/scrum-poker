const WebSocket = require('ws');
const {
    NEW_MEMBER_JOINED, 
    SUBMIT_ESTIMATE, 
    UPDATE_GUESTS, 
    UPDATE_ESTIMATE_DISPLAY_STATE,
    KICK_EVERYONE,
    FORCED_EXIT_ROOM
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
let guests = new Map();

const connections = {};

function broadcast(message) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(serializeData(message));
        }
      });
}

function addNewGuest(memberName) {
    if (guests.has(memberName)) {
        return;
    }

    guests.set(memberName, {
        estimate: '',
        isHost: memberName === 'Yuan'
    })
}

function updateGuestInfoByName(name, field, value) {
    const guestInfo = {
        ...guests.get(name),
        [field]: value
    }
    guests.set(name, guestInfo);
}

function getSerializeGuests() {
    return JSON.stringify(Array.from(guests.entries()))
}

function clearGuestsEstimate() {
    guests.forEach((_, name) => {
        updateGuestInfoByName(name, 'estimate', '');
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
  
  addNewGuest(memberName);

  console.log(`guests list for room: ${roomId} updated to ${Array.from(guests.entries())}`);

  // notify all connected clients
  broadcast({
    action: NEW_MEMBER_JOINED,
    value: getSerializeGuests()
    })  

  ws.on('message', function incoming(message) {
    // const data = JSON.parse(message);
    const parsedMessage = JSON.parse(message);
    console.log('!!!!!message received', message);
    const {action, value} = parsedMessage;
    if (action === SUBMIT_ESTIMATE) {
        const {name, estimate} = value;
        updateGuestInfoByName(name, 'estimate', estimate);
        broadcast({
            action: UPDATE_GUESTS,
            value: getSerializeGuests()
        })
    } else if (action === UPDATE_ESTIMATE_DISPLAY_STATE) {
        if (!value) {
            clearGuestsEstimate();
            broadcast({
                action: UPDATE_GUESTS,
                value: getSerializeGuests()
            })
        }
        broadcast({
            action: UPDATE_ESTIMATE_DISPLAY_STATE,
            value
        })
    } else if (action === KICK_EVERYONE) {
        guests = new Map();
        console.log(`kicked out everyone by ${memberName}, guests: ${guests}`);
        broadcast({
            action: FORCED_EXIT_ROOM,
            value: true
        });
        closeAllConnections();
    }
    console.log('estimate updated', guests);
  });

  ws.on('close', function(code, data) {
      console.log('closed!!!!!', code);
  })
});

function closeAllConnections() {
    wss.clients.forEach(function each(client) {
        client && client.close();
    });
}

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
            guests.delete(memberName);
            broadcast({
                action: UPDATE_GUESTS,
                value: getSerializeGuests()
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