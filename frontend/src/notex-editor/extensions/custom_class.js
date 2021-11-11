import { Extension } from "@tiptap/core";

export const CustomClass = Extension.create({
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
