const express = require("express");
const {
  httpInsertNote,
  httpSelectNotesByUserId,
  httpTransferOwnership,
  httpSelectAllAccessorsByNoteId,
} = require("./note.controller");

const noteRouter = express.Router();

noteRouter.post("/insert-note", httpInsertNote);

noteRouter.post("/get-notes-by-userid", httpSelectNotesByUserId);

noteRouter.post("/transfer-note-ownership", httpTransferOwnership);

noteRouter.post("/get-all-accessors", httpSelectAllAccessorsByNoteId);

