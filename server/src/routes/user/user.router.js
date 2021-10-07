const express = require("express");
const {
  httpInsertUser,
  httpUpdateUserByEmail,
  httpSelectUserByToken,
  httpDeleteUserByEmail,
  httpSelectNoteProviders,
  httpSearchUserByEmail
} = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/insert-user", httpInsertUser);

userRouter.put("/update-user", httpUpdateUserByEmail);

userRouter.get("/get-user-by-token", httpSelectUserByToken);

userRouter.delete("/delete-user-by-email", httpDeleteUserByEmail);

//userRouter.get("/get-all-users", httpSelectAllUsers);

userRouter.get("/get-note-providers", httpSelectNoteProviders);

userRouter.post("/search-user-by-email", httpSearchUserByEmail);

module.exports = userRouter;
