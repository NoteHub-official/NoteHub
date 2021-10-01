const {
  insertNote,
  selectNotesByUserId,
  selectAllAccessorsByNoteId,
  transferOwnership,
  selectNoteByNoteId,
} = require("../../models/note.sql");

const { checkIfCurrentUser } = require("../firebase/firebase.middleware");
const { selectUserByEmail } = require("../../models/user.sql");
async function httpInsertNote(req, res) {
  const newNote = req.body;
  if (!newNote.noteTitle || !newNote.dataUrl || !newNote.ownnerId) {
    return res.status(400).json({ error: "Missing info" });
  }

  newNote["createdAt"] = Date.now();
  // CREATE note
  //     noteTitle
  //     dataUrl
  //     createdAt
  try {
    return res.status(201).json(await insertNote(newNote));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpSelectNotesByUserId(req, res) {
  try {
    return res.status(200).json(await selectNotesByUserId(req.body.userId));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpTransferOwnership(req, res) {
  try {
    const { noteId, oldOwnerId, newOwnerId } = req.body;
    currentNote = await selectNoteByNoteId(noteId);
    currentUser = await selectUserByEmail(req.email);

    if (currentNote.ownerId != currentUserId.userId) {
      return res
        .status(401)
        .json({ error: "No permission to do such operation" });
    }

    return res
      .status(200)
      .json(await transferOwnership(noteId, oldOwnerId, newOwnerId));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpSelectAllAccessorsByNoteId(req, res) {
  try {
    return res
      .status(200)
      .json(await selectAllAccessorsByNoteId(req.body.noteId));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

module.exports = {
  httpInsertNote,
  httpSelectNotesByUserId,
  httpTransferOwnership,
  httpSelectAllAccessorsByNoteId,
};
