<template>
  <v-container class="auth-background fill-height pa-15 justify-center" fluid>
    <v-sheet height="800" width="100%" elevation="10" rounded :width="hidePicture ? 450 : 1600">
      <v-card flat tile class="fill-height d-flex" color="grey lighten-2">
        <v-card class="fill-height flex-grow-1 overflow-hidden" v-show="!hidePicture">
          <div class="fill-height white auth-picture"></div>
        </v-card>
        <v-card flat tile class="pa-0" style="width: 450px;" rounded>
          <div
            class="grey darken-3 grey-bg px-10"
            :style="`padding-top: ${loginMode ? 150 : 110}px;`"
          >
            <v-card class="px-5 py-2" height="380" elevation="7" v-if="loginMode">
              <v-card-title class="justify-center">
                <h1 class="text-h4 font-weight-medium">Login</h1>
              </v-card-title>
              <v-divider></v-divider>
              <!-- Login Form -->
              <v-form class="mt-5" ref="loginForm">
                <v-text-field
                  outlined
                  label="Email"
                  prepend-inner-icon="email"
                  type="email"
                  :rules="[rules.required, rules.emailMatch]"
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
                  @click:append="showPassword = !showPassword"
                  :rules="[rules.required, rules.min]"
                  v-model="password"
                ></v-text-field>
                <v-btn width="100%" color="primary" height="40" @click="login">
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
              <!-- Signup Form -->
              <v-form class="mt-5" ref="signupForm">
                <v-text-field
                  outlined
                  label="Email"
                  prepend-inner-icon="email"
                  type="email"
                  :rules="[rules.required, rules.emailMatch]"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  outlined
                  label="First Name"
                  prepend-inner-icon="person"
                  :rules="[rules.required]"
                  v-model="firstname"
                ></v-text-field>
                <v-text-field
                  outlined
                  label="Last Name"
                  prepend-inner-icon="person"
                  :rules="[rules.required]"
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
                  :rules="[rules.required, rules.min]"
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
                  :rules="[rules.required, rules.passwordMatch]"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                ></v-text-field>
                <v-btn width="100%" color="primary" height="40" @click="signup">
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
      loginMode: true,
      showPassword: false,
      showConfirmPassword: false,
      email: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      rules: {
        required: (v) => !!v || "Required.",
        min: (v) => (!!v && v.length >= 8) || "At least 8 characters",
        emailMatch: (v) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "You have entered an invalid email address!",
        passwordMatch: (v) => v === this.password || "Both passwords must be the same!",
      },
    };
  },
  methods: {
    toggleLogin() {
      this.loginMode = !this.loginMode;
    },
    login() {
      if (!this.$refs.loginForm.validate()) return;
      console.log("Login...");
    },
    signup() {
      if (!this.$refs.signupForm.validate()) return;
      console.log("Signup...");
    },
  },
  computed: {
    hidePicture() {
      return this.$vuetify.breakpoint.smAndDown;
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
