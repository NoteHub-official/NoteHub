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
      <node-view-content
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
    };
  },
  methods: {
    setFocused(focused) {
      this.focused = focused;
    },
  },
  computed: {
    textAlign() {
      return `text-${this.node.attrs.textAlign}`;
    },
  },
};
</script>

<style lang="scss">
.notex-code-block {
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

  .notex-code-block__content {
    padding: 0.5rem;
    width: calc(100% - 25px);
    display: inline;
    color: #fff;
    background: #1e1e1e;
    border-radius: 0.3rem;
    font-size: 0.8rem;
    font-family: "JetBrains Mono", monospace;
  }
}
</style>
