const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SEND_GRID_SECRETKEY);

const sendMail = (email, subject, phrase, res) => {
  let msg = {
    to: email,
    from: {
      name: "noreply@Despo",
      email: "ronicksamuel@gmail.com",
    },
    subject: subject,
    text: "you have a mail from admin",
    html: `<h1>${phrase}</h1>`,
  };
  return sgMail
    .send(msg)
    .then(() => {
      res.status(200).json({ message: "Email sent" });
      console.log("Email sent");
    })
    .catch((error) => {
      res.status(500).json({ error: "error", message: error });
      console.error("error occured", error);
    });
};

module.exports = { sendMail };
