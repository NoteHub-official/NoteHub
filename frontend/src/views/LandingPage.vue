<template>
  <v-container class="fill-height">
    <v-card width="100%" class="d-flex flex-column" elevation="0">
      <v-toolbar flat dense>
        <v-toolbar-title class="grey--text">
          <v-btn text @click="val++" class="text-capitalize px-5">
            Untitled Notebook {{ val }}
          </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <div>
        <v-btn
          outlined
          small
          :class="{ 'is-active': editor.isActive('draggableBlock') }"
          @click="setList()"
        >
          List
        </v-btn>
        <v-btn
          outlined
          small
          :class="{ 'is-active': editor.isActive('draggableBlock') }"
          @click="setRawParagraph()"
        >
          Raw
        </v-btn>
        <v-btn
          outlined
          small
          :class="{ 'is-active': editor.isActive('notexCodeBlock') }"
          @click="
            editor
              .chain()
              .setNotexCodeBlock()
              .focus()
              .run()
          "
        >
          CodeBlock With nodeView
        </v-btn>
        <v-btn
          outlined
          small
          :class="{ 'is-active': editor.isActive('textStyle', { class: 'rainbow' }) }"
          @click="
            editor
              .chain()
              .toggleMark('textStyle', { class: 'rainbow' })
              .focus()
              .run()
          "
        >
          Rainbow</v-btn
        >
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .toggleHighlight()
              .run()
          "
          :class="{ 'is-active': editor.isActive('highlight') }"
        >
          highlight
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          "
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          bold
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          "
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          italic
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .toggleStrike()
              .run()
          "
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          strike
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .toggleCode()
              .run()
          "
          :class="{ 'is-active': editor.isActive('code') }"
        >
          code
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .unsetAllMarks()
              .run()
          "
        >
          clear marks
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .clearNodes()
              .run()
          "
        >
          clear nodes
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .setParagraph()
              .run()
          "
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          paragraph
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 1 })
              .run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          h1
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          h2
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          h3
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 4 })
              .run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        >
          h4
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 5 })
              .run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        >
          h5
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 6 })
              .run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        >
          h6
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          "
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          bullet list
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          "
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          ordered list
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          "
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          blockquote
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .setHorizontalRule()
              .run()
          "
        >
          horizontal rule
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .setHardBreak()
              .run()
          "
        >
          hard break
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .undo()
              .run()
          "
        >
          undo
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .redo()
              .run()
          "
        >
          redo
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .setTextAlign('left')
              .run()
          "
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          left
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .setTextAlign('center')
              .run()
          "
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          center
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .setTextAlign('right')
              .run()
          "
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          right
        </v-btn>
        <v-btn
          outlined
          small
          @click="
            editor
              .chain()
              .focus()
              .setTextAlign('justify')
              .run()
          "
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        >
          justify
        </v-btn>
      </div>
      <v-divider></v-divider>
      <div class="notexBackground pa-0">
        <EditorContent :editor="editor" class="notex-content" />
      </div>
    </v-card>
    <pre><code>{{output}}</code></pre>
  </v-container>
</template>

<script>
/* eslint-disable */
import { Editor, EditorContent } from "@tiptap/vue-2";
import { getRandomColor } from "@/includes/utils";
import { mapGetters } from "vuex";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { lowlight } from "lowlight";
/* eslint-disable */
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Collaboration from "@tiptap/extension-collaboration";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Dropcursor from "@tiptap/extension-dropcursor";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import TextAlign from "@tiptap/extension-text-align";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Focus from "@tiptap/extension-focus";
import { generateHTML } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-2";
// Notex imports
import { Abbreviation } from "@/notex-editor/extensions/abbreviation";
import { CustomClass } from "@/notex-editor/extensions/custom_class";
import { TrailingNode } from "@/notex-editor/extensions/trailing-node";
import BulletListWrapper from "@/notex-editor/components/BulletListWrapper.vue";
import OrderedListWrapper from "@/notex-editor/components/OrderedListWrapper.vue";
import BlockQuoteWrapper from "@/notex-editor/components/BlockQuoteWrapper.vue";
import CodeBlockWrapper from "@/notex-editor/components/CodeBlockWrapper.vue";
import HeadingWrapper from "@/notex-editor/components/HeadingWrapper.vue";

const ydoc = new Y.Doc();
const provider = new HocuspocusProvider({
  document: ydoc,
  url: "wss://connect.tiptap.dev",
  name: "NoteHub-test123123123-12312",
  broadcast: false,
});

const CustomTextStyle = TextStyle.extend({
  parseHTML() {
    return [
      {
        tag: "span",
      },
    ];
  },
});

const NotexParagraph = Paragraph.extend({
  draggable: false,
  // addNodeView() {
  //   return VueNodeViewRenderer(DraggableBlock);
  // },
});

const NotexBulletList = BulletList.extend({
  draggable: true,
  addNodeView() {
    return VueNodeViewRenderer(BulletListWrapper);
  },
});

const NotexOrderedList = OrderedList.extend({
  draggable: true,
  addNodeView() {
    return VueNodeViewRenderer(OrderedListWrapper);
  },
});

const NotexListItem = ListItem.extend({
  draggable: false,
});

const NotexHeading = Heading.extend({
  addOptions() {
    return {
      levels: [1, 2, 3],
    };
  },
  // addNodeView() {
  //   return VueNodeViewRenderer(HeadingWrapper);
  // },
});

const NotexCodeBlock = CodeBlockLowlight.extend({
  draggable: true,
  addNodeView() {
    return VueNodeViewRenderer(CodeBlockWrapper);
  },
});

const NotexBlockquote = Blockquote.extend({
  content: "paragraph*",
  draggable: true,
  addNodeView() {
    return VueNodeViewRenderer(BlockQuoteWrapper);
  },
});

export default {
  name: "LandingPage",
  components: {
    EditorContent,
  },
  data() {
    return {
      val: 0,
      editor: null,
      code: "",
      config: {
        smartMode: true,
        virtualKeyboardMode: "manual",
      },
    };
  },
  created() {
    this.editor = new Editor({
      extensions: this.notexExtensions,
      autofocus: true,
      // editable: false,
    });
  },
  methods: {
    input() {
      console.log(this.formula);
    },
    setNestedCodeBlock() {
      this.editor
        .chain()
        .focus()
        .insertContent({
          type: "draggableBlock",
          content: [
            {
              type: "codeBlock",
              attrs: {
                language: null,
              },
              content: [],
            },
          ],
        })
        .run();
    },
    setRawParagraph() {
      this.editor
        .chain()
        .focus()
        .insertContent({
          type: "rawParagraph",
          content: [],
        })
        .run();
    },
    setList() {
      this.editor
        .chain()
        .focus()
        .insertContent({
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [],
            },
          ],
        })
        .run();
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),

    output() {
      return this.editor.getJSON();
    },
    notexExtensions() {
      return [
        StarterKit.configure({
          history: false,
        }),
        Image,
        Typography,
        Highlight,
        Dropcursor,
        CustomTextStyle,
        Abbreviation,
        NotexBulletList,
        NotexOrderedList,
        NotexHeading.configure({
          HTMLAttributes: {
            class: "pa-2",
          },
        }),
        NotexBlockquote,
        NotexListItem,
        Focus.configure({
          className: "elevation-3",
          mode: "shallowest",
        }),
        NotexParagraph.configure({
          HTMLAttributes: {
            class: "info--text text-body1 px-2",
          },
        }),
        TextAlign.configure({
          types: ["heading", "paragraph", "rawParagraph"],
        }),
        NotexCodeBlock.configure({
          lowlight,
          HTMLAttributes: {
            class: "code",
          },
        }),
        Collaboration.configure({ document: ydoc }),
        CollaborationCursor.configure({
          provider,
          user: { name: `${this.currentUser.firstname}`, color: getRandomColor() },
        }),
        CustomClass,
        TrailingNode,
      ];
    },
  },
  beforeUnmount() {
    this.editor.destroy();
    provider.destroy();
  },
};
</script>

<style lang="scss">
.notex-content {
  min-height: 780px;
}
.btn {
  text-transform: none !important;
}

.ProseMirror-focused {
  outline: none;
}

.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  h1 {
    font-size: 2.6rem;
    font-weight: 600;
    line-height: 1;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    line-height: 1.4;
  }

  li::marker {
    font-size: 1rem;
    font-weight: 400;
  }

  li {
    text-indent: -0.4rem;
    margin-left: 0.5rem;
  }

  code {
    background: #1e1e1e !important;
    color: #f8f8f2 !important;
    padding: 0.1rem;
    font-size: 0.8rem;
    font-family: "JetBrains Mono", monospace;
  }

  pre {
    color: #fff;
    background: #1e1e1e;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.3rem;

    code {
      padding: 0;
      font-size: 0.8rem;
      font-family: "JetBrains Mono", monospace;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }

  blockquote {
    box-sizing: content-box;
    padding-left: 0.4rem;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 1rem 0;
  }
}

/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

/* Give a remote user a caret */
.collaboration-cursor__caret {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid #0d0d0d;
  border-right: 1px solid #0d0d0d;
  word-break: normal;
  pointer-events: none;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #0d0d0d;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
}

.rainbow {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, red);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.is-active {
  background-color: #faf594;
}

.theme--dark.v-application {
  code {
    background: none;
  }
  blockquote {
    border-left: 5px solid rgba(#ffffff, 0.8);
  }
}

.theme--light.v-application {
  code {
    background: none;
  }
  blockquote {
    border-left: 5px solid rgba(#0d0d0d, 0.5);
  }
}

blockquote {
  margin-block-start: none;
  margin-block-end: none;
  margin-inline-start: none;
  margin-inline-end: none;
}
</style>
