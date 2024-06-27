const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_EMAIL,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });
  // 2) Define the email options
  const mailOptions = {
    from: "Shea H. <tsgrove@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // 3) Send the email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
