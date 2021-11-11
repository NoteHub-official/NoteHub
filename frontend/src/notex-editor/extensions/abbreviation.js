import { Mark } from "@tiptap/core";

export const Abbreviation = Mark.create({
  name: "abbreviation",

  parseHTML() {
    return [
      {
        tag: "abbr",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // … and return an object with HTML attributes.
    return ["abbr", HTMLAttributes, 0];
  },

  addAttributes() {
    return {
      title: {
        default: null,
      },
    };
  },
});
