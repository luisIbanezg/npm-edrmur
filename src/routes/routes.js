import Content from "@/pages/Layout/Content.vue";
import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Login from "@/pages/Auth/Login.vue";
import Register from "@/pages/Auth/Register.vue";

const routes = [
  {
    path: "/auth",
    component: Content,
    children: [
      {
        path: "login",
        name: "login",
        component: Login
      },
      {
        path: "register",
        name: "register",
        component: Register
      }
    ]
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        meta: {
          requiresAuth: true
        },
        component: Dashboard
      }
    ]
  }
];

export default routes;
