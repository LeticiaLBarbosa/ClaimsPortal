import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";
import { padLeadingZeros } from "../utils/formatter";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accountStatus: "Create New Account",
    users: [
      {
        name: "Maria Leticia",
        firstName: "Maria",
        lastName: "Barbosa",
        accountNumber: "111111",
        taxId: "08882047440",
        address: "Some street",
        userId: "mariaBarbosa0888",
        password: "Maria@2021",
        type: "customer",
      },
      {
        name: "Jane Done",
        firstName: "Jane",
        lastName: "Doe",
        address: "Some street",
        userId: "janeDoe1234",
        password: "Jane@2021",
        type: "employee",
        employeeId: "123456",
      },
    ],
    claims: [],
    notAttendedClaims: [],
    currentUser: undefined,
    dailyOrder: 0,
  },
  mutations: {
    accountStatus(state, accountStatus) {
      state.accountStatus = accountStatus;
    },
    users(state, users) {
      state.users = users;
    },
    addUser(state, user) {
      state.users.push(user);
    },
    currentUser(state, user) {
      state.currentUser = user;
    },
    removeCurrentUser(state) {
      state.currentUser = undefined;
    },
    claims(state, claims) {
      state.claims = claims;
    },
    notAttendedClaims(state, notAttendedClaims) {
      state.notAttendedClaims = notAttendedClaims;
    },
    setToClaims(state, claim) {
      if (!state.claims) {
        state.claims = [];
      }
      state.claims.push(claim);
    },
    dailyOrder(state, dailyOrder) {
      state.dailyOrder = dailyOrder;
    },
  },
  actions: {
    async getUser({ commit }, { email, password }) {
      const user = this.state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        commit("currentUser", user);
      }
    },
    getClaims({ commit }) {
      const claims = this.state.claims.find(
        (c) => c.customerUserId === this.state.currentUser.userId
      );
      if (claims) {
        commit(
          "claims",
          claims.constructor.name === "Array" ? claims : [claims]
        );
      }
    },
    getNotAttendedClaims({ commit }) {
      const notAttendedClaims = [];

      for (let claim of this.state.claims) {
        if (claim.status === "NOT ATTENDED") {
          notAttendedClaims.push(claim);
        }
      }

      commit("notAttendedClaims", notAttendedClaims);
    },
    addClaim({ commit }, claim) {
      claim.customerUserId = this.state.currentUser.userId;
      claim.date = new Date();
      claim.status = "NOT ATTENDED";
      claim.id = this.state.claims.length + 1;

      commit("setToClaims", claim);
    },
    setClaimSelected({ commit }, payload) {
      const dailyOrder = this.state.dailyOrder + 1;
      const employeeId = this.state.currentUser.employeeId;

      const claims = [];

      for (let c of this.state.claims) {
        const newClaim = { ...c };

        if (newClaim.id == payload.claimId) {
          newClaim.status = "IN PROCESS";
          const datePart = moment(newClaim.date).format("DDMMYYYY");
          const orderOfTheDay = padLeadingZeros(dailyOrder, 4);
          newClaim.uniqueId = `${datePart}-${employeeId}-${orderOfTheDay}`;
          newClaim.employeeId = employeeId;
        }

        claims.push(newClaim);
      }

      if (claims) {
        commit("claims", claims);
        commit("dailyOrder", dailyOrder);
      }
    },
    setClaim({ commit }, claim) {
      const claims = [];
      for (let c of this.state.claims) {
        const newClaim = { ...c };
        if (newClaim.id == claim.id) {
          newClaim.status = "ATTENDED";
        }
        claims.push(newClaim);
      }

      if (claims) {
        commit("claims", claims);
      }
    },
  },
  getters: {
    getCurrentUser(state) {
      return state.currentUser;
    },
    claims(state) {
      return state.claims;
    },
  },
  modules: {},
});
