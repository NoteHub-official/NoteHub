<template>
  <node-view-wrapper>
    <div
      class="notex-code-block d-flex"
      @mouseover="setFocused(true)"
      @mouseleave="setFocused(false)"
      :style="{ width: '100%' }"
    >
      <div class="d-flex align-center flex-column handles" contenteditable="false">
        <v-icon
          class="d-inline-block pt-2 drag-handle"
          :size="22"
          draggable="true"
          data-drag-handle
        >
          {{ focused ? "drag_indicator" : null }}
        </v-icon>
      </div>
      <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="160" offset-y left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="notex-code-block__language-select primary--text text-capitalize"
            v-bind="attrs"
            v-on="on"
            small
            text
            dense
          >
            {{ selectedLanguage !== null ? selectedLanguage : "Language" }}
          </v-btn>
        </template>
        <v-card>
          <div>
            <v-text-field
              class="px-2 pt-2"
              v-model="searchLanguage"
              dense
              label="Language"
              placeholder="Search language"
              outlined
              hide-details
            ></v-text-field>
          </div>
          <v-card-text class="pa-0">
            <v-list dense max-height="300" class="overflow-y-auto">
              <v-list-item-group v-model="selectedLanguage">
                <v-list-item
                  v-for="(language, index) in filteredLanguages"
                  :key="index"
                  @click="setLanguage(language)"
                >
                  <v-list-item-title>{{ language }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-menu>
      <node-view-content
        id="notex-code-block"
        class="notex-code-block__content"
        :class="`${textAlign} my-2 mr-2`"
        as="pre"
      />
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from "@tiptap/vue-2";

export default {
  name: "CodeBlockWrapper",
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: {
    nodeViewProps,
    node: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
    },
  },
  data() {
    return {
      focused: false,
      languages: [
        "assembly",
        "bash",
        "brainfuck",
        "c",
        "c#",
        "clojure",
        "coffeescript",
        "cpp",
        "css",
        "delphi",
        "erlang",
        "f#",
        "fortran",
        "go",
        "groovy",
        "haskell",
        "html",
        "java",
        "javascript",
        "kotlin",
        "lua",
        "MATLAB",
        "MIPS",
        "objective-c",
        "pascal",
        "perl",
        "php",
        "powershell",
        "python",
        "r",
        "ruby",
        "rust",
        "sass",
        "scala",
        "scss",
        "shell",
        "SQL",
        "smalltalk",
        "swift",
        "typescript",
        "visual basic",
      ],
      menu: false,
      searchLanguage: "",
    };
  },
  methods: {
    setFocused(focused) {
      this.focused = focused;
    },
    setLanguage(language) {
      this.updateAttributes({ language });
      this.menu = false;
    },
  },
  computed: {
    textAlign() {
      return `text-${this.node.attrs.textAlign}`;
    },
    filteredLanguages() {
      if (this.searchLanguage === "") return this.languages;
      return this.languages.filter((language) => {
        return language.toLowerCase().includes(this.searchLanguage.toLowerCase());
      });
    },
    selectedLanguage: {
      get() {
        return this.node.attrs.language;
      },
      /* eslint-disable-next-line */
      set(language) {},
    },
  },
};
</script>

<style lang="scss">
.notex-code-block {
  position: relative;

  .handles {
    width: 25px;
    opacity: 0.3;
  }

  .drag-handle {
    cursor: grab;
  }

  .setting-handle {
    cursor: pointer;
  }

  .notex-code-block__language-select {
    position: absolute;
    top: 11px;
    right: 11px;
  }

  .notex-code-block__content {
    text-indent: 0rem;
    margin-left: 0rem;
    padding: 0.5rem;
    width: calc(100% - 33px);
    display: inline;
    color: #fff;
    background: #1e1e1e;
    font-size: 0.8rem;
    font-family: "JetBrains Mono", monospace;
    border-radius: 0.3rem;
    // border-bottom-left-radius: 0.3rem;
    // border-bottom-right-radius: 0.3rem;
  }
}
</style>
