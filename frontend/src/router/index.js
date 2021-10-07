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
/* eslint-disable */
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    meta: {
      navbar: "NavigationBar",
    },
    component: LandingPage,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    meta: {
      requireAuth: true,
      navbar: "NavigationBar",
    },
    component: Dashboard,
  },
  {
    name: "profile",
    path: "/profile",
    meta: {
      requireAuth: true,
      navbar: "NavigationBar",
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
    path: "/community/:id",
    meta: {
      requireAuth: true,
      navbar: "CommunityBar",
    },
    component: Community,
  },
  {
    name: "communities",
    path: "/communities",
    meta: {
      requireAuth: true,
      navbar: "NavigationBar",
    },
    component: Communities,
  },
  {
    name: "auth",
    path: "/auth",
    meta: {
      navbar: null,
    },
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
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: "smooth",
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  console.log("Initial Login:", store.state.auth.isAuthenticated);
  if (!to.matched.some((record) => record.meta.requireAuth)) {
    return next();
  }
  if (store.state.auth.isAuthenticated) {
    return next();
  } else {
    return next({ name: "auth" });
  }
});

export default router;
