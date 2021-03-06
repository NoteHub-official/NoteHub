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

    // add level feature, new user have level 1
    await sequelize.query(`INSERT INTO UserLevel(userId) values ('${user.userId}')`, {
      type: QueryTypes.INSERT,
    });

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
  console.log("----------------------");
  try {
    let data = await sequelize.query(
      `SELECT * FROM User WHERE email = '${email}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log("----------------------");
    if (data.length > 0) {
      return data[0];
    } else {
      return null;
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
      return [];
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

// Advanced Query
async function selectTopUsers() {
  try {
    // top users (up to 10) who have at least 5 notes which contain the most likeCounts and commentCounts.

    return await sequelize.query(
      `SELECT
        *
      FROM
      (SELECT
        U.userId,
        U.email,
        U.firstName,
        U.lastName,
        U.avatarUrl,
        U.subtitle,
        SUM(N.likeCount) as likeCount
      FROM User U
      JOIN Note N ON (U.userId = N.ownerId)
      GROUP BY U.userId
      HAVING COUNT(N.noteId) > 3
      ORDER BY likeCount DESC LIMIT 100 ) temp1
      INNER JOIN
      (SELECT
        U.userId,
        U.email,
        U.firstName,
        U.lastName,
        U.avatarUrl,
        U.subtitle,
        SUM(commentCount) AS commentCount
      FROM User U
      JOIN Note N ON (U.userId = N.ownerId)
      GROUP BY U.userId
      HAVING COUNT(N.noteId) > 3
      ORDER BY commentCount DESC LIMIT 100) temp2
      USING (userId,email, firstName, lastName, avatarUrl, subtitle)
      ORDER BY likeCount + commentCount DESC
      LIMIT 10;`,
      {
        type: QueryTypes.SELECT,
      }
    );
  } catch (e) {
    console.log(e.message);
    throw new Error(e.message);
  }
}

async function getUserLevel(userId) {
  try {
    let data = await sequelize.query(`SELECT userLevel FROM UserLevel WHERE userId = '${userId}'`, {
      type: QueryTypes.SELECT,
    });
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function createStatTables() {
  try {
    await sequelize.query(
      `CREATE TABLE UserStatistics(
        categoryName VARCHAR(255) NOT NULL, 
        userLevel INTEGER NOT NULL,
        PRIMARY KEY(categoryName, userLevel),
        userLevelCounts INTEGER NOT NULL,
        FOREIGN KEY(categoryName) REFERENCES Category(categoryName)
        ON DELETE CASCADE ON UPDATE CASCADE
      );`);
      await sequelize.query(
        `CREATE TABLE NoteStatistics(
          categoryName VARCHAR(255) NOT NULL PRIMARY KEY,
          notesCount INTEGER NOT NULL,
          avgLikeCounts INTEGER NOT NULL,
          avgViewCounts INTEGER NOT NULL,
          avgCommentCounts INTEGER NOT NULL,
          FOREIGN KEY(categoryName) REFERENCES Category(categoryName)
        ON DELETE CASCADE ON UPDATE CASCADE
      );`);
  } catch (e) {
    throw new Error(e.message);
  }
}

async function dropStatTables() {
  try {
    await sequelize.query(`DROP TABLE UserStatistics`);
    await sequelize.query(`DROP TABLE NoteStatistics`);
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getStatistics() {
  try {
    createStatTables();
    await sequelize.query(`CALL NoteHubStats()`);
    const userStats = await sequelize.query(`SELECT * FROM UserStatistics`, {
      type: QueryTypes.SELECT
    });
    const noteStats = await sequelize.query(`SELECT * FROM NoteStatistics ORDER BY notesCount DESC`, {
      type: QueryTypes.SELECT
    });
    dropStatTables();
    let stats = {};
    for (let n of noteStats) {
      let category = n["categoryName"];
      stats[category] = {};
      stats[category]["UserStatistics"] = [];
      stats[category]["NoteStatistics"] = n;
    }
    for (let u of userStats) {
      let category = u["categoryName"];
      stats[category]["UserStatistics"].push(u);
    }
    for (let cate of Object.keys(stats)) {
      stats[cate]['UserStatistics'].sort((a, b) => a["userLevel"] - b["userLevel"]);
    }
    return stats;
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
  getUserLevel,
  getStatistics
};
