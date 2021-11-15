import { Extension } from "@tiptap/core";

export const Rainbow = Extension.create({
  name: "customClass",

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          class: {
            default: "",
          },
        },
      },
    ];
  },
});
