import NProgress from "nprogress";

export default (router) => {
  /* eslint-disable */
  router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
    console.log("ASDA");
  });
  router.afterEach(NProgress.done);
};
