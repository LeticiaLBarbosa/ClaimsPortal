<template>
  <b-container>
    <h2>Customer Information</h2>
    <h4>{{ getCurrentUser ? getCurrentUser.name : "User" }}</h4>
    <p>Account Number: {{ user.accountNumber }}</p>
    <p>Address: {{ user.address }}</p>
    <h2>Claims</h2>
    <b-table responsive :items="items" :fields="fields" show-empty></b-table>
    <b-button to="/createClaim" variant="info">New Claim</b-button>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "CustomerHomePage",
  data() {
    return {
      user: {
        name: "",
        firstName: "",
        lastName: "",
        accountNumber: "",
        address: "",
      },
      fields: [
        {
          key: "unique_id",
          label: "Unique ID",
          headerTitle: "Unique ID",
          sortable: true,
        },
        {
          key: "date",
          label: "Date",
          headerTitle: "Date",
          sortable: true,
        },
        {
          key: "type",
          label: "Type of clarification",
          headerTitle: "Type of clarification",
          sortable: true,
        },
        {
          key: "status",
          label: "Status",
          headerTitle: "Status",
          sortable: true,
        },
      ],
      items: [],
    };
  },
  computed: {
    ...mapGetters([`getCurrentUser`]),
  },
  async mounted() {
    if (this.getCurrentUser) {
      this.user = Object.assign({}, this.getCurrentUser);
    }
    await this.$store.dispatch("getClaims");
    this.items = this.$store.state.claims.map((c) => ({
      ...c,
      type:
        c.type === "NO_SERVICE"
          ? "Customer do not have Service"
          : "Over-billing the Service",
      date: moment(c.date).format("YYYY-MM-DD"),
    }));
  },
};
</script>
