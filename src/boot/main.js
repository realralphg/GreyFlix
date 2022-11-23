import { boot } from "quasar/wrappers";
import helpers from "src/plugins/helpers";
import plugins from "src/plugins";
import loadStore from "stores/loader";
// import bootstrap from "stores/bootstrap";
import * as fa from "src/plugins/fa.pro";
// require("/icons.js");
// require("../plugins/fa.pro.js");

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  app.config.globalProperties = {
    ...app.config.globalProperties,
    $h: helpers,
    $helper: helpers,
    $store: loadStore,
    $plugins: plugins,
  };
});
