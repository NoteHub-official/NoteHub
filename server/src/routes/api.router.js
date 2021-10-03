const express = require("express");
const userRouter = require("./user/user.router");
const {checkIfAuthenticated} = require("./firebase/firebase.middleware");

const apiRouter = express.Router();

//apiRouter.use(checkIfAuthenticated);
apiRouter.use("/user", checkIfAuthenticated,  userRouter);

module.exports = apiRouter;
