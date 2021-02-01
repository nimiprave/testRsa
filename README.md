# testRsa
Prototype  to test RSA based communication between client and Server

Step-1: Start the Server - npm run server.js 
  listening on Port 3000. The Public and Private Keys are generated automatically and stored as pat of the Keys folder.

Step-2: Start the client - npm run client.js 
  It will start the command promp to enter  userid, contentid and score. The above parameters will be shown in the server console.

For Angular or Javascript client use the following code snippet.
// Example implementation 
let message = "Hello world";
const public_key = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSq[...]";
let encrypt = new JSEncrypt();
encrypt.setPublicKey(public_key);

let cipher_text = encrypt.encrypt(message)
