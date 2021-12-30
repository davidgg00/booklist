import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import isAuthenticated from "./isAuthenticated";

const routes = [
  {
    path: "/",
    name: "Home",
    beforeEnter: [isAuthenticated],
    component: Home,
  },
  {
    path: "/community",
    beforeEnter: [isAuthenticated],
    name: "Community",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Community.vue"),
  },
  {
    path: "/user/:id",
    beforeEnter: [isAuthenticated],
    name: "User",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/User.vue"),
  },
  {
    path: "/booklist",
    beforeEnter: [isAuthenticated],
    name: "BookList",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BookList.vue"),
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: [isAuthenticated],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    beforeEnter: [isAuthenticated],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
