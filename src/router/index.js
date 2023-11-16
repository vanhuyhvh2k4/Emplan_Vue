import requireAuth from "@/middlewares/auth.middleware.js";
import authRoutes from "./auth.route";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "../views/Dashboard/DashboardView.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/dashboard",
    redirect: "/",
  },
  {
    path: "/task",
    name: "task",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Task/TaskView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Calendar/CalendarView.vue"),
    beforeEnter: requireAuth,
  },
  ...authRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
