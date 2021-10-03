const sequelize = require("./database");
const { QueryTypes } = require("sequelize");

// CREATE note
//     noteTitle
//     dataId
//     createdAt
async function insertNote(info) {
  try {
    await sequelize.query(
      `INSERT INTO Note(noteTitle, dataId, createdAt) values ('${info.noteTitle}', '${info.dataId}', '${info.createdAt}')`,
      {
        type: QueryTypes.INSERT,
      }
    );

    newNote = await sequelize.query(
      `SELECT * FROM Note WHERE noteTitle = '${info.noteTitle}' AND dataId = '${info.dataId}' AND createdAt = '${info.createdAt}')`,
      {
        type: QueryTypes.SELECT,
      }
    );

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
      `SELECT DISTINCT * FROM Note NATURAL JOIN NoteAccess WHERE NoteAccess.userId = '${userId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
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

async function transferOwnership(noteId, oldOwnerId, newOwnerId) {
  try {
    oldAccess = await sequelize.query(
      `SELECT * FROM NoteAccess WHERE noteId = ${noteId} AND userId= ${oldOwnerId} AND accessStatus= 'owner'`,
      { type: QueryTypes.SELECT }
    );
    if (oldAccess.length < 1) {
      throw new Error("You are not the owner, you cannot transfer ownnership!");
    }

    await sequelize.query(
      `DELETE FROM NoteAccess WHERE noteId = ${noteId} AND userId = ${oldOwnerId}`,
      { type: QueryTypes.DELETE }
    );
    // This UPDATE will only be called when the newOwnerId is valid
    if (newOwnerId) {
      await sequelize.query(
        `UPDATE NoteAccess SET accessStatus = "owner" WHERE noteId = ${noteId} AND userId = ${newOwnerId}`
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
        { type: QueryTypes.INSERT }
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
    let data = await sequelize.query(`SELECT * FROM Category`, {
      type: QueryTypes.SELECT,
    });
    data.map((obj) => {
      obj.categoryName;
    });
    return data;
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
};
