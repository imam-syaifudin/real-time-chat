const moment = require('moment');
let date = new Date();
let jamSekarang = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`


function messageFormater(username,message){

    return {
        username,
        message,
        time: jamSekarang
    }

} 

module.exports = messageFormater;