const express = require("express");
const {
  httpInsertUser,
  httpSelectAllUsers,
  httpUpdateUserByEmail,
  httpSelectUserByEmail,
  httpDeleteUserByEmail,
} = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/insert-user", httpInsertUser);

userRouter.put("/update-user", httpUpdateUserByEmail);

userRouter.get("/get-user-by-email", httpSelectUserByEmail);

userRouter.delete("/delete-user-by-email", httpDeleteUserByEmail);

userRouter.get("/get-all-users", httpSelectAllUsers);

module.exports = userRouter;
