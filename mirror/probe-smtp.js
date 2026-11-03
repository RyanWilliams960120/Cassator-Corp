const tls = require("tls");

function talk(commands) {
  return new Promise((resolve) => {
    const lines = [];
    let pending = "";
    const socket = tls.connect(465, "smtp.hostinger.com", { servername: "smtp.hostinger.com" });
    const timer = setTimeout(() => {
      socket.destroy();
      resolve(lines.concat(["TIMEOUT"]));
    }, 12000);
    function sendNext() {
      const next = commands.shift();
      if (!next) {
        clearTimeout(timer);
        socket.end();
        resolve(lines);
        return;
      }
      socket.write(next + "\r\n");
    }
    socket.on("data", (buf) => {
      pending += buf.toString("utf8");
      const parts = pending.split(/\r?\n/);
      pending = parts.pop();
      parts.filter(Boolean).forEach((line) => {
        lines.push(line);
        if (/^\d{3} /.test(line)) sendNext();
      });
    });
    socket.on("error", (error) => {
      clearTimeout(timer);
      resolve(lines.concat([error.code || error.message]));
    });
    socket.on("secureConnect", () => {});
  });
}

talk([
  "EHLO erax.digital",
  "MAIL FROM:<jobs@erax.digital>",
  "RCPT TO:<jobs@erax.digital>",
  "RCPT TO:<contact@erax.digital>",
  "QUIT",
]).then((lines) => {
  console.log(lines.join("\n"));
});
