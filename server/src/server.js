const http = require("http");
const express = require("express");
const expressWebsockets = require("express-ws");
const { Server } = require("@hocuspocus/server");
const hooks = require("./hocuspocus-hooks/hooks");
const { app: expressServer } = require("./app");
const PORT = process.env.PORT || 8000;

const { selectUserByEmail } = require("./models/user.sql");
const {
  checkIfAuthenticated,
} = require("./routes/firebase/firebase.middleware");
const {
  getAuthTokenFromHeader,
  getUserInfoFromFirebase,
} = require("./routes/firebase/firebase.utils");

// Configure hocuspocus
const server = Server.configure({
  port: 1234,
  ...hooks,

  // Move all hooks to the hooks.js file
  // async onConnect(data) {
  // ...
  // }
});

const { app } = expressWebsockets(expressServer);

app.get("/test123", (request, response) => {
  response.send("Hello World!");
});

app.ws("/note/:noteId", (websocket, request) => {
  console.log("requesting upgrade to websocket");
  server.handleConnection(websocket, request, request.params.noteId, {});
});
// console.log(request);
// const token = getAuthTokenFromHeader(request);
// console.log(token);
// getUserInfoFromFirebase(token)
//   .then(async ({ email }) => {
//     try {
//       if (email === "invalid") {
//         return new Error("Invalid user");
//       } else {
//         return await selectUserByEmail(email);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   })
//   .then((user) => {
//     const context = {
//       user: {
//         id: user.userId,
//         name: user.firstName,
//       },
//     };
//     server.handleConnection(
//       websocket,
//       request,
//       request.params.noteId,
//       context
//     );
//   })
//   .catch((e) => {
//     console.log(e);
//   });
//});

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
  });
}

startServer();
