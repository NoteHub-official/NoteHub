const express = require("express");
const userRouter = require("./user/user.router")

const apiRouter = express.Router();

apiRouter.use("/user", userRouter);


module.exports = apiRouter;