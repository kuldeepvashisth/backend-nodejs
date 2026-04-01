const http = require("http");
const requesthandler = require("./main");

const server = http.createServer(requesthandler);

const port = 3002;
server.listen(port, () => {
  console.log(`calculator server listening on https://localhost:${port}`);
});
