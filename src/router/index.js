import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import RegisterUser from "../views/RegisterUser";
import CreateClaim from "../views/CreateClaim";
import ViewClaim from "../views/ViewClaim";
import SelectClaim from "../views/SelectClaim";

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
    path: "/createClaim",
    name: "CreateClaim",
    component: CreateClaim,
  },
  {
    path: "/claims/:claimId",
    name: "ViewClaim",
    component: ViewClaim,
  },
  {
    path: "/claimSelected/:claimId",
    name: "SelectClaim",
    component: SelectClaim,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
