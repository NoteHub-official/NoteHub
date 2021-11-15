class Note {
  constructor(db) {
    this.collection = db.collection("notes");
  }

  async upsert(noteId, note) {
    const result = await this.collection.updateOne(
      { _id: noteId },
      { $set: note },
      { upsert: true }
    );
    return result;
  }

  async findOne(noteId) {
    const note = await this.collection.findOne({ _id: noteId });
    return note;
  }
}

//You can only access methods of this class from mongo.utils.
module.exports = Note;
