<template>
    <v-card 
    :class="{'mx-3': phone}"
    @click="sendEmit"
    >
        <div 
            :class="{'justify-space-between': phone, 'd-flex':phone, 'flex-no-wrap':phone}"
        >
            <v-avatar v-if="phone"
                class="ma-3"
                size="100"
                tile
            >
                <v-img
                src="../assets/commnities-background.jpeg"
                class="white--text align-end"
                height="200px"
            >
                </v-img>
            </v-avatar>
            <v-img v-else
                src="../assets/commnities-background.jpeg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
            >
            </v-img>
            <div>
                <v-card-title v-text="info.name"></v-card-title>
                <v-card-subtitle>
                    <span class="overflow">
                        {{info.description}}
                    </span>
                </v-card-subtitle>
                <v-spacer></v-spacer>

                <!-- <v-icon>mdi-account-multiple</v-icon> -->
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    props:{
        info: Object,
        phone: Boolean
    },
    methods:{
        sendEmit(){
            this.$emit('getinfo', this.info);
            console.log("here")
        }
    }
    
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
  -webkit-line-clamp: 3;
}

.no-margin{
    margin:0
}


</style>