const {
  selectAllUser,
  selectUserByEmail,
  insertUser,
  updateUserByEmail,
  deleteUserByEmail,
  selectNoteProvidersById,
  selectUserByuserId,
  searchUserByEmail,
} = require("../../models/user.sql");

const { checkIfAuthenticated } = require("../firebase/firebase.middleware");

// async function httpSelectAllUsers(req, res) {
//   return res.status(200).json(await selectAllUser());
// }

async function httpSelectUserByToken(req, res) {
  if (!req.email) {
    return res.status(200).json({ error: "Missing email" });
  }
  try {
    return res.status(200).json(await selectUserByEmail(req.email));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpInsertUser(req, res) {
  const newUser = req.body;
  if (!newUser.firstName || !newUser.lastName || !newUser.email) {
    return res.status(400).json({ error: "Missing info" });
  }
  if (!newUser.subtitle) {
    newUser.subtitle = "New user";
  }
  newUser.userId = req.userId;
  try {
    return res.status(201).json(await insertUser(newUser));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpUpdateUserByEmail(req, res) {
  const userInfo = req.body;
  userInfo.email = req.email;
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
  userInfo.email = req.email;
  try {
    return res.status(204).json(await deleteUserByEmail(userInfo));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
  ``;
}

async function httpSelectNoteProviders(req, res) {
  try {
    return res.status(200).json(await selectNoteProvidersById(req.userId));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpSearchUserByEmail(req, res) {
  try {
    return res.status(200).json(await searchUserByEmail(req.body.email));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

module.exports = {
  httpInsertUser,
  httpUpdateUserByEmail,
  httpSelectUserByToken,
  httpDeleteUserByEmail,
  httpSelectNoteProviders,
  httpSearchUserByEmail,
};
