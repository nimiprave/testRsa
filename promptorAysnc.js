// declaration
const color = require('colors');
const prompt = require('prompt');


module.exports = new Promise(function(resolve, reject){

//at initialization time
prompt.start(); //

//start-of-selection. 
console.log(color.underline.bold.italic.red("Testing RSA Encryption"));

//schema
var schema = {

    properties: {
        user_id: {
            description: color.yellow('Please enter User Id:'),
            required: true
        },
        contest_id: {
            description: color.yellow('Please enter Contest Id:'),
            required: true
        },
        score: {
            description: color.bgMagenta('Please enter the score:'),
            type: 'number',
            message: 'Only numbers are allowed',
            required: true,
            conform: function (v) {
                if (Number.isInteger(v)) {
                    return true;
                } else {
                    return false;
                }
            }
        }

    }

};


//read the input from the Prompt object

prompt.get(schema, function(err, result){

 resolve(result);
 console.log(color.underline.yellow(`Following is what you have entered`));
 console.log(color.green(`user_id: ${result.user_id}`));
 console.log(color.green(`contest_id: ${result.contest_id}`));
 console.log(color.green(`score: ${result.score}`));

});


});