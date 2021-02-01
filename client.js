const color = require('colors');
const rsaWrapper = require('./rsa-wrapper');
const request = require('http').request;
const result = require('./promptorAysnc');
result.then((result)=>{
    console.log("Inside the consumptor:");
    client(result);

}); 




function client(result){

//load keys
rsaWrapper.initLoadServerKeys(__dirname);

// generate Key
if (!rsaWrapper.serverPub) {
    rsaWrapper.generateClientServerKeys('server');
}

//data
const payload = JSON.stringify(result);

// encrypt using public keys
const data = JSON.stringify( {
    "score" : `${rsaWrapper.encrypt(rsaWrapper.serverPub, payload)}`
});
console.log(`Encrypted text: ${data}`);

// options for the request. 

//options
var options = {
    host: 'localhost',
    path: '/score',
    port: 3000,
    method: 'POST',
    headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
    }
};


//call back function
const callBack = (response) => {

    console.log(color.bgBlue(`Response Code: ${response.statusCode}`));
    var chunks = [];

    response.on('data', (data) => {
        chunks.push(data);
    });

    response.on('end', () => {
        let body = Buffer.concat(chunks);
        console.log("Payload Sent: ");
        console.log(body.toString());
    });

    response.on('error', (error) => {
        console.error(error);
    });
}

// Perform the request
let req = request(options, callBack);
req.write(data);
req.end();



}

