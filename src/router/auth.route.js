const authRoutes = [
    {
        path: "/register",
        name: "register",
        meta: {
          layout: "auth",
        },
        component: () =>
          import(
            /* webpackChunkName: "register" */ "../views/Register/RegisterView.vue"
          ),
      },
      {
        path: "/login",
        name: "login",
        meta: {
          layout: "auth",
        },
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Login/LoginView.vue"),
      },
      {
        path: "/verify",
        name: "verify",
        meta: {
          layout: "auth",
        },
        component: () =>
          import(
            /* webpackChunkName: "VerifyEmail" */ "../views/VerifyEmail/VerifyEmailView.vue"
          ),
      },
];

export default authRoutes;