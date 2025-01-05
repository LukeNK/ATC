const express = require('express'),
    http = require('http'),
    WebSocket = require('ws'),
    path = require('path');

const app = express(),
    server = http.createServer(app),
    wss = new WebSocket.Server({ server });

// game code
class Plane {
    constructor(x, y, hdg, spd, alt) {
        this.x = x;
        this.y = y;
        this.hdg = hdg;
        this.spd = spd;
        this.alt = alt;
    }
    tick() {
        this.x += this.spd * Math.cos(this.hdg);
        this.y += this.spd * Math.sin(this.hdg);
    }

}

// Handle HTTP requests
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(path.join(__dirname, 'client')));

// Handle WebSocket connections
let CLIENTS = [];

function sendExceptCurrent(client, message) {
    for (var i = 0; i < CLIENTS.length; i++) {
        if (CLIENTS[i] == client) continue;

        CLIENTS[i].send(message);
    }
}

function sendAll(message) {
    for (var i = 0; i < CLIENTS.length; i++) {
        CLIENTS[i].send(message);
    }
}

wss.on('connection', (ws) => {
    CLIENTS.push(ws);


    ws.on('message', (message) => {
        console.log('Received:', message);
        ws.send(`Server received: ${message}`);
    });
});

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
