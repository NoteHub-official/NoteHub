const {
  selectAllUser,
  selectUserByEmail,
  insertUser,
  updateUserByEmail,
  deleteUserByEmail,
} = require("../../models/user.sql");

async function httpSelectAllUsers(req, res) {
  return res.status(200).json(await selectAllUser());
}

async function httpSelectUserByEmail(req, res) {
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
  const newUser = req.body;
  if (!newUser.firstName || !newUser.lastName || !newUser.email) {
    return res.status(400).json({ error: "Missing info" });
  }
  if (!newUser.subtitle) {
    newUser.subtitle = "New user";
  }

  try {
    await res.status(201).json(await insertUser(newUser));
    console.log("here")
    return res.status(200).json(await selectUserByEmail(newUser));

  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpUpdateUserByEmail(req, res) {
  const userInfo = req.body;
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

module.exports = {
  httpInsertUser,
  httpSelectAllUsers,
  httpUpdateUserByEmail,
  httpSelectUserByEmail,
  httpDeleteUserByEmail,
};
