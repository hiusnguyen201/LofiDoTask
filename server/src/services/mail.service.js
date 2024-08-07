import nodemailer from "nodemailer";

export default {
  sendMail,
};

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "hiusnguyen201@gmail.com",
      pass: "wzbihxrbwrrumvyz",
    },
  });
}

async function sendMail(email, subject, text) {
  const transporter = createTransporter();
  return transporter.sendMail({
    from: "hiusnguyen201@gmail.com",
    to: email,
    subject,
    text,
  });
}
