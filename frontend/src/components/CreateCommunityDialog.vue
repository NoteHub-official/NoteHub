<template>
  <v-dialog :value="createCommunityDialog" @input="toggleDialog()" :width="550">
    <v-card :loading="loading">
      <v-card-title class="text-h6 info--text">
        {{ loading ? "Creating..." : "Create a New Community" }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pb-0">
        <v-form ref="createCommunityForm">
          <v-text-field
            class="mt-7"
            outlined
            dense
            label="Community Name"
            placeholder="Awsome community ..."
            v-model="communityName"
            append-icon="drive_file_rename_outline"
            :rules="[
              (communityName && communityName.length > 0) || 'Community name must be non-empty',
            ]"
            :disabled="loading"
          >
          </v-text-field>
          <v-textarea
            class="mt-2 mb-1"
            outlined
            counter
            name="input-7-4"
            label="Community Description"
            v-model="communityDescription"
            :rules="[
              (v) => (v && v.length <= 300) || 'Max 300 characters',
              (v) => (v && v.length > 0) || 'Description must be non-empty',
            ]"
            :disabled="loading"
          ></v-textarea>
          <ImageUpload
            :height="280"
            :uploadedImage.sync="uploadedImage"
            :rules="[(v) => (v && v !== null) || 'Image must not be empty']"
            :disabled="loading"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="createCommunity()" :disabled="loading"> Create </v-btn>
        <v-btn color="error" text @click="reset()" :disabled="loading"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ImageUpload from "@/components/ImageUpload.vue";

export default {
  name: "CreateCommunityDialog",
  components: { ImageUpload },
  props: {
    createCommunityDialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      communityName: "",
      communityDescription: "",
      uploadedImage: null,
      loading: false,
    };
  },
  methods: {
    ...mapActions(["createCommunityByUser"]),
    ...mapMutations(["snackbarSuccess"]),
    async createCommunity() {
      if (!this.$refs.createCommunityForm.validate()) return;
      this.loading = true;
      const payload = {
        name: this.communityName,
        description: this.communityDescription,
        photoFile: this.uploadedImage,
        ownerId: this.currentUser.userId,
      };
      await this.createCommunityByUser(payload);
      setTimeout(() => {
        this.reset();
        this.snackbarSuccess("New community has been created!");
        this.$refs.createCommunityForm.reset();
      }, 1000);
    },
    reset() {
      this.toggleDialog();
      this.communityName = "";
      this.communityDescription = "";
      this.uploadedImage = null;
      this.loading = false;
    },
    toggleDialog() {
      this.$emit("update:createCommunityDialog", !this.createCommunityDialog);
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
};
</script>

<style></style>
