<template>
  <div class="ls--login-background ls--login-background-1">
    <div class="ls--login-wrapper">
      <div class="content">
        <div class="md-layout md-alignment-top-center">
          <div class="md-layout-item md-medium-size-100 md-size-33">
            <md-card>
              <md-card-header data-background-color="green">
                <h4 class="title">Authentication</h4>
                <p class="category">Complete your authentication</p>
              </md-card-header>
              <md-card-content>
                <div class="md-layout">
                  <div class="md-layout-item md-medium-size-100 md-size-100">
                    <md-field :class="invalid('username')">
                      <label>Username</label>
                      <md-input v-model="username" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-medium-size-100 md-size-100">
                    <md-field :class="invalid('password')">
                      <label>Password</label>
                      <md-input v-model="password" type="password"></md-input>
                    </md-field>
                  </div>
                </div>
                <div class="md-layout">
                  <div class="md-layout-item md-medium-size-100">
                    <md-button
                      class="md-primary md-block"
                      v-on:click="submit"
                      :disabled="sending"
                      >Sign In</md-button
                    >
                  </div>
                </div>
                <div v-if="sending" class="md-layout">
                  <div class="md-layout-item md-medium-size-100">
                    <md-progress-bar md-mode="indeterminate"></md-progress-bar>
                  </div>
                </div>
                <div class="md-layout">
                  <div
                    class="md-layout-item md-medium-size-100 ls--create-account"
                  >
                    <router-link
                      :to="{ name: 'register' }"
                      class="ls--create-account-size"
                      >create your account</router-link
                    >
                  </div>
                </div>
              </md-card-content>
              <md-snackbar
                :md-position="snackbar.position"
                :md-duration="snackbar.duration"
                :md-active.sync="snackbar.show"
                md-persistent
              >
                <span>{{ snackbar.message }}</span>
                <md-button @click="snackbar.show = false">Ok</md-button>
              </md-snackbar>
            </md-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "@/services/auth.js";
import storage from "@/services/storage.js";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    username: { required, email },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    invalid(key) {
      if (this.$v[key].$error) {
        return {
          "ls--md-invalid": true
        };
      }
    },

    showMessage(message) {
      this.snackbar.message = message;
      this.snackbar.show = true;
    },

    submit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.showMessage("Fields are required");
        return;
      }

      this.sending = true;
      auth
        .login(this.username, this.password)
        .then(token => {
          storage.set("token", token);
          this.$router.push("/dashboard");
        })
        .catch(error => {
          this.sending = false;
          this.showMessage("You have entered an invalid username or password");
        });
    }
  },
  data() {
    return {
      snackbar: {
        show: false,
        position: "center",
        duration: 4000
      },
      sending: false,
      username: null,
      password: null
    };
  }
};
</script>
