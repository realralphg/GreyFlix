import { useAuthStore } from "stores/auth-store";
import { useUserStore } from "stores/user-store";
// import { useAuthsStore } from "stores/auth";
import { useBootstrapStore } from "./bootstrap";

export default {
  auth: useAuthStore(),
  user: useUserStore(),
  bootstrap: useBootstrapStore(),
};
