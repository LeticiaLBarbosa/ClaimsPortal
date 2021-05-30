<template>
  <b-container>
    <h2>Customer Information</h2>
    <h4>{{ getCurrentUser ? getCurrentUser.name : "User" }}</h4>
    <p>Account Number: {{ user.accountNumber }}</p>
    <p>Address: {{ user.address }}</p>
    <h2>Claims</h2>
    <b-table responsive :items="items" :fields="fields" show-empty>
      <template #cell(id)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <router-link
          :to="{
            name: 'ViewClaim',
            params: { claimId: data.value },
          }"
          tag="a"
          >{{ data.value }}</router-link
        >
      </template>
    </b-table>
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
        type: "",
      },
      fields: [
        {
          key: "id",
          label: "ID",
          headerTitle: "ID",
          sortable: true,
        },
        {
          key: "uniqueId",
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
    ...mapGetters([`getCurrentUser`, `claims`]),
  },
  async mounted() {
    if (this.getCurrentUser) {
      this.user = Object.assign({}, this.getCurrentUser);
    }

    const filteredClaims = [];

    for (let claim of this.claims) {
      const newClaim = { ...claim };
      if (claim.customerUserId === this.user.userId) {
        newClaim.type =
          newClaim.type === "NO_SERVICE"
            ? "Customer do not have Service"
            : "Over-billing the Service";
        newClaim.date = moment(newClaim.date).format("YYYY-MM-DD");
        filteredClaims.push(newClaim);
      }
    }
    this.items = filteredClaims;
  },
};
</script>
