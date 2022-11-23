import { boot } from "quasar/wrappers";
import axios from "axios";
import reader from "../plugins/reader";
import { watch } from "vue";
import helpers from "../plugins/helpers";

// axios.defaults.baseURL = process.env.baseURL;
axios.defaults.headers.common["Content-Type"] =
  "application/json; charset=utf-8";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["SameSite"] = "None";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
let headers = {
  "X-Requested-With": "XMLHttpRequest",
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": "true",
};
const api = axios.create({
  baseURL: process.env.baseURL,
  headers,
});

let token;

export default boot(async ({ app, router, redirect }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  app.config.globalProperties.$apiHeaders = headers;

  router.beforeEach(async (to, from) => {
    const store = app.config.globalProperties.$store;

    // Get the token from response storage
    api.interceptors.response.use(function (response) {
      if (response && response.data && response.data.token) {
        token = response.data.token;
        store.auth.setToken(token);
        store.auth.clearRegistrationData();
      }
      return response;
    });

    api.interceptors.request.use(
      function (config) {
        // Check valid token
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }

        if (store.bootstrap.settings && store.bootstrap.settings.server) {
          // set store.bootstrap.settings.server as baseURL
          config.baseURL = store.bootstrap.settings.server;
        }

        return config;
      },
      (e) => {
        reader.error(e, true);
      }
    );

    let $user = {};
    let $settings = store.bootstrap.getSettings;
    watch(
      () => store.user.data,
      (newUser, oldUser) => {
        app.config.globalProperties.$user = newUser;
        $user = newUser;
      },
      { immediate: true }
    );

    // Pass the authentication token to the login
    watch(
      () => store.auth.token,
      (token, oldToken) => {
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      },
      { immediate: true }
    );

    // Perform a graceful logout``
    if (to.name === "user.logout" && $user) {
      store.bootstrap.setAttr(null, "booted");
      store.auth.logOut($user).then((status) => {
        if (status === true) {
          return router.replace({ name: "auth.login" });
        }
      });
    }

    if (to.meta.requireAuth && !store.auth.token) {
      // Save the current page and redirect the user to the login page
      store.bootstrap.setLostPage(to.name);
      helpers.notify("You need to log in to view page", "error");
      return router.replace({ name: "auth.login" });
    } else if (to.meta.requireGuest && store.auth.token) {
      // The user is currently loggedin so redirect them from the authentication pages
      return redirect({
        name: store.bootstrap.getLostPage || "index",
      });
    } else if ($user && store.auth.token) {
      if (store.bootstrap.getLostPage) {
        store.bootstrap.setLostPage(null);
      }
      if (
        !to.meta.requireCode &&
        $settings.verify_email &&
        !$user.email_verified_at
      ) {
        return router.replace({
          name: "auth.verify",
          params: { type: "email" },
        });
      } else if (
        !to.meta.requireCode &&
        $settings.verify_phone &&
        $user.phone &&
        !$user.phone_verified_at
      ) {
        return router.replace({
          name: "auth.verify",
          params: { type: "phone" },
        });
      } else if (
        to.meta.requireAdmin &&
        $user.privileges.indexOf("admin") < 0
      ) {
        return router.replace({ name: "index" });
      }
    }

    api.interceptors.response.use(
      (response) => {
        // Authenticate the user
        if (to.meta.requireGuest && response && response.data) {
          const data = response.data;

          if (data && data.data && data.token) {
            store.user.setUser(data.data);

            router.replace({
              name: store.bootstrap.getLostPage || "index",
            });
            return response;
          }
        }

        // If the server responds with a data refresh we handle that here
        let refresh =
          response &&
          response.data &&
          response.data.data &&
          typeof response.data.data.refresh === "object"
            ? response.data.data.refresh
            : response &&
              response.data &&
              typeof response.data.refresh === "object"
            ? response.data.refresh
            : null;

        if (refresh) {
          const stores = {
            settings: "bootstrap",
          };
          Object.keys(refresh).map((i) => {
            let action = "set" + i[0].toUpperCase() + i.slice(1);
            const refreshable = stores[i] || i;

            if (
              typeof store[refreshable] !== "undefined" &&
              typeof store[refreshable][action] === "function"
            ) {
              store[refreshable][action](refresh[i]);
            }
          });
        }
        return response;
      },
      (e) => {
        let status_code = !e.response || e.response.status;
        let error = reader.error(e, true);
        if (status_code === 401 && to.meta.requireAuth) {
          store.auth.setToken(null);
          helpers.notify("You need to log in to view this page", "error");
          return router.replace({ name: "auth.login" });
        }

        if (status_code === 403) {
          helpers.notify(
            error.message || error,
            error.status || "error",
            true,
            "persistent"
          );
        }
        return Promise.reject(e);
      }
    );

    return true;
    // Now you need to add your authentication logic here, like calling an API endpoint
  });
});

export { axios, api };
