<template>
  <b-container>
    <h1>{{ $store.state.accountStatus }}</h1>
    <b-form-container></b-form-container>
    <b-row>
      <label for="firstName">First name: </label>
      <input
        v-model="form.firstName"
        type="text"
        id="firstName"
        placeholder="Please enter your first name"
      />
    </b-row>
    <b-row>
      <label for="lastName">Last name: </label>
      <input
        v-model="form.lastName"
        type="text"
        id="lastName"
        placeholder="Please enter your last name"
      />
    </b-row>
    <b-row>
      <label for="accountNumber">Account Number: </label>
      <input
        v-model="form.accountNumber"
        type="text"
        id="accountNumber"
        placeholder="Please enter your account number"
      />
    </b-row>
    <b-row>
      <label for="accountNumber">Tax ID: </label>
      <input
        v-model="form.accountNumber"
        type="text"
        id="accountNumber"
        placeholder="Please enter your tax ID"
      />
    </b-row>
    <b-row>
      <label for="address">Address: </label>
      <input
        v-model="form.address"
        type="text"
        id="address"
        placeholder="Please enter your address"
      />
    </b-row>
    <div>
      <b-button v-b-modal.modal-1>Registration Confirmation</b-button>
      <b-modal id="modal-1" title="BootstrapVue">
        <p class="my-4">{{ this.form.firstName }}</p>
        <p class="my-4">{{ this.form.lastName }}</p>
        <p class="my-4">{{ this.form.accountNumber }}</p>
        <p class="my-4">{{ this.form.taxId }}</p>
        <p class="my-4">{{ this.form.address }}</p>
      </b-modal>
    </div>
  </b-container>
</template>
<script>
export default {
  name: "Account",
  data() {
    return {
      status: undefined,
      form: {
        firstName: undefined,
        lastName: undefined,
        accountNumber: undefined,
        taxId: undefined,
        address: undefined,
      },
    };
  },
  computed: {},
  async mounted() {
    await this.$store.dispatch("getMessage");
    this.status = Object.assign({}, this.$store.state.accountStatus);
  },
  methods: {
    async save() {
      this.form.firstName = this.form.firstName.trim();
      this.form.lastName = this.form.lastName.trim();
      this.form.accountNumber = this.accountNumber;
      this.form.taxId = this.taxId;
      this.form.address = this.address;
      this.$store.commit("form", this.form);
      this.form = Object.assign({}, this.$store.state.form);
    },
  },
};
</script>
