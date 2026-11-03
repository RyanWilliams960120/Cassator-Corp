const net = require("net");

function probe(port) {
  return new Promise((resolve) => {
    const lines = [];
    let pending = "";
    const commands = [
      "EHLO erax.digital",
      "MAIL FROM:<jobs@erax.digital>",
      "RCPT TO:<jobs@erax.digital>",
      "QUIT",
    ];
    const socket = net.connect(port, "mx1.hostinger.com");
    const timer = setTimeout(() => {
      socket.destroy();
      resolve(port + " TIMEOUT\n" + lines.join("\n"));
    }, 12000);
    function sendNext() {
      const next = commands.shift();
      if (!next) {
        clearTimeout(timer);
        socket.end();
        resolve(port + "\n" + lines.join("\n"));
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
      resolve(port + " " + (error.code || error.message) + "\n" + lines.join("\n"));
    });
  });
}

probe(25).then((result) => {
  console.log(result);
});
