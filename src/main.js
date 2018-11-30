import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "../node_modules/bulma/css/bulma.min.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import {faGithub,faTwitter,faLinkedin,faInstagram}from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import{faEnvelope} from "@fortawesome/free-solid-svg-icons"
library.add(faGithub,faLinkedin,faTwitter,faInstagram,faEnvelope)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
