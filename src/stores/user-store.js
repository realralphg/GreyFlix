import { defineStore } from "pinia";
import { useAuthStore } from "stores/auth-store";
const regData = useAuthStore().registration_form;

export const useUserStore = defineStore("user", {
  state: () => ({
    data: regData || {},
  }),
  getters: {
    getUser: (state) => state.data,
  },
  actions: {
    clearUser(data) {
      this.data = {};
    },
    setUser(data) {
      this.data = {
        ...this.data,
        ...data,
      };
    },
  },
});
