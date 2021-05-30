<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">ClaimsPortal</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="person-circle" class="user-icon" />
            </template>
            <b-dropdown-item v-if="!getCurrentUser" to="/register"
              >Sign Up</b-dropdown-item
            >
            <b-dropdown-item v-show="getCurrentUser" @click="signOut"
              >Sign Out</b-dropdown-item
            >
            <b-dropdown-item
              v-show="!getCurrentUser"
              v-b-modal.modal-prevent-closing
              >Sign In</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Sign in"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="User ID"
          label-for="userId-input"
          invalid-feedback="User ID is required"
          :state="userIdState"
        >
          <b-form-input
            id="userId-input"
            ref="userId"
            v-model="userId"
            :state="userIdState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Password"
          label-for="password-input"
          invalid-feedback="Password is required"
          :state="passwordState"
        >
          <b-form-input
            id="password-input"
            ref="password"
            type="password"
            v-model="password"
            :state="passwordState"
            required
          ></b-form-input>
        </b-form-group>
        <span>{{ this.error }}</span>
      </form>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      userId: "",
      userIdState: null,
      password: "",
      passwordState: null,
      error: "",
    };
  },
  computed: {
    ...mapGetters([`getCurrentUser`]),
  },
  methods: {
    checkFormValidity() {
      const validUserId = this.$refs.userId.checkValidity();
      const validPassword = this.$refs.password.checkValidity();
      this.userIdState = validUserId;
      this.passwordState = validPassword;
      return validUserId && validPassword;
    },
    resetModal() {
      this.userId = "";
      this.password = "";
      this.userIdState = null;
      this.passwordState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      await this.$store.dispatch("getUser", {
        userId: this.userId,
        password: this.password,
      });

      if (!this.getCurrentUser) {
        this.error = "Invalid user id or password!";
        return;
      }

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
        localStorage.setItem("userId", this.userId);
        this.$store.commit("user", this.$store.state.currentUser);
        if (this.getCurrentUser) {
          this.$router.replace({ name: "CustomerHomePage" });
        }
      });
    },
    signOut() {
      localStorage.removeItem("userId");
      this.$store.commit("user", null);
      this.$store.commit("removeCurrentUser");
      if (this.$route.name == "Register") {
        this.$router.replace({ name: "Home" });
      }
    },
  },
};
</script>
<style>
.user-icon {
  margin: 0 5px !important;
}
.quantity {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px !important;
  padding: 3px 5px !important;
  margin-left: -5px !important;
  font-size: 11px !important;
}
</style>
