import { defineStore } from "pinia";

export const useBootstrapStore = defineStore("bootstrap", {
  state: () => ({
    featured_companies: [],
    settings: {},
    plans: [],
    booted: null,
    portal: {},
    win_size: { width: "200px", height: "200px" },
    meta: {
      reboots: null,
    },
    lost_page: null,
  }),

  getters: {
    getPlans(state) {
      return state.plans;
    },
    getSettings(state) {
      return state.settings;
    },
    getLostPage(state) {
      return state.lost_page;
    },
    runtime(state) {
      return ((dt2, dt1) => {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
      })(new Date(), new Date(state.booted));
    },
    isBooted(state) {
      return this.runtime <= 720;
    },
  },

  actions: {
    boot({ settings, plans, featured_companies }) {
      if (featured_companies) {
        this.featured_companies = featured_companies;
      }
      if (settings) {
        this.settings = settings;
      }
      if (plans) {
        this.plans = plans;
      }
      this.booted = new Date().toString();
      if (this.meta.reboots === null) {
        this.meta.reboots = 0;
      } else {
        this.meta.reboots++;
      }
    },
    setLostPage(page) {
      this.lost_page = page;
    },
    setSettings(settings) {
      this.settings = settings;
    },
    setAttr(data, attr) {
      this[attr] = data;
    },
  },
});
