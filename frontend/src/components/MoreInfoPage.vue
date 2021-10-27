<template>
    <div class="d-flex" style="z-index:999">
        <v-card style="background-color: White; color: Black">
            <v-icon class="float-right" @click = "sendLeave" style="color: Black">
                mdi-close
            </v-icon>
            <v-card-title>{{moreInfo.name}}</v-card-title>
            <v-card-subtitle>
                <span class="overflow" style="color:black">
                    {{moreInfo.description}} 
                </span>
            </v-card-subtitle>
        </v-card>
    </div>
</template>

<script>
export default {
    props:{
        moreInfo: Object
    },
    methods: {
        sendLeave(){
            this.$emit("getLeave")
        }
    }
}
</script>

<style>
</style>