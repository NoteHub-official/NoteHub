const http = require("http");
const expressWebsockets = require("express-ws");
const { Server } = require("@hocuspocus/server");
const hooks = require("./hocuspocus-hooks/hooks");
const { app: expressServer } = require("./app");
const { RocksDB } = require("@hocuspocus/extension-rocksdb");
const mongo = require("./models/mongo.utils");
const PORT = process.env.PORT || 8000;
const https = require("https");
const fs = require("fs");
const path = require("path");
// Configure hocuspocus
const server = Server.configure({
  //port: 1234,
  ...hooks,
  extensions: [
    new RocksDB({
      path: "./database",
      options: {
        // This option is only a example. See here for a full list:
        // https://www.npmjs.com/package/leveldown#options
        createIfMissing: true,
      },
    }),
  ],
  // Move all hooks to the hooks.js file
  // async onConnect(data) {
  // ...
  // }
});

// Initialize a HTTPS server

if (process.env.ON_SERVER === "true") {
  var options = {
    key: fs.readFileSync(path.join(__dirname, "..", "private.key")),
    cert: fs.readFileSync(path.join(__dirname, "..", "key.crt")),
  };
  var httpsServer = https.createServer(options, expressServer);
  httpsServer.listen(443);
  var { app } = expressWebsockets(expressServer, httpsServer);
} else {
  var { app } = expressWebsockets(expressServer);
}
app.get("/test123", (request, response) => {
  response.send("Hello World!");
});

app.ws("/websocket/note/:noteId", (websocket, request) => {
  console.log("requesting upgrade to websocket");
  server.handleConnection(websocket, request, request.params.noteId, {});
});

const start = async () => {
  await mongo.init();
  app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
  });
};

start();
