<template>
    <v-card>
        <v-img
              :src="info.photo"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
        >
        </v-img>

        <v-card-title v-text="info.name"></v-card-title>
        <v-card-subtitle>
            <span class="overflow">
                {{info.description}}
            </span>
        </v-card-subtitle>
        <v-spacer></v-spacer>

        <v-icon>mdi-account-multiple</v-icon>
    </v-card>
</template>

<script>
export default {
    props:{
        info: Object
    },
}
</script>

<style>

.overflow{
  text-overflow: ellipsis;
  overflow: hidden;
  letter-spacing: 0;
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}


</style>