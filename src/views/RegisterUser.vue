<template>
  <b-container>
    <h3>{{ getCurrentUser ? "Update Profile" : "Create New Account" }}</h3>
    <b-card bg-variant="light">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            name="Name"
            :rules="{}"
            v-slot="validationContext"
          >
            <b-form-group
              id="lblName"
              label="Name"
              label-for="name"
              label-cols-lg="3"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              label-align="left"
            >
              <b-form-input
                v-model="frm.name"
                name="name"
                type="text"
                id="name"
                placeholder="Please enter your name"
                :state="getValidationState(validationContext)"
                aria-describedby="name-live-feedback"
              />
              <b-form-invalid-feedback id="name-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="First Name"
            :rules="{ required: true }"
            v-slot="validationContext"
          >
            <b-form-group
              id="lblFirstName"
              label="First Name"
              label-for="firstName"
              label-cols-lg="3"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              label-align="left"
            >
              <b-form-input
                v-model="frm.firstName"
                name="firstName"
                type="text"
                id="firstName"
                placeholder="Please enter your first name"
                :state="getValidationState(validationContext)"
                aria-describedby="firstName-live-feedback"
              />
              <b-form-invalid-feedback id="firstName-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Last Name"
            :rules="{ required: true }"
            v-slot="validationContext"
          >
            <b-form-group
              id="lblLastName"
              label="Last Name"
              label-for="lastName"
              label-cols-lg="3"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              label-align="left"
            >
              <b-form-input
                v-model="frm.lastName"
                name="lastName"
                type="text"
                id="lastName"
                placeholder="Please enter your last name"
                :state="getValidationState(validationContext)"
                aria-describedby="lastName-live-feedback"
              />
              <b-form-invalid-feedback id="lastName-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Customer Account"
            :rules="{ required: true }"
            v-slot="validationContext"
          >
            <b-form-group
              id="lblAccountNumber"
              label="Customer Account"
              label-for="accountNumber"
              label-cols-lg="3"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              label-align="left"
            >
              <b-form-input
                v-model="frm.accountNumber"
                name="accountNumber"
                type="text"
                id="accountNumber"
                placeholder="Please enter your account number"
                :state="getValidationState(validationContext)"
                aria-describedby="accountNumber-live-feedback"
              />
              <b-form-invalid-feedback id="accountNumber-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Tax ID"
            :rules="{ required: true }"
            v-slot="validationContext"
          >
            <b-form-group
              id="lblTaxId"
              label="Tax ID"
              label-for="taxId"
              label-cols-lg="3"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              label-align="left"
            >
              <b-form-input
                v-model="frm.taxId"
                name="taxId"
                type="text"
                id="taxId"
                placeholder="Please enter your tax id"
                :state="getValidationState(validationContext)"
                aria-describedby="taxId-live-feedback"
              />
              <b-form-invalid-feedback id="taxId-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Address"
            :rules="{ required: true }"
            v-slot="validationContext"
          >
            <b-form-group
              id="lblAddress"
              label="Address"
              label-for="address"
              label-cols-lg="3"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              label-align="left"
            >
              <b-form-input
                v-model="frm.address"
                name="address"
                type="text"
                id="address"
                placeholder="Please enter your address"
                :state="getValidationState(validationContext)"
                aria-describedby="address-live-feedback"
              />
              <b-form-invalid-feedback id="address-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button class="ml-2" @click="resetForm()">Reset</b-button>
        </b-form>
      </ValidationObserver>
    </b-card>
  </b-container>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "RegisterUser",
  data() {
    return {
      status: undefined,
      frm: {
        name: "",
        firstName: "",
        lastName: "",
        accountNumber: "",
        taxId: "",
        address: "",
      },
      required: "",
    };
  },
  computed: {
    ...mapGetters([`getCurrentUser`]),
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  async mounted() {
    //add data to auto fill new user form, for testing purpose
    if (this.getCurrentUser) {
      this.frm = Object.assign({}, this.getCurrentUser);
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    resetForm() {
      this.frm = null;
      this.$nextTick(() => {
        this.$refs.observer.reset();
      });
    },
    onSubmit() {
      if (this.getCurrentUser) {
        const userId = this.$store.state.user.findIndex(
          (u) => u == this.getCurrentUser
        );
        console.log(userId);
        this.$store.commit("updateUser", { userId: userId, user: this.frm });
      } else {
        this.frm.userId =
          _.camelCase(this.frm.firstName + this.frm.lastName) +
          this.frm.taxId.substring(0, 4);
        this.frm.password =
          _.upperFirst(this.frm.firstName) + "@" + new Date().getFullYear();
        this.$store.commit("addUser", this.frm);
      }
      this.$store.commit("addUser", this.frm);
      this.$router.replace({ name: "Home" });
    },
  },
};
</script>
<style>
.container {
  margin-top: 20px;
}
</style>
