const rsaWrapper = require('./rsa-wrapper');
const request = require('http').request;

//load keys
rsaWrapper.initLoadServerKeys(__dirname);

// generate Key
if (!rsaWrapper.serverPub) {
    rsaWrapper.generateClientServerKeys('server');
}

//data

const payload = JSON.stringify(
    {
        "user_id" : "nimi",
        "tournament_id": "444666",
        "score": "1500"
    }
);

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

    console.log(`Response Code: ${response.statusCode}`);
    var chunks = [];

    response.on('data', (data) => {
        chunks.push(data);
    });

    response.on('end', () => {
        let body = Buffer.concat(chunks);
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

