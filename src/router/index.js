import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/renderTest",
    name: "renderTest",
    component: () => import("../views/renderTest.vue")
  },
  {
    path: "/Tabs",
    name: "Tabs",
    component: () => import("../views/Tabs.vue")
  },
  {
    path: "/expand",
    name: "expand",
    component: () => import("../views/expand.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
