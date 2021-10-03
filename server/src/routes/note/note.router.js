const express = require("express");
const {
  httpInsertNote,
  httpSelectUserNotes,
  httpTransferOwnership,
  httpSelectAllAccessorsByNoteId,
  httpSelectNoteByNoteId,
  HttpAlterNoteCommunity,
  HttpAlterNoteCategories,
  HttpAlterNoteAccess,
  httpSelectNoteAccessByNoteIdAndUserId,
  httpSelectAllCategories
} = require("./note.controller");

const noteRouter = express.Router();

noteRouter.post("/insert-note", httpInsertNote);

noteRouter.get("/get-user-notes", httpSelectUserNotes);

noteRouter.post("/transfer-note-ownership", httpTransferOwnership);

noteRouter.post("/get-all-accessors", httpSelectAllAccessorsByNoteId);

noteRouter.post("/get-note-by-noteId", httpSelectNoteByNoteId);

noteRouter.post("/alter-note-community", HttpAlterNoteCommunity);

noteRouter.post("/alter-note-categories", HttpAlterNoteCategories);

noteRouter.post("/alter-note-access", HttpAlterNoteAccess);

noteRouter.post("/get-note-access-by-noteId-userId", httpSelectNoteAccessByNoteIdAndUserId);

noteRouter.get("/get-all-categories", httpSelectAllCategories);

module.exports = noteRouter;
