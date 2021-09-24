const express = require("express");
const userRouter = require("./user/user.router");
const checkIfAuthenticated = require("./firebase/firebase.middleware");

const apiRouter = express.Router();

//apiRouter.use(checkIfAuthenticated);
apiRouter.use("/user", userRouter);

module.exports = apiRouter;
