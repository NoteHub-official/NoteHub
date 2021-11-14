import { Node, mergeAttributes } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-2";
import DraggableBlock from "../components/DraggableBlock.vue";

export default Node.create({
  name: "draggableBlock",
  group: "block",
  content: "codeBlock",
  draggable: true,
  code: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="draggable-block"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    console.log("Testing Render Draggable Block.");

    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "draggable-block" }), 0];
  },

  addNodeView() {
    // if it parent node is doc, render node view, else return
    return VueNodeViewRenderer(DraggableBlock);
  },

  addCommands() {
    return {
      setDraggableBlock: (attributes) => ({ commands }) => {
        console.log("Testing Draggable Block.");
        return commands.setNode("draggableBlock", attributes);
      },
      toggleDraggableBlock: (attributes) => ({ commands }) => {
        console.log("Testing Draggable Block.");
        return commands.toggleNode("draggableBlock", "paragraph", attributes);
      },
    };
  },
});
