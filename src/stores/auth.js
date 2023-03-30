import { defineStore } from "pinia";
import axios from "axios";
import { Notify } from "quasar";
export const useMyAuthStore = defineStore("myauth", {
  state: () => ({
    token: "",
    userDetails: null,
    ticket: {},
    loggedPay: {},
    favourites: [],
    // token: localStorage.getItem("token") || "",
  }),
  getters: {
    registrationForm: (state) => state.userDetails,
  },
  actions: {
    setUserDetails(data) {
      console.log(data);
      const token = data.token;
      const user = data;
      localStorage.setItem("token", token);
      localStorage.setItem("userdet", JSON.stringify(user));
      this.userDetails = data;
      this.token = token;
    },

    addTofavourites(data) {
      let itemToBeAdded = {
        ...data,
        fav: "yes",
      };
      let item = this.favourites.find((item) => item.id === data.id);

      if (item) {
        Notify.create({
          message: "Already added to favourites",
          color: "red",
        });
        return;
      } else {
        this.favourites.push(itemToBeAdded);
        Notify.create({
          message: " Added to favourites",
          color: "green",
        });
      }
    },
    removeFromfavourites(id) {
      // console.log("remove", id);
      this.favourites = this.favourites.filter((items) => items.id !== id);
    },

    async logOut(userDetails) {
      return axios
        .post("/logout")
        .then((e) => {
          this.token = null;
          this.userDetails = null;
          userDetails = null;
        })
        .catch((e) => {
          console.log({ e });
          this.token = null;
          this.userDetails = null;
          userDetails = null;
          localStorage.setItem("token", "");
          localStorage.setItem("userdet", "");
        });
    },
  },
});
