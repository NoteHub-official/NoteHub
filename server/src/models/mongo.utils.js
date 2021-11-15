const { MongoClient } = require("mongodb");
const Note = require("./note.repository");


const url =
  "mongodb+srv://notehubRoot:notehub123123@cluster0.n6o3n.mongodb.net/notehub?retryWrites=true&w=majority";
class MongoBot {
  constructor() {
    this.client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  async init() {
    await this.client.connect();
    console.log("mongodb connected");

    this.db = this.client.db("notehub");
    this.notes = new Note(this.db);
    //return all data in the collections

    //console.log(await this.db.collection("notes").find({}));
  }
}

module.exports = new MongoBot();
