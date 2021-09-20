<template>
  <v-container class="auth-background fill-height pa-15 justify-center" fluid>
    <v-sheet height="800" elevation="10" rounded :width="hidePicture ? 450 : 1600">
      <v-card flat tile class="fill-height d-flex" color="grey lighten-2">
        <v-card class="fill-height flex-grow-1 overflow-hidden" v-show="!hidePicture">
          <!-- BrandName and Slogan -->
          <div
            class="fill-height white auth-picture d-flex flex-column justify-center align-center"
          >
            <div class="d-flex align-center">
              <v-icon size="70" color="secondary">dashboard</v-icon>
              <h1 class="ml-2 info--text special-text-lg">NoteHub</h1>
            </div>
            <div
              class="mx-10 text-center info--text special-text-sm"
              :style="`max-width: ${$vuetify.breakpoint.mdAndDown ? 450 : 1000}px;`"
            >
              All-in-one rich-text note taking and sharing platform powered by GPT-3 and Tiptap
            </div>
          </div>
        </v-card>
        <v-card flat tile class="pa-0" style="width: 450px;">
          <div class="grey darken-3 grey-bg px-10" :style="`padding-top: 35px;`">
            <!-- BrandName -->
            <div :style="`padding-bottom: 25px; height: 5rem;`">
              <transition name="fade" duration="500">
                <div class="d-flex justify-center align-center" v-if="hidePicture">
                  <v-icon size="55" color="secondary">dashboard</v-icon>
                  <h1 class="white--text special-text ml-2">NoteHub</h1>
                </div>
              </transition>
            </div>
            <!-- Form Switch -->
            <transition name="fade" duration="500" mode="out-in">
              <v-card
                class="px-5 py-2"
                height="380"
                elevation="7"
                v-if="loginMode"
                :key="'loginMode'"
                :style="`padding-top: ${loginMode ? 125 : 125}px;`"
              >
                <v-card-title class="justify-center">
                  <h1 class="text-h4 font-weight-medium info--text">Login</h1>
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
                  <v-btn
                    width="100%"
                    color="primary"
                    height="40"
                    @click="loginUser"
                    :loading="loading"
                  >
                    Login
                  </v-btn>
                </v-form>
                <div class="d-flex justify-end ma-2 switch" @click="toggleLogin">
                  <p>Create a new account</p>
                </div>
              </v-card>
              <v-card class="px-5 py-2" height="640" elevation="7" v-else :key="'signupMode'">
                <v-card-title class="justify-center">
                  <h1 class="text-h4 font-weight-medium info--text">Signup</h1>
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
                  <v-btn
                    width="100%"
                    color="primary"
                    height="40"
                    @click="signupUser"
                    :loading="loading"
                  >
                    Register
                  </v-btn>
                </v-form>
                <div class="d-flex justify-end ma-2 switch" @click="toggleLogin">
                  <p>Login to existing account</p>
                </div>
              </v-card>
            </transition>
          </div>
        </v-card>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Authenication",
  data() {
    return {
      loginMode: true,
      showPassword: false,
      showConfirmPassword: false,
      email: "boquany2@illinois.edu",
      password: "12345678",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      rules: {
        required: (v) => !!v || "Required.",
        min: (v) => (!!v && v.length >= 8) || "At least 8 characters",
        emailMatch: (v) =>
          /* eslint-disable */
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "You have entered an invalid email address!",
        passwordMatch: (v) => v === this.password || "Both passwords must be the same!",
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions(["signup", "login"]),
    toggleLogin() {
      this.loginMode = !this.loginMode;
    },
    async loginUser() {
      if (!this.$refs.loginForm.validate()) return;
      this.loading = true;
      try {
        const user = await this.login({ email: this.email, password: this.password });
        console.log(user);
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    },
    async signupUser() {
      if (!this.$refs.signupForm.validate()) return;
      this.loading = true;
      try {
        const user = await this.signup({ email: this.email, password: this.password });
        console.log(user);
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),
    hidePicture() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>

<style>
.special-text {
  font-family: "Open Sans", sans-serif !important;
  font-size: 2.5rem;
}
.special-text-lg {
  font-family: "Open Sans", sans-serif !important;
  font-size: 3.5rem;
}

.special-text-sm {
  font-family: "Open Sans", sans-serif !important;
  font-size: 1.5rem;
  font-weight: 400;
}

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
  background: rgb(237, 98, 20);
  background: linear-gradient(
    75deg,
    rgba(237, 98, 20, 0.8645833333333334) 5%,
    rgba(30, 144, 255, 0.7917542016806722) 92%
  );
}

.auth-picture {
  background-image: url("../assets/auth-background.jpg");
  background-size: cover;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.25s linear;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: all 0.25s linear;
}
</style>
