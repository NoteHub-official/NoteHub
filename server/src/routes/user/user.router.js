const express = require("express");
const {
  httpInsertUser,
  httpUpdateUserByEmail,
  httpSelectUserByToken,
  httpDeleteUserByEmail,
  httpSelectAllContributorsByUserIdAndEmail,
} = require("./user.controller");


const userRouter = express.Router();

userRouter.post("/insert-user", httpInsertUser);

userRouter.put("/update-user", httpUpdateUserByEmail);

userRouter.get(
  "/get-user-by-token",
  httpSelectUserByToken
);

userRouter.delete("/delete-user-by-email", httpDeleteUserByEmail);

//userRouter.get("/get-all-users", httpSelectAllUsers);

userRouter.post(
  "/get-note-providers",
  httpSelectAllContributorsByUserIdAndEmail
);

module.exports = userRouter;
