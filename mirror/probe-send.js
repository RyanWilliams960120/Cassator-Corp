const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mx1.hostinger.com",
  port: 25,
  secure: false,
  requireTLS: true,
  name: "erax.digital",
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
  tls: { servername: "mx1.hostinger.com" },
  logger: true,
  debug: true,
});

transporter.sendMail({
  from: "EraX Digital <jobs@erax.digital>",
  to: "jobs@erax.digital",
  subject: "EraX application delivery check",
  text: "This is a delivery check for the careers form. No application is attached.",
}).then((info) => {
  console.log("SENT", info.response);
  process.exit(0);
}).catch((error) => {
  console.log("FAIL", error.message);
  process.exit(1);
});
