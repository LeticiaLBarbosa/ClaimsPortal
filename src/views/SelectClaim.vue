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
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group
        id="lblFavoured"
        label="Favoured"
        label-for="favoured"
        v-slot="{ ariaDescribedby }"
      >
        <b-form-radio
          v-model="claim.favoured"
          :aria-describedby="ariaDescribedby"
          name="favoured"
          value="In favor of the Client"
          >In favor of the Client</b-form-radio
        >
        <b-form-radio
          v-model="claim.favoured"
          :aria-describedby="ariaDescribedby"
          name="favoured"
          value="In favor of the Company"
          >In favor of the Company</b-form-radio
        >
      </b-form-group>
      <b-button class="ml-2" @click="cancel()">Cancel</b-button>
      <b-button type="submit" variant="primary">Close Claim</b-button>
    </b-form>
  </b-container>
</template>
<script>
import moment from "moment";

export default {
  name: "SelectClaim",
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
          href: "/",
        },
        {
          text: `Claim ${selectedClaim}`,
          active: true,
        },
      ],
      required: "",
    };
  },
  methods: {
    cancel() {
      this.claim = null;
      this.$nextTick(() => {
        if (this.$refs.observer) this.$refs.observer.reset();
      });
      this.$router.replace({ name: "Home" });
    },
    async onSubmit() {
      await this.$store.dispatch("setClaim", this.claim);
      this.$router.replace({ name: "Home" });
    },
  },
};
</script>
<style>
.label {
  font-weight: bold;
  color: #495057;
}
</style>
