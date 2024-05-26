const nodemailer = require("nodemailer");
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async send(mail, activationLink) {
    this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: mail,
      subject: "Activation link",
      text: activationLink,
      html: `<a href=${activationLink}>Click to activate</a>`,
    });
  }
}

module.exports = new MailService();
