<template>
  <div>
    <v-card outlined>
      <v-card-text
        :class="{ 'py-3': uploadedImage == null, 'pa-0': uploadedImage !== null }"
        :style="`height: ${height}px;`"
      >
        <div
          v-if="uploadedImage === null"
          class="d-flex flex-column upload-border justify-center align-center"
          style="height: 100%;"
          dense
          @drop.prevent="onDrop($event)"
          @dragover.prevent="dragover = true"
          @dragenter.prevent="dragover = true"
          @dragleave.prevent="dragover = false"
          :class="{ primary: dragover }"
          @click="$refs.inputRef.click()"
        >
          <v-icon size="60" :color="dragover ? 'white' : 'info'">mdi-cloud-upload</v-icon>
          <p class="mb-2" :class="dragover ? 'white--text' : 'info--text'">
            Drop your file here, or click to select them.
          </p>
          <p v-show="error" class="error--text mb-0">
            {{ message }}
          </p>
        </div>
        <div
          v-else
          class="d-flex justify-center align-center overflow-hidden"
          style="height: 100%;"
        >
          <v-img class="info" contain :max-height="height" max-width="100%" :src="imageUrl"></v-img>
        </div>
      </v-card-text>
      <input ref="inputRef" type="file" accept="image/*" v-show="false" @change="onDrop($event)" />
      <v-divider v-show="uploadedImage !== null"></v-divider>
      <v-card-actions class="py-0">
        <v-spacer></v-spacer>
        <v-tooltip bottom transition="all 0.3s">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="reset" v-show="uploadedImage !== null" v-bind="attrs" v-on="on">
              <v-icon color="error">delete</v-icon>
            </v-btn>
          </template>
          <span>Delete Image</span>
        </v-tooltip>
        <!-- For Future Reference -->
        <!-- <v-btn icon v-show="uploadedImage !== null">
        <v-icon id="upload-button">mdi-upload</v-icon>
      </v-btn> -->
      </v-card-actions>
    </v-card>
    <!-- Helper Input for Form Validation -->
    <v-input type="file" v-model="uploadedImage" :rules="rules"> </v-input>
  </div>
</template>

<script>
export default {
  name: "ImageUpload",
  props: {
    uploadedImage: {
      required: false,
    },
    height: {
      default: 200,
    },
    rules: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      dragover: false,
      error: false,
      message: "",
    };
  },
  methods: {
    onDrop(e) {
      this.dragover = false;
      const files = e.dataTransfer ? [...e.dataTransfer.files] : [...e.target.files];
      if (files.length > 1) {
        this.error = true;
        this.message = "Only 1 image file is accepted!";
      } else if (this.validateImageFile(files[0])) {
        this.error = false;
        this.$emit("update:uploadedImage", files[0]);
      } else {
        this.error = true;
        this.message = "You must upload an image!";
      }
    },
    reset() {
      this.$emit("update:uploadedImage", null);
    },
    validateImageFile(file) {
      const fileName = file.name;
      const fileType = file.type;
      const fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
      if (fileType.match(/image\/*/) == null) {
        return false;
      }
      if (
        fileExtension != "jpg" &&
        fileExtension != "png" &&
        fileExtension != "jpeg" &&
        fileExtension != "gif"
      ) {
        return false;
      }
      return true;
    },
  },
  computed: {
    imageUrl() {
      if (this.uploadedImage === null) return null;
      const objectURL = URL.createObjectURL(this.uploadedImage);
      return objectURL;
    },
  },
};
</script>

<style scoped>
.upload-border {
  border-radius: 5px;
  transition: all 0.1s linear;
  border: 2px dashed;
}
.upload-border:hover {
  cursor: pointer;
}
</style>
