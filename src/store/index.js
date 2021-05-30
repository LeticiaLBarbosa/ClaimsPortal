import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accountStatus: "Create New Account",
    users: [
      {
        name: "Maria Leticia",
        firstName: "Maria",
        lastName: "Barbosa",
        accountNumber: "123456",
        taxId: "08882047440",
        address: "Some street",
        userId: "mariaBarbosa0888",
        password: "Maria@2021",
      },
    ],
    claims: [],
    currentUser: undefined,
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
    updateUser(state, { userId, user }) {
      state.user[userId] = user;
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
    setToClaims(state, claim) {
      if (!state.claims) {
        state.claims = [];
      }
      state.claims.push(claim);
    },
  },
  actions: {
    async getUser({ commit }, { email, password }) {
      const user = this.state.user.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        commit("currentUser", user);
      }
    },
    getClaims({ commit }) {
      console.log("get claims", this.state.claims)
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
    tryLogin({ commit }) {
      const userId = localStorage.getItem("userId");

      if (userId) {
        const response = this.state.users.find((u) => u.userId === userId);

        if (response) {
          commit("currentUser", response);
        }
      }
    },
    addClaim({ commit }, claim) {
      claim.customerUserId = this.state.currentUser.userId;
      claim.date = new Date();
      claim.status = "NOT ATTENDED";

      commit("setToClaims", claim);
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
