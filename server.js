#!/usr/bin/env node
'use strict';
const express = require('express');
const port = normalizePort(process.env.PORT || 8080);

const App = require('./App.js');

const bodyParser = require('body-parser');
const http = require('http');

App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val){
    let port = (typeof val === 'string') ? parseInt(val,10): val;
    if(isNaN(port)) return val;
    else if(port >= 0) return port;
    else return false
}

function onError(error){
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch(error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
}

function onListening(){
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}

// var express = require('express');
// var app = express();
// var path = require('path');

// app.use(express.static(path.join(__dirname + '/dist')));
// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/dist/index.html'));
// });

// app.listen(8080);