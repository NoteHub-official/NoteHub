const sequelize = require("./database");
const { QueryTypes } = require("sequelize");

// CREATE note
//     noteTitle
//     dataUrl
//     createdAt
async function insertNote(info) {
  try {
    await sequelize.query(
      `INSERT INTO Note(noteTitle, dataUrl, createdAt) values ('${info.noteTitle}', '${info.dataUrl}', '${info.createdAt}')`,
      {
        type: QueryTypes.INSERT,
      }
    );

    newNote = await sequelize.query(
      `SELECT * FROM Note WHERE noteTitle = '${info.noteTitle}' AND dataUrl = '${info.dataUrl}' AND createdAt = '${info.createdAt}')`,
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
  


    await sequelize.query(
      `DELETE FROM NoteAccess WHERE noteId = ${noteId} AND userId = ${oldOwnerId}`
    ),
      {
        type: QueryTypes.DELETE,
      };

    await sequelize.query(
      `UPDATE NoteAccess SET accessStatus = "owner" WHERE noteId = ${noteId} AND userId = ${newOwnerId}`
    ),
      {
        type: QueryTypes.UPDATE,
      };
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

module.exports = {
  insertNote,
  selectNotesByUserId,
  selectAllAccessorsByNoteId,
  transferOwnership,
  selectNoteByNoteId,
};
