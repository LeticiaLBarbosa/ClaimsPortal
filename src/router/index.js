import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import RegisterUser from "../views/RegisterUser";
import CustomerHomePage from "../views/CustomerHomePage";
import CreateClaim from "../views/CreateClaim";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterUser,
  },
  {
    path: "/home",
    name: "CustomerHomePage",
    component: CustomerHomePage,
  },
  {
    path: "/createClaim",
    name: "CreateClaim",
    component: CreateClaim,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
