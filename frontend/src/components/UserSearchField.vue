<template>
  <v-autocomplete
    item-text="searchFields"
    item-value="userId"
    outlined
    :value="selectedUsers"
    @input="changeSelectedUsers($event)"
    :items="searchResult"
    label="Email / Name"
    multiple
    placeholder="Type email or name for that person"
    :disabled="loading"
    hide-details
    :search-input.sync="search"
    @update:search-input="updateSearchInput($event)"
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="removeUser(data.item)"
      >
        <v-avatar left>
          <UserAvatar :avatarUrl="data.item.avatarUrl" :firstname="data.item.name" :size="20" />
        </v-avatar>
        {{ data.item.name }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template>
        <v-list-item-avatar>
          <UserAvatar :avatarUrl="data.item.avatarUrl" :firstname="data.item.name" :size="40" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ data.item.name }} </v-list-item-title>
          <v-list-item-subtitle>{{ data.item.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";
import _debounce from "lodash/debounce";
import { mapActions } from "vuex";

export default {
  name: "UserSearchField",
  components: { UserAvatar },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    searchResult: {
      type: Array,
      default: () => [],
    },
    selectedUsers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      search: "",
      searching: false,
    };
  },
  methods: {
    ...mapActions(["searchUserByKeyword"]),
    changeSelectedUsers(users) {
      this.$emit("change-selected-users", users);
    },
    removeUser(item) {
      const index = this.selectedUsers.indexOf(item.userId);
      const newUsers = [...this.selectedUsers];
      newUsers.splice(index, 1);
      if (index >= 0) this.changeSelectedUsers(newUsers);
    },
    updateSearchInput(search) {
      this.searching = true;
      this.searchUsers(search);
    },
    searchUsers: _debounce(async function(search) {
      this.searching = false;
      if (search !== "") {
        const users = await this.searchUserByKeyword(search);
        console.log(users);
        this.$emit(
          "search-complete",
          users.map((item) => ({
            ...item,
            searchFields: [item.email, item.name],
          }))
        );
      }
      return [];
    }, 600),
  },
};
</script>

<style></style>
