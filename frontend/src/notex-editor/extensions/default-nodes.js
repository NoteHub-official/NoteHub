// tiptap
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { VueNodeViewRenderer } from "@tiptap/vue-2";
// helper libraries
import { lowlight } from "lowlight";
// components
import BulletListWrapper from "@/notex-editor/components/BulletListWrapper.vue";
import OrderedListWrapper from "@/notex-editor/components/OrderedListWrapper.vue";
import BlockQuoteWrapper from "@/notex-editor/components/BlockQuoteWrapper.vue";
import CodeBlockWrapper from "@/notex-editor/components/CodeBlockWrapper.vue";

export const NotexParagraph = Paragraph.extend({
  draggable: false,
}).configure({
  HTMLAttributes: {
    class: "info--text text-body1 pl-6 pr-2 py-1 ma-0",
  },
});

export const NotexBulletList = BulletList.extend({
  draggable: true,
  addNodeView() {
    return VueNodeViewRenderer(BulletListWrapper);
  },
});

export const NotexOrderedList = OrderedList.extend({
  draggable: true,
  addNodeView() {
    return VueNodeViewRenderer(OrderedListWrapper);
  },
});

export const NotexListItem = ListItem.extend({
  draggable: false,
});

export const NotexHeading = Heading.extend({
  addOptions() {
    return {
      levels: [1, 2, 3],
    };
  },
}).configure({
  HTMLAttributes: {
    class: "pa-2 pl-6",
  },
});

export const NotexCodeBlock = CodeBlockLowlight.extend({
  draggable: true,
  addNodeView() {
    return VueNodeViewRenderer(CodeBlockWrapper);
  },
}).configure({
  lowlight,
  HTMLAttributes: {
    class: "code",
  },
});

export const NotexBlockquote = Blockquote.extend({
  content: "paragraph*",
  draggable: true,
  addNodeView() {
    return VueNodeViewRenderer(BlockQuoteWrapper);
  },
});
