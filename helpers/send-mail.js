const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    tls:{
        ciphers:"SSLv3"
    },
    auth: {
      user: config.email.username,
      pass: config.email.password,
    },
  });

  module.exports= transporter;