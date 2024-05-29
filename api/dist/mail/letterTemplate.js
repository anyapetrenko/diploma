'use strict';

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

module.exports = data => {
    return `
    <h1>${data.title}</h1>
    <h3 style="color:#777">Date: ${data.date}</h3>
    <hr>
    <h3>Email: ${data.email}</h3>
    <h3>Password: ${cryptr.decrypt(data.crypt_password)}<h3>
    <h3>URL: ${data.url}</h3>
    <hr>
    `;
};