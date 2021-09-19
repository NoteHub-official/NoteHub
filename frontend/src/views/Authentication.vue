<template>
  <v-container class="auth-background fill-height pa-15 justify-center" fluid>
    <v-sheet height="800" width="100%" elevation="10" rounded :width="hidePicture ? 450 : 1600">
      <v-card flat tile class="fill-height d-flex" color="grey lighten-2">
        <v-card class="fill-height flex-grow-1 overflow-hidden" v-show="!hidePicture">
          <div class="fill-height white auth-picture"></div>
        </v-card>
        <v-card flat tile class="pa-0" style="width: 450px;" rounded>
          <div class="grey darken-3 grey-bg px-10" :style="`padding-top: ${login ? 150 : 120}px;`">
            <v-card class="px-5 py-2" height="380" elevation="7" v-if="login">
              <v-card-title class="justify-center">
                <h1 class="text-h4 font-weight-medium">Login</h1>
              </v-card-title>
              <v-divider></v-divider>
              <v-form class="mt-5">
                <v-text-field
                  outlined
                  label="Email"
                  prepend-inner-icon="email"
                  type="email"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  outlined
                  label="Password"
                  prepend-inner-icon="vpn_key"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  hint="At least 8 characters"
                  counter
                  v-model="password"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-btn width="100%" color="primary" height="40">
                  Login
                </v-btn>
              </v-form>
              <div class="d-flex justify-end ma-2 switch" @click="toggleLogin">
                <p>Create a new account</p>
              </div>
            </v-card>
            <v-card class="px-5 py-2" height="640" elevation="7" v-else>
              <v-card-title class="justify-center">
                <h1 class="text-h4 font-weight-medium">Signup</h1>
              </v-card-title>
              <v-divider></v-divider>
              <v-form class="mt-5">
                <v-text-field
                  outlined
                  label="Email"
                  prepend-inner-icon="email"
                  type="email"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  outlined
                  label="First Name"
                  prepend-inner-icon="person"
                  v-model="firstname"
                ></v-text-field>
                <v-text-field
                  outlined
                  label="Last Name"
                  prepend-inner-icon="person"
                  v-model="lastname"
                ></v-text-field>
                <v-text-field
                  outlined
                  label="Password"
                  prepend-inner-icon="vpn_key"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  hint="At least 8 characters"
                  counter
                  v-model="password"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-text-field
                  outlined
                  label="Confirm Password"
                  prepend-inner-icon="vpn_key"
                  :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  hint="At least 8 characters"
                  counter
                  v-model="confirmPassword"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                ></v-text-field>
                <v-btn width="100%" color="primary" height="40">
                  Register
                </v-btn>
              </v-form>
              <div class="d-flex justify-end ma-2 switch" @click="toggleLogin">
                <p>Login to existing account</p>
              </div>
            </v-card>
          </div>
        </v-card>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "Authenication",
  data() {
    return {
      login: true,
      showPassword: false,
      showConfirmPassword: false,
      email: "",
      pasword: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
    };
  },
  computed: {
    hidePicture() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  methods: {
    toggleLogin() {
      this.login = !this.login;
    },
  },
};
</script>

<style>
.switch {
  cursor: pointer;
  color: grey;
}

.switch:hover {
  color: orange !important;
  transition: all 0.3s;
}

.grey-bg {
  height: 450px;
}
.auth-background {
  background: linear-gradient(47deg, #00aef8, #e55900);
  background-size: 400% 400%;

  -webkit-animation: AnimationName 23s ease infinite;
  -moz-animation: AnimationName 23s ease infinite;
  -o-animation: AnimationName 23s ease infinite;
  animation: AnimationName 23s ease infinite;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 70%;
  }
  50% {
    background-position: 100% 31%;
  }
  100% {
    background-position: 0% 70%;
  }
}
@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 70%;
  }
  50% {
    background-position: 100% 31%;
  }
  100% {
    background-position: 0% 70%;
  }
}
@-o-keyframes AnimationName {
  0% {
    background-position: 0% 70%;
  }
  50% {
    background-position: 100% 31%;
  }
  100% {
    background-position: 0% 70%;
  }
}
@keyframes AnimationName {
  0% {
    background-position: 0% 70%;
  }
  50% {
    background-position: 100% 31%;
  }
  100% {
    background-position: 0% 70%;
  }
}
.auth-picture {
  background-image: url("../assets/auth-background.jpg");
  background-size: cover;
}
</style>
