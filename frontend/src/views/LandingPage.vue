<template>
  <v-container class="fill-height">
    <v-card width="100%">
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
      <v-divider></v-divider>
      <math-field v-model="formula"> </math-field>
      <div>
        {{ formula }}
      </div>
      <v-card-text>
        <EditorContent :editor="editor" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { mapGetters } from "vuex";
import { getRandomColor } from "@/includes/utils";

const ydoc = new Y.Doc();
const provider = new HocuspocusProvider({
  document: ydoc,
  url: "wss://connect.tiptap.dev",
  name: "NoteHub123",
  broadcast: false,
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
      formula: "h(x)",
      config: {
        smartMode: true,
        virtualKeyboardMode: "manual",
      },
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Image,
        Dropcursor,
        Collaboration.configure({ document: ydoc }),
        Paragraph,
        Text,
        CodeBlockLowlight.configure({
          lowlight,
        }),
        CollaborationCursor.configure({
          provider,
          user: { name: `${this.currentUser.firstname}`, color: getRandomColor() },
        }),
      ],
    });
  },
  methods: {
    input() {
      console.log(this.formula);
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),
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

.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }
  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
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
</style>
