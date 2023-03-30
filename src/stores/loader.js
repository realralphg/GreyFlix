import { useAuthStore } from "stores/auth-store";
import { useMyAuthStore } from "stores/auth";
import { useUserStore } from "stores/user-store";
// import { useAuthsStore } from "stores/auth";
import { useBootstrapStore } from "./bootstrap";

export default {
  auth: useAuthStore(),
  myauth: useMyAuthStore(),
  user: useUserStore(),
  bootstrap: useBootstrapStore(),
};
