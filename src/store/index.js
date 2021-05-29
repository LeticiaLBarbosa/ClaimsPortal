import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accountStatus: "Create New Account",
    form: {
      firstName: undefined,
      lastName: undefined,
      accountNumber: undefined,
      taxId: undefined,
      address: undefined,
    },
  },
  mutations: {
    accountStatus(state, accountStatus) {
      state.accountStatus = accountStatus;
    },
    form(state, form) {
      state.form = form;
    },
  },
  actions: {
    async getMessage({ commit, state }) {
      if (!state.accountStatus) {
        const status = {
          accountStatus: "Create New Account",
        };
        commit("message", status);
      }
    },
  },
  modules: {},
});
