<template>
  <div class="ls--login-background ls--login-background-3">
    <div class="ls--login-wrapper">
      <div class="content">
        <div class="md-layout md-alignment-top-center">
          <div class="md-layout-item md-medium-size-100 md-size-33">
            <md-card>
              <md-card-header data-background-color="green">
                <h4 class="title">Registro</h4>
                <p class="category">Completa tu registro</p>
              </md-card-header>
              <md-card-content>
                <div class="md-layout">
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field :class="invalid('username')">
                      <label>Email</label>
                      <md-input v-model="username" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-medium-size-100 md-size-50">
                    <md-field :class="invalid('password')">
                      <label>Password</label>
                      <md-input v-model="password" type="password"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-medium-size-100 md-size-50">
                    <md-field :class="invalid('confirmPassword')">
                      <label>Confirm Password</label>
                      <md-input
                        v-model="confirmPassword"
                        type="password"
                      ></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-medium-size-100  md-size-100">
                    <md-field :class="invalid('name')">
                      <label>Nombre</label>
                      <md-input v-model="name" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-medium-size-100  md-size-100">
                    <md-field :class="invalid('lastname')">
                      <label>Apellido</label>
                      <md-input v-model="lastname" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-medium-size-100 md-size-33">
                    <md-field :class="invalid('run')">
                      <label>Rut</label>
                      <md-input v-model="run" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-medium-size-100 md-size-33">
                    <md-datepicker
                      :class="invalid('birthdate')"
                      v-model="birthdate"
                      :md-model-type="String"
                      md-immediately
                    >
                      <label>Fecha De Nacimiento</label>
                    </md-datepicker>
                  </div>
                  <div class="md-layout-item md-medium-size-100 md-size-33">
                    <md-field :class="invalid('gender')">
                      <label>Genero</label>
                      <md-select v-model="gender">
                        <md-option value="M" class="ls--option-span"
                          >Masculino</md-option
                        >
                        <md-option value="F" class="ls--option-span"
                          >Femenino</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-medium-size-100 md-size-100">
                    <md-field :class="invalid('region')">
                      <label>Región</label>
                      <md-select
                        v-model="region"
                        @md-selected="onChangeLoadCities($event)"
                      >
                        <md-option
                          class="ls--option-span"
                          v-for="(item, idx) in collection.regions"
                          v-bind:key="idx"
                          :value="item.code"
                          >{{ item.name }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-medium-size-100 md-size-50">
                    <md-field :class="invalid('city')">
                      <label>Provincia</label>
                      <md-select
                        v-model="city"
                        @md-selected="onChangeLoadDistricts($event)"
                        :disabled="collection.disabledCities"
                      >
                        <md-option
                          class="ls--option-span"
                          v-for="(item, idx) in collection.cities"
                          v-bind:key="idx"
                          :value="item.code"
                          >{{ item.name }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-medium-size-100 md-size-50">
                    <md-field :class="invalid('district')">
                      <label>Comuna</label>
                      <md-select
                        v-model="district"
                        :disabled="collection.disabledDistricts"
                      >
                        <md-option
                          class="ls--option-span"
                          v-for="(item, idx) in collection.districts"
                          v-bind:key="idx"
                          :value="item.code"
                          >{{ item.name }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-medium-size-100 md-size-70">
                    <md-field :class="invalid('address')">
                      <label>Dirección</label>
                      <md-input v-model="address" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-medium-size-100 md-size-30">
                    <md-field :class="invalid('house')">
                      <label>Número</label>
                      <md-input v-model="house" type="text"></md-input>
                    </md-field>
                  </div>
                </div>
                <div class="md-layout">
                  <div class="md-layout-item md-medium-size-100">
                    <md-button
                      class="md-primary md-block"
                      v-on:click="submit"
                      :disabled="sending"
                      >Crea tu cuenta</md-button
                    >
                  </div>
                  <div
                    v-if="sending"
                    class="md-layout-item md-medium-size-100 md-size-100"
                  >
                    <md-progress-bar md-mode="indeterminate"></md-progress-bar>
                  </div>
                </div>
                <div class="md-layout">
                  <div
                    class="md-layout-item md-medium-size-100 ls--create-account"
                  >
                    <router-link
                      :to="{ name: 'login' }"
                      class="ls--create-account-size"
                      >iniciar Sesión</router-link
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
import cut from "@/services/cut.js";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  sameAs,
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
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs("password")
    },
    name: {
      required,
      minLength: minLength(6)
    },
    lastname: {
      required,
      minLength: minLength(6)
    },
    run: {
      required,
      minLength: minLength(6)
    },
    birthdate: {
      required
    },
    gender: { required },
    region: { required },
    city: { required },
    district: { required },
    address: {
      required,
      minLength: minLength(6)
    },
    house: { required }
  },
  methods: {
    onChangeLoadCities(event) {
      this.collection.cities = cut.city(event);
      this.collection.disabledCities = event === null;
      this.city = null;
    },

    onChangeLoadDistricts(event) {
      this.collection.districts = cut.district(event);
      this.collection.disabledDistricts = event === null;
      this.district = null;
    },

    showMessage(message) {
      this.snackbar.message = message;
      this.snackbar.show = true;
    },

    invalid(key) {
      if (this.$v[key].$error) {
        return {
          "ls--md-invalid": true
        };
      }
    },

    submit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.showMessage("Fields are required");
        return;
      }

      this.sending = true;
      auth
        .register({
          email: this.username,
          rut: this.run,
          password: this.password,
          password_confirmation: this.confirmPassword,
          nombre: this.name,
          apellido: this.lastname,
          sexo: this.gender,
          fecha_nacimiento: this.birthdate,
          region: this.region,
          ciudad: this.city,
          comuna: this.district,
          direccion: this.address,
          numero: this.house
        })
        .then(response => {
          this.sending = false;
          this.username = null;
          this.password = null;
          this.confirmPassword = null;
          this.name = null;
          this.lastname = null;
          this.run = null;
          this.birthdate = null;
          this.gender = null;
          this.region = null;
          this.city = null;
          this.district = null;
          this.address = null;
          this.house = null;
          this.$v.$reset();
          this.showMessage("Ok");
        })
        .catch(error => {
          this.sending = false;
          this.showMessage(error.message);
        });
    }
  },
  data() {
    return {
      collection: {
        regions: cut.regions,
        cities: cut.city(null),
        disabledCities: true,
        districts: cut.district(null),
        disabledDistricts: true
      },
      snackbar: {
        show: false,
        position: "center",
        duration: 4000
      },
      sending: false,
      username: null,
      password: null,
      confirmPassword: null,
      name: null,
      lastname: null,
      run: null,
      birthdate: null,
      gender: null,
      region: null,
      city: null,
      district: null,
      address: null,
      house: null
    };
  }
};
</script>
