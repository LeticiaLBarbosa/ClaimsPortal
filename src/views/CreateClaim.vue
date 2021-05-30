<template>
  <b-container>
    <h2>Open new claim</h2>
    <b-card bg-variant="light">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            name="Type"
            :rules="{ required }"
            v-slot="validationContext"
          >
            <b-form-group
              id="lblType"
              label="Type of clarification"
              label-for="type"
              label-cols-lg="3"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              label-align="left"
            >
              <b-form-select
                id="type"
                name="type"
                v-model="claim.type"
                :options="options"
                :state="getValidationState(validationContext)"
                aria-describedby="type-live-feedback"
              ></b-form-select>
              <b-form-invalid-feedback id="type-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <div v-if="claim.type && claim.type === 'NO_SERVICE'">
            <ValidationProvider
              name="LostServiceDate"
              :rules="{ required }"
              v-slot="validationContext"
            >
              <b-form-group
                id="lblLostServiceDate"
                label="Lost Service Date"
                label-for="serviceLostDate"
                label-cols-lg="3"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                label-align="left"
              >
                <b-form-datepicker
                  id="serviceLostDate"
                  name="serviceLostDate"
                  v-model="claim.serviceLostDate"
                  :state="getValidationState(validationContext)"
                  aria-describedby="serviceLostDate-live-feedback"
                ></b-form-datepicker>
                <b-form-invalid-feedback id="serviceLostDate-live-feedback">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </div>

          <div v-if="claim.type && claim.type === 'OVER_BILLING'">
            <ValidationProvider
              name="GasReading"
              :rules="{ required }"
              v-slot="validationContext"
            >
              <b-form-group
                id="lblGasReading"
                label="Gas Meter Reading"
                label-for="gasReading"
                label-cols-lg="3"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                label-align="left"
              >
                <b-form-input
                  id="gasReading"
                  name="gasReading"
                  type="number"
                  v-model="claim.gasReading"
                  :state="getValidationState(validationContext)"
                  aria-describedby="gasReading-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="gasReading-live-feedback">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </div>

          <ValidationProvider
            name="Description"
            :rules="{ required }"
            v-slot="validationContext"
          >
            <b-form-group
              id="lblDescription"
              label="Description"
              label-for="description"
              label-cols-lg="3"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              label-align="left"
            >
              <b-form-textarea
                id="description"
                name="description"
                v-model="claim.description"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                :state="getValidationState(validationContext)"
                aria-describedby="description-live-feedback"
              ></b-form-textarea>
              <b-form-invalid-feedback id="description-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <b-button @click="cancel()">Cancel</b-button>
          <b-button type="submit" variant="info">Submit</b-button>
        </b-form>
      </ValidationObserver>
    </b-card>
  </b-container>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  name: "CreateClaim",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      claim: {
        type: undefined,
        serviceLostDate: undefined,
        gasReading: undefined,
        description: undefined,
      },
      options: [
        { value: null, text: "Please select an option" },
        { value: "NO_SERVICE", text: "Customer do not have Service" },
        { value: "OVER_BILLING", text: "Over-billing the Service" },
      ],
      required: "",
    };
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    async onSubmit() {
      await this.$store.dispatch("addClaim", this.claim);
      this.$router.replace({ name: "Home" });
    },
    cancel() {
      this.claim = null;
      this.$nextTick(() => {
        if (this.$refs.observer) this.$refs.observer.reset();
      });
      this.$router.replace({ name: "Home" });
    },
  },
};
</script>
<style>
.btn {
  margin-right: 20px;
}
</style>
