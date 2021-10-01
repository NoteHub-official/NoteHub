const express = require("express");
const {
  httpInsertUser,
  httpSelectAllUsers,
  httpUpdateUserByEmail,
  httpSelectUserByEmail,
  httpDeleteUserByEmail,
  httpSelectAllContributorsByUserIdAndEmail
} = require("./user.controller");

const { checkIfAuthenticated } = require("../firebase/firebase.middleware");

const userRouter = express.Router();

userRouter.post("/insert-user", checkIfAuthenticated, httpInsertUser);

userRouter.put("/update-user",checkIfAuthenticated, httpUpdateUserByEmail);

userRouter.post("/get-user-by-email",checkIfAuthenticated, httpSelectUserByEmail);

userRouter.delete("/delete-user-by-email", httpDeleteUserByEmail);

//userRouter.get("/get-all-users", httpSelectAllUsers);

userRouter.post("/get-contributors", checkIfAuthenticated, httpSelectAllContributorsByUserIdAndEmail);


module.exports = userRouter;
