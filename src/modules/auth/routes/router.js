import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import VerifyCode from "../views/ForgotPassword.vue";
import VerifyTwoFa from "../views/ForgotPassword.vue";

export default [
  {
    path: "/",
    name: "sign-in",
    meta: {
      only_guests: true,
    },
    component: SignIn,
  },
  /*{
    path: "/register",
    name: "register",
    component: SignUp,
  },*/
  {
    path: "/sign-up",
    name: "sign-up",
    meta: {
      only_guests: false,
      login_required: false,
    },
    component: SignUp,
  },

  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/verify-code",
    name: "verify-code",
    component: VerifyCode,
  },
  {
    path: "/verify-twofa",
    name: "verify-twofa",
    component: VerifyTwoFa,
  },
];
