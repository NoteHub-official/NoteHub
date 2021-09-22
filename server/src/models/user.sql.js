const sequelize = require("./database");
const { QueryTypes } = require("sequelize");

// CREATE user
async function insertUser(user) {
  try {
    await sequelize.query(
      "INSERT INTO User(firstName, lastName, subtitle, email, avatarUrl) values (?, ?, ?, ?, ?);",
      {
        replacements: [
          user.firstName,
          user.lastName,
          user.subtitle,
          user.email,
          user.avatarUrl,
        ],
      }
    );
    console.log(
      `${user.firstName} ${user.lastName} - ${user.email} is successfully inserted`
    );
    return user;
  } catch (e) {
    console.error(e);
    return { message: e };
  }
}

// READ user
async function selectAllUser() {
  let data = await sequelize.query("SELECT * FROM User ORDER BY firstName", {
    type: QueryTypes.SELECT,
  });
  //console.log(data);
  return data;
}

// READ user
async function selectUserByEmail(email) {
  let data = await sequelize.query("SELECT * FROM User WHERE email = ?", {
    replacements: [email],
    type: QueryTypes.SELECT,
  });
  if (data.length > 0) {
    return data[0];
  } else {
    throw new Error("Cannot find matching user");
  }
}

// UPDATE user
async function updateUserByEmail(user) {
  try {
    oldUserInfo = await selectUserByEmail(user.email);

    await sequelize.query(
      "UPDATE User SET firstName = ?, lastName = ?, subtitle = ?, avatarUrl = ? WHERE email = ?",
      {
        replacements: [
          user.firstName ? user.firstName : oldUserInfo.firstName,
          user.lastName ? user.lastName : oldUserInfo.lastName,
          user.subtitle ? user.subtitle : oldUserInfo.subtitle,
          user.avatarUrl ? user.avatarUrl : oldUserInfo.avatar,
          user.email,
        ],
        type: QueryTypes.UPDATE,
      }
    );

    console.log(
      `${user.firstName} ${user.lastName} - ${user.email} is successfully updated`
    );

    // Return the updated user information
    return await selectUserByEmail(user.email);
  } catch (e) {
    throw new Error(e.message);
  }
}

//DELETE user
async function deleteUserByEmail(user) {
  try {
    user = await selectUserByEmail(user.email);
    await sequelize.query("DELETE FROM User WHERE userId = ?", {
      replacements: [user.userId],
      type: QueryTypes.DELETE,
    });

    console.log(
      `${user.firstName} ${user.lastName} - ${user.email} is successfully deleted`
    );
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {
  selectAllUser,
  insertUser,
  updateUserByEmail,
  selectUserByEmail,
  deleteUserByEmail,
};
