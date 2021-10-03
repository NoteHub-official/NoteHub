const express = require("express");
const userRouter = require("./user/user.router");
const commRouter = require("./community/community.router");
const noteRouter = require("./note/note.router");
const { checkIfAuthenticated } = require("./firebase/firebase.middleware");

const apiRouter = express.Router();

//apiRouter.use(checkIfAuthenticated);
apiRouter.use("/user", checkIfAuthenticated, userRouter);

apiRouter.use("/community", checkIfAuthenticated, commRouter);

apiRouter.use("/note", checkIfAuthenticated, noteRouter);
module.exports = apiRouter;
