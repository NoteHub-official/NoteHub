const sequelize = require("./database");
const { QueryTypes } = require("sequelize");
const { selectUserByuserId } = require("./user.sql");
// CREATE note
//     noteTitle
//     dataId
//     createdAt
async function insertNote(info) {
  console.log(info.createdAt);
  try {
    await sequelize.query(
      `INSERT INTO Note(noteTitle, dataId, createdAt, ownerId) values ('${info.noteTitle}', '${info.dataId}', '${info.createdAt}', '${info.userId}')`,
      {
        type: QueryTypes.INSERT,
      }
    );

    const raw = await sequelize.query(
      `SELECT * FROM Note WHERE noteTitle = '${info.noteTitle}' AND dataId = '${info.dataId}' AND createdAt = ${info.createdAt}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const newNote = raw[0];
    await sequelize.query(
      `INSERT INTO NoteAccess(noteId, userId, accessStatus) values ('${newNote.noteId}', '${info.userId}', 'owner')`,
      {
        type: QueryTypes.INSERT,
      }
    );

    await alterNoteCategories("INSERT", newNote.noteId, info.categories);
    return newNote;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

async function selectNotesByUserId(userId) {
  try {
    let data = await sequelize.query(
      `SELECT
        N.noteId, N.dataId, N.noteTitle, N.createdAt, N.likeCount, N.viewCount, N.commentCount, N.ownerId,
        NA.accessStatus,
        (SELECT CONCAT(U1.firstName, " ", U1.lastName) FROM User U1 WHERE U1.userId = N.ownerId) AS ownerName
      FROM Note N
      NATURAL JOIN NoteAccess NA
      WHERE NA.userId = '${userId}'
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    // Get sharedUsers if current accessStatus is owner
    for (let i = 0; i < data.length; i++) {
      const note = data[i];
      if (note.accessStatus == "owner") {
        const sharedUsers = await sequelize.query(
          `SELECT DISTINCT
            U.userId, U.email, U.firstName, U.lastName, U.avatarUrl, U.subtitle
          FROM User U
          NATURAL JOIN NoteAccess NA
          WHERE NA.noteId = ${note.noteId} AND NA.accessStatus != "owner"`,
          { type: QueryTypes.SELECT }
        );
        console.log(sharedUsers);
        data[i].sharedUsers = sharedUsers;
      } else {
        data[i].sharedUsers = [];
      }
    }
    // Get categoryName
    for (let i = 0; i < data.length; i++) {
      let categories = await sequelize.query(
        `SELECT categoryName FROM NoteCategory WHERE noteId = ${data[i].noteId}`,
        { type: QueryTypes.SELECT }
      );
      console.log(categories);
      data[i].categories = categories.map((category) => category.categoryName);

      data[i].owner = await selectUserByuserId(data[i].ownerId);
    }
    console.log(data);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function selectNotesByCommunityId(communityId) {
  try {
    let data = await sequelize.query(
      `SELECT
        N.noteId, N.dataId, N.noteTitle, N.createdAt, N.likeCount, N.viewCount, N.commentCount, N.ownerId,
        (SELECT CONCAT(U1.firstName, " ", U1.lastName) FROM User U1 WHERE U1.userId = N.ownerId) AS ownerName
      FROM Note N
      NATURAL JOIN CommunityNote CN
      WHERE CN.communityId = ${communityId}
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    //Get all notes
    for (let i = 0; i < data.length; i++) {
      let comments = await sequelize.query(
        `SELECT content, likeCount, createdAt FROM Comment WHERE noteId = ${data[i].noteId}`,
        { type: QueryTypes.SELECT }
      );
      data[i].comments = comments;
    }

    for (let i = 0; i < data.length; i++) {
      let categories = await sequelize.query(
        `SELECT categoryName FROM NoteCategory WHERE noteId = ${data[i].noteId}`,
        { type: QueryTypes.SELECT }
      );
      console.log(categories);
      data[i].categories = categories.map((category) => category.categoryName);

      data[i].owner = await selectUserByuserId(data[i].ownerId);
    }
    console.log(data);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function selectNoteByNoteId(noteId) {
  try {
    let data = await sequelize.query(
      `SELECT * FROM Note WHERE noteId = '${noteId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return data[0];
  } catch (e) {
    throw new Error(e.message);
  }
}

async function updateNoteByNoteId(info) {
  try {
    await sequelize.query(
      `UPDATE Note
        SET noteTitle = '${info.noteTitle}' WHERE noteId = ${info.noteId}`,
      {
        type: QueryTypes.UPDATE,
      }
    );

    return info;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function transferOwnership(noteId, oldOwnerId, newOwnerId) {
  try {
    oldAccess = await sequelize.query(
      `SELECT * FROM NoteAccess WHERE noteId = ${noteId} AND userId= '${oldOwnerId}' AND accessStatus= 'owner'`,
      { type: QueryTypes.SELECT }
    );
    if (oldAccess.length < 1) {
      throw new Error("You are not the owner, you cannot transfer ownnership!");
    }

    await sequelize.query(
      `DELETE FROM NoteAccess WHERE noteId = ${noteId} AND userId = '${oldOwnerId}'`,
      { type: QueryTypes.DELETE }
    );
    // This UPDATE will only be called when the newOwnerId is valid
    if (newOwnerId) {
      await sequelize.query(
        `UPDATE NoteAccess SET accessStatus = "owner" WHERE noteId = ${noteId} AND userId = '${newOwnerId}'`
      ),
        {
          type: QueryTypes.UPDATE,
        };

      await sequelize.query(
        `UPDATE Note SET ownerId = '${newOwnerId}' WHERE noteId = ${noteId}`
      ),
        {
          type: QueryTypes.UPDATE,
        };
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

async function selectAllAccessorsByNoteId(noteId) {
  try {
    let data = await sequelize.query(
      `SELECT DISTINCT * FROM User NATURAL JOIN NoteAccess WHERE NoteAccess.noteId = '${noteId}' AND NoteAccess.accessStatus != "owner"`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function alterNoteCommunity(command, commId, noteId) {
  try {
    if (command === "INSERT") {
      return await sequelize.query(
        `INSERT CommunityNote(communityId, noteId) VALUES ('${commId}', '${noteId}')`,
        { type: QueryTypes.INSERT }
      );
    } else if (command === "DELETE") {
      return await sequelize.query(
        `DELETE FROM CommunityNote WHERE communityId = '${commId}' AND noteid = '${noteId}')`,
        { type: QueryTypes.DELETE }
      );
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

async function alterNoteCategories(command, noteId, categories) {
  try {
    if (command === "INSERT") {
      const valueList = categories.map((cate) => {
        return `('${cate}', '${noteId}')`;
      });
      const arg = valueList.join(", ");

      console.log(arg);
      return await sequelize.query(
        `INSERT NoteCategory(categoryName, noteId) VALUES ${arg}`,
        {
          type: QueryTypes.INSERT,
        }
      );
    } else if (command === "DELETE") {
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        await sequelize.query(
          `DELETE FROM NoteCategory WHERE categoryName = '${category}' AND noteId = '${noteId}'`,
          { type: QueryTypes.INSERT }
        );
      }
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

async function selectNoteAccessByNoteIdAndUserId(noteId, userId) {
  try {
    let data = await sequelize.query(
      `SELECT * FROM NoteAccess WHERE noteId = '${noteId}' AND userId = '${userId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return data[0];
  } catch (e) {
    throw new Error(e.message);
  }
}

async function alterNoteAccess(command, noteId, userId, accessStatus) {
  try {
    if (command === "INSERT") {
      return await sequelize.query(
        `INSERT NoteAccess(noteId, userId, accessStatus) VALUES ('${noteId}', '${userId}', '${accessStatus}')`,
        { type: QueryTypes.INSERT }
      );
    } else if (command === "DELETE") {
      await sequelize.query(
        `DELETE FROM NoteAccess WHERE noteId = '${noteId}', userId = '${userId}', accessStatus = '${accessStatus}'`,
        { type: QueryTypes.DELETE }
      );
    } else if (command === "UPDATE") {
      await sequelize.query(
        `UPDATE NoteAccess SET accessStatus = '${accessStatus}' WHERE noteId = '${noteId}', userId = '${userId}'`,
        { type: QueryTypes.UPDATE }
      );
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

async function selectAllCategories() {
  try {
    const data = await sequelize.query(`SELECT * FROM Category`, {
      type: QueryTypes.SELECT,
    });
    const processed = data.map((obj) => obj.categoryName);
    console.log(processed);
    return processed;
  } catch (e) {
    throw new Error(e.message);
  }
}
module.exports = {
  insertNote,
  selectNotesByUserId,
  selectAllAccessorsByNoteId,
  transferOwnership,
  selectNoteByNoteId,
  alterNoteCommunity,
  alterNoteCategories,
  alterNoteAccess,
  selectNoteAccessByNoteIdAndUserId,
  selectAllCategories,
  updateNoteByNoteId,
  selectNotesByCommunityId,
};
