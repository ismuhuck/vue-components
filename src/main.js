import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
Vue.config.productionTip = false;
import "view-design/dist/styles/iview.css";
Vue.use(ViewUI);

new Vue({
  router,
  store,
  // eslint-disable-next-line
  render: (h) => h(App)
}).$mount("#app");
