const sequelize = require("./database");
const { QueryTypes } = require("sequelize");
const { selectUserByuserId } = require("./user.sql");

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
            U.userId, U.email, U.firstName, U.lastName, U.avatarUrl, U.subtitle, NA.accessStatus
          FROM User U
          NATURAL JOIN NoteAccess NA
          WHERE NA.noteId = ${note.noteId} AND NA.accessStatus != "owner"`,
          { type: QueryTypes.SELECT }
        );
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
    let raw = await sequelize.query(
      `SELECT
        *
      FROM Note N
      JOIN User U ON (N.ownerId = U.userId)
      NATURAL JOIN CommunityNote CN
      WHERE CN.communityId = ${communityId}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    //Get all comments
    for (let i = 0; i < raw.length; i++) {
      let comments = await sequelize.query(
        `SELECT
          *
        FROM Comment C
        NATURAL JOIN User U
        WHERE C.noteId = ${raw[i].noteId} AND C.parentId IS NULL`,
        { type: QueryTypes.SELECT }
      );

      raw[i].comments = comments.map((comment) => ({
        commentId: comment.commentId,
        noteId: comment.noteId,
        user: {
          userId: comment.userId,
          firstName: comment.firstName,
          lastName: comment.lastName,
          subtitle: comment.subtitle,
          email: comment.email,
          avatarUrl: comment.avatarUrl,
        },
        content: comment.content,
        parentId: comment.parentId,
        createdAt: comment.createdAt,
        likeCount: comment.likeCount,
      }));
    }

    return raw.map((note) => ({
      noteId: note.noteId,
      dataId: note.dataId,
      noteTitle: note.noteTitle,
      createdAt: note.createdAt,
      likeCount: note.likeCount,
      viewCount: note.viewCount,
      commentCount: note.commentCount,
      owner: {
        userId: note.ownerId,
        firstName: note.firstName,
        lastName: note.lastName,
        subtitle: note.subtitle,
        email: note.email,
        avatarUrl: note.avatarUrl,
      },
      comments: note.comments,
    }));
  } catch (e) {
    throw new Error(e.message);
  }
}

async function selectNoteByNoteId(noteId) {
  try {
    let data = await sequelize.query(`SELECT * FROM Note WHERE noteId = '${noteId}'`, {
      type: QueryTypes.SELECT,
    });
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

    // This UPDATE will only be called when the newOwnerId is valid.
    if (newOwnerId) {
      await sequelize.query(
        `UPDATE NoteAccess SET accessStatus = "owner" WHERE noteId = ${noteId} AND userId = '${newOwnerId}'`
      ),
        {
          type: QueryTypes.UPDATE,
        };
      // transfer ownership.
      await sequelize.query(`UPDATE Note SET ownerId = '${newOwnerId}' WHERE noteId = ${noteId}`),
        {
          type: QueryTypes.UPDATE,
        };

      // increase newOwener's accumulated noteCount.
      await sequelize.query(
        `Update UserLevel 
         SET noteCount = noteCount + 1 
         WHERE userId = ${newOwnerId}`, {
        type: QueryTypes.UPDATE,
      });
    } else {
      //delete the note!
      await sequelize.query(`DELETE FROM Note WHERE noteId = ${noteId}`, {
        type: QueryTypes.DELETE,
      });
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
      return await sequelize.query(`INSERT NoteCategory(categoryName, noteId) VALUES ${arg}`, {
        type: QueryTypes.INSERT,
      });
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
    return data.length > 0 ? data[0] : null;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function alterNoteAccess(info) {
  try {
    const { command, noteId, userId, accessStatus, userIds } = info;
    console.log(command, noteId, userId, accessStatus, userIds);
    if (command === "INSERT") {
      const ids = info.userIds.map((userId) => `(${noteId}, '${userId}', 'viewer')`).join(",");
      await sequelize.query(
        `INSERT IGNORE INTO NoteAccess(noteId, userId, accessStatus) VALUES ${ids}`,
        {
          type: QueryTypes.INSERT,
        }
      );
      return await sequelize.query(
        `SELECT DISTINCT
            U.userId, U.email, U.firstName, U.lastName, U.avatarUrl, U.subtitle, NA.accessStatus
          FROM User U
          NATURAL JOIN NoteAccess NA
          WHERE NA.noteId = ${noteId} AND NA.accessStatus != "owner"`,
        { type: QueryTypes.SELECT }
      );
    } else if (command === "DELETE") {
      await sequelize.query(
        `DELETE FROM NoteAccess WHERE noteId = ${noteId} AND userId = '${userId}'`,
        { type: QueryTypes.DELETE }
      );
    } else if (command === "UPDATE") {
      await sequelize.query(
        `UPDATE NoteAccess SET accessStatus = '${accessStatus}' WHERE noteId = '${noteId}' AND userId = '${userId}'`,
        { type: QueryTypes.UPDATE }
      );
    }
    return "alterNoteAccess Success!!!";
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

async function selectCommentsByNoteIdHelper(noteId, parentId) {
  let comments = await sequelize.query(
    parentId === null
      ? `SELECT * FROM Comment WHERE noteId = ${noteId} AND parentId IS NULL`
      : `SELECT * FROM Comment WHERE noteId = ${noteId} AND parentId = ${parentId}`,
    {
      type: QueryTypes.SELECT,
    }
  );
  for (let i = 0; i < comments.length; i++) {
    comments[i].user = await selectUserByuserId(comments[i].userId);
  }
  return comments;
}

async function selectCommentsByNoteId(noteId) {
  try {
    let comments = await selectCommentsByNoteIdHelper(noteId, null);
    console.log(comments);

    for (let i = 0; i < comments.length; i++) {
      let replies = await selectCommentsByNoteIdHelper(noteId, comments[i].commentId);
      comments[i].replies = replies;
    }
    console.log(comments);
    return comments;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function insertComment(info) {
  try {
    const { noteId, userId, content, createdAt, parentId } = info;
    const noteAccess = await selectNoteAccessByNoteIdAndUserId(noteId, userId);
    const [data] = await sequelize.query(
      `SELECT commentId FROM Comment ORDER BY commentId DESC LIMIT 1`,
      { type: QueryTypes.SELECT }
    );
    console.log(`SELECT commentId FROM Comment ORDER BY commentId DESC LIMIT 1`, data);
    await sequelize.query(
      `INSERT INTO Comment(commentId, noteId, userId, createdAt, content, parentId) VALUES (${
        data.commentId + 1
      }, ${noteId}, '${userId}', ${createdAt}, '${content}', ${parentId})`,
      { type: QueryTypes.INSERT }
    );
  } catch (e) {
    throw new Error(e.message);
  }
}

// deprecated
async function likeNote(userId, noteId) {
  try {
    console.log("here");
    await sequelize.query(
      `
    DELIMITER $$
    CREATE TRIGGER LikeTrig
    BEFORE UPDATE ON Note
    FOR EACH ROW

    BEGIN
      SET @like = (SELECT * FROM NoteLike WHERE userId = ${userId} AND noteId = NEW.noteId);
      IF @like IS NULL THEN
        INSERT INTO NoteLike VALUES(${userId}, noteId);
      ELSE
        DELETE FROM NoteLike WHERE userId = ${userId} AND noteId = NEW.noteId;
        SET NEW.likeCount = NEW.likeCount - 2;
      END IF;

    END
    $$
    DELIMITER
    ;`,
      {
        type: QueryTypes.UPDATE,
      }
    );
    await sequelize.query(`UPDATE Note SET likeCount = likeCount + 1 WHERE noteId = ${noteId}`, {
      type: QueryTypes.UPDATE,
    });
    return;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function updateCommentContent(info) {
  try {
    const { commentId, content } = info;
    await sequelize.query(
      `UPDATE Comment SET content = '${content}' WHERE commentId = ${commentId}`,
      { type: QueryTypes.UPDATE }
    );
    return;
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
  selectCommentsByNoteId,
  insertComment,
  likeNote,
  updateCommentContent,
};
