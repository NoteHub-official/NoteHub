import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import LandingPage from "@/views/LandingPage.vue";
import UserProfile from "@/views/UserProfile.vue";
import Workspace from "@/views/Workspace.vue";
import Community from "@/views/Community.vue";
import Communities from "@/views/Communities.vue";
import Authentication from "@/views/Authentication.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: LandingPage,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    meta: {
      requireAuth: true,
    },
    component: Dashboard,
  },
  {
    name: "profile",
    path: "/profile",
    meta: {
      requireAuth: true,
    },
    component: UserProfile,
  },
  {
    name: "workspace",
    path: "/workspace/:id",
    meta: {
      requireAuth: true,
    },
    component: Workspace,
  },
  {
    name: "community",
    path: "/community",
    meta: {
      requireAuth: true,
    },
    component: Community,
  },
  {
    name: "communities",
    path: "/communities",
    meta: {
      requireAuth: true,
    },
    component: Communities,
  },
  {
    name: "auth",
    path: "/auth",
    component: Authentication,
  },
  {
    name: "not-found",
    path: "/not-found",
    component: NotFound,
  },
  { path: "/:catchAll(.*)*", redirect: { name: "not-found" } }, // redirect random page
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: "yellow--text",
});

export default router;
