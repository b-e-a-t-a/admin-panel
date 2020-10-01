import "core-js";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";

import "./theme/theme-style.sass";
import "vue-multiselect/dist/vue-multiselect.min.css";
import "./theme/vendor-style.sass";

createApp(App)
  .use(store)
  .use(router)
  .use(Vuelidate)
  .mount("#app");
