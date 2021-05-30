import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accountStatus: "Create New Account",
    user: [
      {
        name: undefined,
        firstName: undefined,
        lastName: undefined,
        accountNumber: undefined,
        taxId: undefined,
        address: undefined,
        userId: undefined,
        password: undefined,
      },
    ],
    currentUser: undefined,
  },
  mutations: {
    accountStatus(state, accountStatus) {
      state.accountStatus = accountStatus;
    },
    user(state, user) {
      state.user = user;
    },
    addUser(state, user) {
      state.user.push(user);
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
  },
  getters: {
    getCurrentUser(state) {
      return state.currentUser;
    },
  },
  modules: {},
});
