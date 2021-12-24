import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "About",
    component: About,
  },
  {
    path: "/about",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
