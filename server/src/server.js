const http = require("http");

const app = require("./app");

const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
  });
}

startServer();
