<template>
  <b-container>
    <h2>Employee Information</h2>
    <h4>{{ getCurrentUser ? getCurrentUser.name : "User" }}</h4>
    <p>Employee ID: {{ user.employeeId }}</p>
    <h2>Not Attended Claims</h2>
    <b-table responsive :items="items" :fields="fields" show-empty>
      <template #cell(id)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <a href="#" @click="selectClaim(data.value)">{{ data.value }}</a>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "EmployeeHomePage",
  data() {
    return {
      user: {
        employeeId: "",
        name: "",
        firstName: "",
        lastName: "",
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
    ...mapGetters([`getCurrentUser`]),
  },
  methods: {
    async selectClaim(claimId) {
      await this.$store.dispatch("setClaimSelected", {
        claimId,
      });

      this.$router.replace({
        name: "SelectClaim",
        params: { claimId },
      });
    },
  },
  async mounted() {
    if (this.getCurrentUser) {
      this.user = Object.assign({}, this.getCurrentUser);
    }
    await this.$store.dispatch("getNotAttendedClaims");

    for (let claim of this.$store.state.notAttendedClaims) {
      const newClaim = { ...claim };
      (newClaim.type =
        newClaim.type === "NO_SERVICE"
          ? "Customer do not have Service"
          : "Over-billing the Service"),
        (newClaim.date = moment(newClaim.date).format("YYYY-MM-DD")),
        this.items.push(newClaim);
    }
  },
};
</script>
