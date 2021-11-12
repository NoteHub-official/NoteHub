import { Node, mergeAttributes } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-2";
import DraggableBlock from "../components/DraggableBlock.vue";

export default Node.create({
  name: "draggableBlock",
  group: "block",
  content: "paragraph*",
  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="draggable-block"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    console.log("Testing Render Draggable Block.");
    return [
      "draggable-block",
      mergeAttributes(HTMLAttributes, { "data-type": "draggable-block" }),
      0,
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(DraggableBlock);
  },

  addCommands() {
    return {
      setDraggableBlock: (attributes) => ({ commands }) => {
        console.log("Testing Draggable Block.");
        return commands.setNode("draggableBlock", attributes);
      },
    };
  },
});
