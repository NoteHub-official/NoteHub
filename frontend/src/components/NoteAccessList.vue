<template>
  <v-list class="elevation-1" max-height="400" :style="{ overflow: 'scroll' }">
    <v-list-item-group v-model="model" color="info">
      <v-list-item dense v-for="(user, idx) in sharedUsers" :key="`shaerd-user-noteaccess-${idx}`">
        <v-list-item-avatar>
          <UserAvatar
            :firstname="user.firstName"
            :lastname="user.lastName"
            :avatarUrl="user.avatarUrl"
            :size="38"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-capitalize">
            {{ user.firstName }} {{ user.lastName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text small v-bind="attrs" v-on="on" class="info--text d-flex justify-start">
                {{ user.accessStatus }}
                <v-icon right :size="23">arrow_drop_down</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-btn
                block
                text
                left
                class="info--text text-capitalize d-flex justify-start"
                v-for="action in statusActions"
                :key="action.status"
                @click="action.onClick(idx)"
              >
                <v-icon left>{{ action.icon }}</v-icon>
                {{ action.label }}
              </v-btn>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import UserAvatar from "./UserAvatar.vue";
import { mapActions } from "vuex";

export default {
  name: "NoteAccessList",
  components: {
    UserAvatar,
  },
  props: {
    sharedUsers: {
      type: Array,
      required: true,
    },
    noteId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      model: 0,
      statusActions: [
        {
          label: "Viewer",
          onClick: (idx) => this.changeAccessStatus(idx, true),
          icon: "remove_red_eye",
        },
        { label: "Editor", onClick: (idx) => this.changeAccessStatus(idx, false), icon: "edit" },
        { label: "Remove", onClick: (idx) => this.deleteAccess(idx), icon: "delete" },
      ],
    };
  },
  methods: {
    ...mapActions(["changeNoteAccessStatus", "deleteSharedUserById"]),
    async changeAccessStatus(idx, viewer) {
      const newStatus = viewer ? "viewer" : "editor";
      try {
        await this.changeNoteAccessStatus({
          noteId: this.noteId,
          userId: this.sharedUsers[idx].userId,
          accessStatus: newStatus,
        });
        this.sharedUsers[idx].accessStatus = newStatus;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteAccess(idx) {
      try {
        await this.deleteSharedUserById({
          noteId: this.noteId,
          userId: this.sharedUsers[idx].userId,
        });
        this.sharedUsers.splice(idx, 1);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
