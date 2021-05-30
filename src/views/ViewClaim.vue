<template>
  <b-container>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <h2>Claim</h2>
    <label>Unique ID:</label>
    <p>{{ claim.uniqueId || "-" }}</p>
    <label>Date:</label>
    <p>{{ claim.date }}</p>
    <label>Type of clarification:</label>
    <p>
      {{
        claim.type === "NO_SERVICE"
          ? "Customer do not have Service"
          : "Over-billing the Service"
      }}
    </p>
    <div v-if="claim.type === 'NO_SERVICE'">
      <label>Lost Service On:</label>
      <p>{{ claim.serviceLostDate }}</p>
    </div>
    <div v-else>
      <label>Gas meter reading:</label>
      <p>{{ claim.gasReading }}</p>
    </div>
    <label>Description:</label>
    <p>{{ claim.description }}</p>
    <label>Status:</label>
    <p>{{ claim.status }}</p>
    <div v-if="claim.favoured">
      <label>Favoured:</label>
      <p>{{ claim.favoured }}</p>
    </div>
  </b-container>
</template>
<script>
import moment from "moment";

export default {
  name: "ViewClaim",
  data: function () {
    const claims = this.$store.state.claims;
    const selectedClaim = this.$route.params.claimId;
    let claim = claims.find((c) => c.id == selectedClaim);

    if (claim) {
      claim.serviceLostDate = moment(claim.serviceLostDate).format(
        "YYYY-MM-DD"
      );
      claim.date = moment(claim.date).format("YYYY-MM-DD");
    } else {
      claim = {};
    }

    return {
      claim,
      isLoading: false,
      items: [
        {
          text: "Home",
          to: { name: "Home" },
        },
        {
          text: `Claim ${selectedClaim}`,
          active: true,
        },
      ],
    };
  },
};
</script>
<style>
.label {
  font-weight: bold;
  color: #495057;
}
</style>
