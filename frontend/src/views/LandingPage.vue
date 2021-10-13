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
      <v-card-text class="notex-content">
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
      extensions: [StarterKit, Image, Dropcursor],
      content: "",
    });
  },
  methods: {
    input() {
      console.log(this.formula);
    },
  },
  beforeDestroy() {
    this.editor.destroy();
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
  min-height: 770px;

  font-size: 1rem;

  outline: none !important;

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
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
      width: 100%;
      display: inline-block !important;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}
</style>
