
const express = require('express');
const util = require('util');
const cookie_parser = require('cookie-parser');
const body_parser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(http);
const rsaWrapper = require('./rsa-wrapper');

const CLIENT_MESSAGE = 'CLIENT_ENCRYPTION_MESSAGE';

//load keys
rsaWrapper.initLoadServerKeys(__dirname);

// generate Key
if (!rsaWrapper.serverPub) {
    rsaWrapper.generateClientServerKeys('server');
}

// use app 
app.use(cookie_parser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended : false }));

//get Request
app.get('/',(req,res)=>{
console.log(`You have reached server`);
});

//post request
app.post('/score', (req, res)=>{
  
    // decrypting the message. 
    console.log(`Encrypted Payload: ${req.body}`);
    console.log(`Decrypted Payload${JSON.parse(rsaWrapper.decrypt(rsaWrapper.serverPrivate,req.body.score))}`);
    res.send(`Decrypted Payload${JSON.parse(rsaWrapper.decrypt(rsaWrapper.serverPrivate,req.body.score))}`);

});

//server listening
server.listen(3000, function(){
    console.log('listening on localhost:3000');
});
