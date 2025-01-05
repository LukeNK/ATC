import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';

const app = express(),
    server = createServer(app),
    wss = new WebSocketServer({ server });

const __dirname = path.resolve();

// Handle HTTP requests
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/client', express.static(path.join(__dirname, 'client')));

// Handle WebSocket connections
let CLIENTS = [];

function sendExceptCurrent(client, message) {
    for (let i = 0; i < CLIENTS.length; i++) {
        if (CLIENTS[i] === client) continue;

        CLIENTS[i].send(message);
    }
}

function sendAll(message) {
    for (let i = 0; i < CLIENTS.length; i++) {
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
