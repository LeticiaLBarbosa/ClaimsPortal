<template>
  <div v-if="getCurrentUser && getCurrentUser.type === 'customer'">
    <CustomerHomePage />
  </div>
  <div v-else-if="getCurrentUser && getCurrentUser.type === 'employee'">
    <EmployeeHomePage />
  </div>
  <div v-else><WelcomePage /></div>
</template>

<script>
import { mapGetters } from "vuex";
import CustomerHomePage from "./CustomerHomePage.vue";
import EmployeeHomePage from "./EmployeeHomePage.vue";
import WelcomePage from "./WelcomePage.vue";

export default {
  name: "Home",
  components: {
    CustomerHomePage,
    EmployeeHomePage,
    WelcomePage,
  },
  data() {
    return {
      user: {
        name: "",
        firstName: "",
        lastName: "",
        accountNumber: "",
        address: "",
      },
    };
  },
  computed: {
    ...mapGetters([`getCurrentUser`]),
  },
  async mounted() {
    if (this.getCurrentUser) {
      this.user = Object.assign({}, this.getCurrentUser);
    }
  },
};
</script>
