const {
  selectAllUser,
  selectUserByEmail,
  insertUser,
  updateUserByEmail,
  deleteUserByEmail,
  selectAllContributorsByUserId,
  selectUserByuserId,
} = require("../../models/user.sql");

const { checkIfCurrentUser } = require("../firebase/firebase.middleware");

async function httpSelectAllUsers(req, res) {
  return res.status(200).json(await selectAllUser());
}

async function httpSelectUserByEmail(req, res) {
  //check if current user is valid
  if (!checkIfCurrentUser(req, req.body.email)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!req.body.email) {
    return res.status(200).json({ error: "Missing email" });
  }
  try {
    return res.status(200).json(await selectUserByEmail(req.body.email));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpInsertUser(req, res) {
  // check if current user is valid
  if (!checkIfCurrentUser(req, req.body.email)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const newUser = req.body;
  if (!newUser.firstName || !newUser.lastName || !newUser.email) {
    return res.status(400).json({ error: "Missing info" });
  }
  if (!newUser.subtitle) {
    newUser.subtitle = "New user";
  }

  try {
    return res.status(201).json(await insertUser(newUser));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpUpdateUserByEmail(req, res) {
  // check if current user is valid
  if (!checkIfCurrentUser(req, req.body.email)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userInfo = req.body;
  if (req.email != userInfo.email) {
    return res
      .status(401)
      .json({ error: "You are not allowed to update this user" });
  }
  if (!userInfo.email) {
    return res.status(400).json({ error: "Missing email" });
  }
  try {
    return res.status(201).json(await updateUserByEmail(userInfo));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpDeleteUserByEmail(req, res) {
  /* TODO: Code here needs to check if this request is allowed!*/

  const userInfo = req.body;
  if (!userInfo.email) {
    return res.status(400).json({ error: "Missing email" });
  }
  try {
    return res.status(204).json(await deleteUserByEmail(userInfo));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpSelectAllContributorsByUserIdAndEmail(req, res) {
  // check if current user is valid
  try {
    //user = await selectUserByuserId(req.body.userId);
    if (!checkIfCurrentUser(req, req.body.email)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return res
      .status(200)
      .json(await selectAllContributorsByUserId(req.body.userId));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

module.exports = {
  httpInsertUser,
  httpSelectAllUsers,
  httpUpdateUserByEmail,
  httpSelectUserByEmail,
  httpDeleteUserByEmail,
  httpSelectAllContributorsByUserIdAndEmail,
};
