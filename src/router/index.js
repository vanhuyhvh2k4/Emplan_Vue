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
      import(
        /* webpackChunkName: "dashboard" */ "../views/Calendar/CalendarView.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/schedule",
    name: "schedule",
    component: () =>
      import(
        /* webpackChunkName: "schedule" */ "../views/Schedule/ScheduleView.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/pomodoro",
    name: "pomodoro",
    component: () =>
      import(
        /* webpackChunkName: "pomodoro" */ "../views/Pomodoro/PomodoroView.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/exam",
    name: "exam",
    component: () =>
      import(/* webpackChunkName: "exam" */ "../views/Exam/ExamView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(
        /* webpackChunkName: "profile" */ "../views/Profile/ProfileView.vue"
      ),
    beforeEnter: requireAuth,
  },
  ...authRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
