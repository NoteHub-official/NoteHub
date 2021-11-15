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
  getAuthTokenFromHeader,
  getUserInfoFromFirebase,
} = require("../routes/firebase/firebase.utils");

const { selectNoteAccessByNoteIdAndUserId } = require("../models/note.sql");
const fs = require("fs");
const {
  TiptapTransformer,
  ProsemirrorTransformer,
} = require("@hocuspocus/transformer");

const hooks = {
  async onConnect(data) {
    
    const token = getAuthTokenFromHeader(data.request);
    const userInfo = await getUserInfoFromFirebase(token);
    if (userInfo.email === "Invalid") {
      throw new Error("invalid email");
    }

    const user = await selectUserByEmail(userInfo.email);

    if (user === null) {
      throw new Error("invalid user");
    }

    const row = await selectNoteAccessByNoteIdAndUserId(
      data.documentName,
      user.userId
    );
    if (row === null) {
      throw new Error("You cannot access this note!");
    }

    return {
      user: {
        id: user.userId,
        name: user.firstName,
      },
    };
    // } catch (e) {
    //   // NEED TO CHANGE TO TYPESCRIPT!
    //   console.log(e);
    //   throw new Error(e);
    // }
  },

  async onDisconnect(data) {
    // Output some information
    console.log(` websocket disconnection`);
    console.log(`"${data.context.user.name}" has disconnected.`);
  },

  async onLoadDocument(data) {
    console.log(`"${data.context.user.name}" is loading the document.`);
    // Print current working directory:
    console.log(__dirname);

    // The tiptap collaboration extension uses shared types of a single y-doc
    // to store different fields in the same document.
    // The default field in tiptap is simply called 'default'
    const fieldName = "default";

    // Check if the given field already exists in the given y-doc.
    // Important: Only import a document if it doesn't exist in the primary data storage!
    if (!data.document.isEmpty(fieldName)) {
      return;
    }

    // Get the document from somwhere. In a real world application this would
    // probably be a database query or an API call
    const prosemirrorJSON = JSON.parse(fs.readFileSync(`./test.json`) || "{}");
    console.log(prosemirrorJSON);

    // Convert the editor format to a y-doc. The TiptapTransformer requires you to pass the list
    // of extensions you use in the frontend to create a valid document
    return TiptapTransformer.toYdoc(prosemirrorJSON, fieldName, [
      Document,
      Paragraph,
      Text,
      Heading,
    ]);
  },
};

module.exports = hooks;
