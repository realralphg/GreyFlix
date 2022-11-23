import { api } from "boot/axios";
import { defineStore } from "pinia";
import loader from "./loader";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    registration_form: {},
    window_token: null,
    reg_step: 1,
    token: null,
  }),
  getters: {
    registrationForm: (state) => state.registration_form,
    registrationStep: (state) => state.reg_step,
    authToken: (state) => state.token,
    windowToken: (state) => state.window_token,
  },
  actions: {
    setRegStep(step) {
      this.reg_step = step;
    },
    setToken(token, type = "token") {
      this[type] = token;
    },
    async logOut(user) {
      return api
        .post("/logout")
        .then((e) => {
          this.token = null;
          this.reg_step = 1;
          this.window_token = null;
          this.registration_form = {};
          loader.user.clearUser();
          loader.bootstrap.setLostPage(null);
          return true;
        })
        .catch((e) => {
          console.log(e.response);
          if (e.response.status === 401) {
            this.token = null;
            this.reg_step = 1;
            this.window_token = null;
            this.registration_form = {};
            loader.user.clearUser();
            return true;
          }
        });
    },
    addRegistrationData(data) {
      this.registration_form = {
        ...this.registrationForm,
        ...data,
      };
    },
    clearRegistrationData() {
      this.reg_step = 1;
      this.registration_form = {};
    },
  },
});
