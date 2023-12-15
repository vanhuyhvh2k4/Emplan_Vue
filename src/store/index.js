import { createStore } from "vuex";

export default createStore({
  state: {
    currentUser: {},
  },
  getters: {},
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser;
    },
  },
  actions: {},
  modules: {},
});
