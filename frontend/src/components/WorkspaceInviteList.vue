<template>
  <v-list width="240">
    <WorkspaceHeadline icon="mdi-account-supervisor-circle" title="invited user"/>
    <div class="px-2 pb-3 mt-3 mb-1">
      <v-btn block color="primary text-capitalize" @click="dialog = true">
        <v-icon left>mdi-account-plus</v-icon>
        Invite New Friend
      </v-btn>
    </div>
    <WorkspaceUserGroup title="owner" :users="getUsersByGroup('owner')" :change=true></WorkspaceUserGroup>
    <WorkspaceUserGroup title="editor" :users="getUsersByGroup('editor')"></WorkspaceUserGroup>
    <WorkspaceUserGroup title="viewer" :users="getUsersByGroup('viewer')"></WorkspaceUserGroup>
    <InvitationDialog :dialog.sync="dialog"></InvitationDialog>
  </v-list>
</template>

<script>
import WorkspaceHeadline from "@/components/WorkspaceHeadline.vue";
import WorkspaceUserGroup from "@/components/WorkspaceUserGroup.vue";
import InvitationDialog from "@/components/InvitationDialog.vue"
import { mapGetters, mapActions} from "vuex";

export default {
  name: "WorkspaceInviteList",
  components: {
    WorkspaceHeadline,
    WorkspaceUserGroup,
    InvitationDialog
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    ...mapActions(["initNoteState"]),
    getUsersByGroup(group){
      return this.sharedUsers.filter(user => user.accessStatus == group)
    },
  },
  data() {
    return {
      dialog: false,
      links: ["Home", "Contacts", "Settings"],
      sharedUsers: [
        {
          avatarUrl: "",
          firstName: "aaa",
          lastName: "bbb",
          accessStatus: "owner"
        },
        {
          avatarUrl: "",
          firstName: "bbb",
          lastName: "bbb",
          accessStatus: "viewer"
        },
        {
          avatarUrl: "",
          firstName: "bbb",
          lastName: "bbb",
          accessStatus: "viewer"
        },
        {
          avatarUrl: "",
          firstName: "ccc",
          lastName: "bbb",
          accessStatus: "editor"
        }
      ]
    };
  },
  async created(){
    // await this.initNoteState();
    console.log(this.$store.state.note.sharedUsers);
  }
};
</script>

<style>
.begin-line{
  width: 30px;
  height: 1px;
  background-color: #d1d1d1;
  margin-left: 8px;
  margin-right: 8px;
}
</style>
