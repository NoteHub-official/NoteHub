const sequelize = require("./database");
const { QueryTypes } = require("sequelize");

// CREATE user
async function insertUser(user) {
  try {
    await sequelize.query(
      `INSERT INTO User(firstName, lastName, subtitle, email, avatarUrl) values ('${user.firstName}', '${user.lastName}', '${user.subtitle}', '${user.email}', '${user.avatarUrl}')`,
      {
        type: QueryTypes.INSERT,
      }
    );
    console.log(
      `${user.firstName} ${user.lastName} - ${user.email} is successfully inserted`
    );
    console.log(user);
    return await selectUserByEmail(user.email);
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
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
  console.log("email:--------", email);
  try {
    let data = await sequelize.query(
      `SELECT * FROM User WHERE email = '${email}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (data.length > 0) {
      return data[0];
    } else {
      throw new Error("Cannot find matching user");
    }
  } catch (e) {
    throw new Error("Unknown DB failure");
  }
}

async function selectUserByuserId(userId) {
  try {
    let data = await sequelize.query(
      `SELECT * FROM User WHERE userId = '${userId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (data.length > 0) {
      return data[0];
    } else {
      throw new Error("Cannot find matching user");
    }
  } catch (e) {
    throw new Error("Unknown DB failure");
  }
}

// UPDATE user
async function updateUserByEmail(user) {
  try {
    old = await selectUserByEmail(user.email);

    const [firstName, lastName, subtitle, avatarUrl] = [
      user.firstName ? user.firstName : old.firstName,
      user.lastName ? user.lastName : old.lastName,
      user.subtitle ? user.subtitle : old.subtitle,
      user.avatarUrl ? user.avatarUrl : old.avatar,
    ];

    await sequelize.query(
      `UPDATE User
        SET firstName = '${firstName}', lastName = '${lastName}', subtitle = '${subtitle}', avatarUrl = '${avatarUrl}'
        WHERE email = '${user.email}'`,
      {
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
    await sequelize.query(`DELETE FROM User WHERE userId = '${user.userId}'`, {
      type: QueryTypes.DELETE,
    });

    console.log(
      `${user.firstName} ${user.lastName} - ${user.email} is successfully deleted`
    );
  } catch (e) {
    throw new Error(e.message);
  }
}

// contributor means people who provides notes to this userId
async function selectAllContributorsByUserId(userId) {
  try {
    let data = await sequelize.query(
      `SELECT DISTINCT * FROM User 
      WHERE userId IN (SELECT userId FROM NoteAccess n1
              WHERE n1.accessStatus = 'owner' AND n1.noteId IN 
                      (SELECT noteId FROM NoteAccess n2
                      WHERE n2.userId = '${userId}' AND n2.accessStatus != 'owner'))`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return data;
  } catch (e) {
    throw new Error("Unknown DB failure");
  }
}




module.exports = {
  selectAllUser,
  insertUser,
  updateUserByEmail,
  selectUserByEmail,
  deleteUserByEmail,
  selectAllContributorsByUserId,
  selectUserByuserId
};
