/* 
    A list of hooks provided by hocuspocus 
    See details at HocusPocus websote
*/
const { Document } = require("@tiptap/extension-document");
const { Paragraph } = require("@tiptap/extension-paragraph");
const { Text } = require("@tiptap/extension-text");
const { Heading } = require("@tiptap/extension-heading");

const { selectUserByEmail } = require("../models/user.sql");
const {
  getUserInfoFromFirebase,
} = require("../routes/firebase/firebase.utils");
const { selectNoteAccessByNoteIdAndUserId } = require("../models/note.sql");

const fs = require("fs");

const mongo = require("../models/mongo.utils");

const {
  TiptapTransformer,
  ProsemirrorTransformer,
} = require("@hocuspocus/transformer");

var debounce = require("debounce");


let debounced;

const hooks = {

  async onConnect(data) {
    console.log("A new connection has been established");
  },

  async onAuthenticate(data) {
    const { token } = data;
    console.log("Authentication requested");

    //console.log(token)

    const userInfo = await getUserInfoFromFirebase(token);
    if (userInfo.email === "Invalid") {
      throw new Error("invalid email");
    }

    const user = await selectUserByEmail(userInfo.email);

    if (user === null) {
      throw new Error("invalid user");
    }

    const access = await selectNoteAccessByNoteIdAndUserId(
      data.documentName,
      user.userId
    );
    if (access === null) {
      throw new Error("You cannot access this note!");
    }

    // If the user is only a viewer
    if (access === "viewer") {
      data.connection.readOnly = true;
    }
    console.log("Authentication pass");
    return {
      user: {
        id: user.userId,
        name: user.firstName,
      },
    };
  },

  async onLoadDocument(data) {
    console.log(`"${data.context.user.name}" is loading the document.`);
    // Print current working directory:

    // The tiptap collaboration extension uses shared types of a single y-doc
    // to store different fields in the same document.
    // The default field in tiptap is simply called 'default'
    const fieldName = "default";

    // Check if the given field already exists in the given y-doc.
    // Important: Only import a document if it doesn't exist in the primary data storage!
    if (!data.document.isEmpty(fieldName)) {
      console.log("Document is already in primary dbfield: " + fieldName);
      return;
    }

    
    const rawJson = await mongo.notes.findOne(data.documentName);
    console.log(rawJson);

    //console.log(prosemirrorJSON);
    console.log("load finished");
    // Convert the editor format to a y-doc. The TiptapTransformer requires you to pass the list
    // of extensions you use in the frontend to create a valid document
    return TiptapTransformer.toYdoc(rawJson.default, fieldName, [
      Document,
      Paragraph,
      Text,
      Heading,
    ]);
  },

  async onDisconnect(data) {
    // Output some information
    console.log(` websocket disconnection`);
    console.log(`"${data.context.user.name}" has disconnected.`);

    const prosemirrorJSON = TiptapTransformer.fromYdoc(data.document);

    var count = Object.keys(prosemirrorJSON).length;

    const save = async () => {
      const prosemirrorJSON = TiptapTransformer.fromYdoc(data.document);
      // Save your document. In a real-world app this could be a database query
      // a webhook or something else
      
      const out = await mongo.notes.upsert(data.documentName, prosemirrorJSON);
      console.log(out)
      // Maybe you want to store the user who changed the document?
      // Guess what, you have access to your custom context from the
      // onConnect hook here. See authorization & authentication for more
      // details
      console.log(
        `Saving ${data.documentName} last changed by ${data.context.user.name}`
      );
    };

    // Save the document
    save();
  },

  async onChange(data) {
    // return null if debounced is undefined
    debounced?.clear();
    debounced = debounce(() => {
      console.log(`${data.documentName} is changing`);
      const prosemirrorJSON = TiptapTransformer.fromYdoc(data.document);

      const size = new TextEncoder().encode(
        JSON.stringify(prosemirrorJSON)
      ).length;
      const kiloBytes = size / 1024;
      console.log(`JSON size in KB: ${kiloBytes}`);
    }, 1000);
    debounced();
  },

};

module.exports = hooks;
