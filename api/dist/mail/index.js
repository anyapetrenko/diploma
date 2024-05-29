'use strict';

const nodemailer = require('nodemailer');
const renderTemplate = require('./letterTemplate');

module.exports = data => {
    var transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_LOGIN,
            pass: process.env.SMTP_PASSWORD
        }
    });

    transporter.sendMail({
        from: `"Arena" <${process.env.SMTP_EMAIL}>`,
        to: data.email,
        subject: "Event coordinator logs",
        html: renderTemplate(data)
    }, (err, info) => {
        if (err) console.log("Err", err);else console.log(info);
    });
};
