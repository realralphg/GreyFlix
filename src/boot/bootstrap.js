import { boot } from "quasar/wrappers";

// import TimeAgo from "javascript-time-ago";
// import en from "javascript-time-ago/locale/en";
// TimeAgo.addDefaultLocale(en);
// const timeAgo = new TimeAgo("en-US");

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async ({ app, router, store, redirect }) => {
//   const props = app.config.globalProperties;
//   // console.log(store);
//   console.log(props);
//   // app.config.globalProperties.$timeAgo = timeAgo;
//   if (props.$store.bootstrap.isBooted === false) {
//     await props.$api.get("get/settings").then(({ data }) => {
//       if (data && data.data) {
//         props.$store.bootstrap.boot(data.data);
//         app.config.globalProperties.$boot = data.data;
//       }
//     });
//   } else {
//     // app.config.globalProperties.$boot = props.$store.bootstrap.$state;
//     app.config.globalProperties.$user = props.$store.user.getUser;
//     app.config.globalProperties.$setUser = (user) => {
//       props.$store.user.setUser(user);
//     };
//   }
// });
