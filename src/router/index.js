import { createRouter, createWebHistory } from "vue-router";
import VerticalMenu from "../layouts/vertical-menu/VerticalMenu.vue";
import SupportTicket from "../modules/support-ticket/Main.vue";
import { useAuthStore } from "@/modules/auth/stores/store.js";

import AuthRouter from "../modules/auth/routes/router.js";
import UsersRouter from "../modules/users/routes/index.js";
import FaqsRouter from "../modules/faqs/routes/index.js";
import RolesRouter from "../modules/roles/routes/index.js";
import SocialNetworksRouter from "../modules/social-networks/routes/index.js";
import TasksRouter from "../modules/tasks/routes/index.js";
import ServicesRequestRouter from "../modules/services-request/routes/index.js";
import AccountsRouter from "../modules/accounts/routes/index.js";
import ComissionsRouter from "../modules/comissions/routes/index.js";
import DashboardRouter from "../modules/dashboard/routes/index.js";
import PaymentsHistoryRouter from "../modules/payment-requests/routes/index.js";
import SupportTicketRouter from "../modules/support-ticket/routes/index.js";
import SettingsRouter from "../modules/settings/routes/index.js";
import PaymentRequestsRouter from "../modules/payments-history/routes/index.js";
import CategoriesRouter from "../modules/categories/routes/index.js";
import TransactionsRouter from "../modules/transactions/routes/index.js";
import ServicesRouter from "../modules/services/routes/index.js";
import Calendar from "../modules/calendar/Main.vue";
import Profile from "../modules/auth/views/Profile.vue";
import TestUno from "../modules/test-uno/routes/index.js";
import NotFound from "../views/NotFound.vue";
import Faqs from "../modules/faqs/pages/Faqs.vue";

const routes = [
  ...AuthRouter,
  {
    path: "/",
    component: VerticalMenu,
    children: [...DashboardRouter],
  },

  {
    path: "/admin",
    component: VerticalMenu,
    children: [
      ...TestUno,
      ...UsersRouter,
      ...TasksRouter,
      ...RolesRouter,
      ...SocialNetworksRouter,
      ...ServicesRequestRouter,
      ...AccountsRouter,
      ...ComissionsRouter,
      ...PaymentsHistoryRouter,
      ...PaymentRequestsRouter,
      ...CategoriesRouter,
      ...TransactionsRouter,
      ...ServicesRouter,
      ...SupportTicketRouter,
      ...SettingsRouter,
      ...FaqsRouter,
      {
        path: "calendar",
        name: "admin-calendar",
        meta: {
          login_required: true,
        },
        component: Calendar,
      },
    ],
  },
  {
    path: "/",
    component: VerticalMenu,
    children: [
      {
        path: "profile",
        name: "profile",
        meta: {
          login_required: true,
        },
        component: Profile,
      },
      {
        path: "clients/faqs",
        name: "clients-faqs",
        meta: {
          login_required: true,
        },
        component: Faqs,
      },
      {
        path: "support-ticket",
        name: "support-ticket",
        meta: {
          login_required: true,
        },
        component: SupportTicket,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const refreshProfileInfo = (to) => {
  const auth = useAuthStore();
  let _go_to_dashboard = to.path.indexOf("dashboard") != -1;
  if (to.path == "/" || _go_to_dashboard) return;
  auth.refreshProfileInfo();
};

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  //refreshProfileInfo(to);
  const route_requires_user_is_logged = to.meta.login_required
    ? to.meta.login_required
    : false;
  let default_home_user;
  if (auth.user.role == 2) default_home_user = "clients-dashboard";
  else if (auth.user.role == 3) default_home_user = "workers-dashboard";
  else default_home_user = "admin-dashboard";
  if (route_requires_user_is_logged == true) {
    if (!auth.user.is_logged) {
      return next({ name: "sign-in" });
    }
  } else {
    const router_is_only_for_guests = to.meta.only_guests
      ? to.meta.only_guests
      : false;
    if (router_is_only_for_guests == true) {
      return auth.user.is_logged ? next({ name: default_home_user }) : next();
    }
  }
  return next();
});

export default router;
