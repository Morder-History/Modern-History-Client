import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/map",
    name: "Map",
    component: () => import(/*webpackChunkName: 'map'*/ "@/views/Map/Map.vue"),
  },
  {
    path: "/video",
    name: "Video",
    component: () =>
      import(/*webpackChunkName: 'video'*/ "@/views/Video/VideoPage.vue"),
  },
  {
    path: "/book",
    name: "Book",
    component: () =>
      import(/*webpackChunkName: 'book'*/ "@/views/Book/BookPage.vue"),
  },
  {
    path: "/people",
    name: "People",
    component: () =>
      import(/*webpackChunkName: 'people'*/ "@/views/People/People.vue"),
  },
  {
    path: "/personal",
    name: "Personal",
    component: () =>
      import(/*webpackChunkName: 'Personal'*/ "@/views/Personal/Personal.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/video" && !to.query.title) {
    next("/");
  } else if (to.path === "/book" && !to.query.bookName) {
    next("/");
  } else {
    next();
  }
});

export default router;
