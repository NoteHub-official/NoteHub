const sequelize = require("./database");
const { QueryTypes } = require("sequelize");

// CREATE user
async function insertUser(user) {
  try {
    await sequelize.query(
      `INSERT INTO User(userId, firstName, lastName, subtitle, email, avatarUrl) values ('${user.userId}','${user.firstName}', '${user.lastName}', '${user.subtitle}', '${user.email}', '${user.avatarUrl}')`,
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
    throw new Error(e.message);
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
/* TEST this function!!! */
async function selectNoteProvidersById(userId) {
  try {
    let data = await sequelize.query(
      `SELECT DISTINCT
          U.userId, U.firstName, U.lastName, U.subtitle, U.email, U.avatarUrl
        FROM User U
        NATURAL JOIN NoteAccess NA
        WHERE NA.noteId IN (SELECT NA1.noteId FROM NoteAccess NA1 WHERE NA1.userId = "${userId}")
          AND NA.accessStatus = "owner"
      GROUP BY U.userId`,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log(data);
    return data;
  } catch (e) {
    throw new Error("Unknown DB failure");
  }
}

async function searchUserByKeyword(keyword) {
  try {
    return await sequelize.query(
      `SELECT DISTINCT
        U.userId,
        CONCAT(U.firstName, ' ', U.lastName) AS name,
        U.subtitle,
        U.email,
        U.avatarUrl
      FROM User U
      WHERE U.email LIKE '%${keyword}%' OR CONCAT(U.firstName, ' ', U.lastName) LIKE '%${keyword}%'
      ORDER BY U.email`,
      {
        type: QueryTypes.SELECT,
      }
    );
  } catch (e) {
    throw new Error(e.message);
  }
}

async function selectTopUsers() {
  try {
    const users = await sequelize.query(
      `(SELECT
      U.userId,
      U.email,
         U.firstName,
         U.lastName,
         U.avatarUrl,
         U.subtitle
     FROM User U
     JOIN NoteAccess NA USING (userId)
     JOIN Note N ON (U.userId = N.ownerId)
     WHERE N.likeCount >= (SELECT AVG(likeCount) FROM Note) 
     GROUP BY U.userId
     HAVING COUNT(N.noteId) > 5)
     UNION 
     (SELECT
      U.userId,
         U.firstName,
         U.lastName,
         U.avatarUrl,
         U.subtitle
     FROM User U
     JOIN NoteAccess NA USING (userId)
     JOIN Note N ON (U.userId = N.ownerId)
     WHERE N.commentCount >= (SELECT AVG(commentCount) FROM Note) 
     GROUP BY U.userId
     HAVING COUNT(N.noteId) > 5)
     ORDER BY firstName, lastName LIMIT 10`,
      {
        type: QueryTypes.SELECT,
      }
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
  selectNoteProvidersById,
  selectUserByuserId,
  searchUserByKeyword,
  selectTopUsers,
};
