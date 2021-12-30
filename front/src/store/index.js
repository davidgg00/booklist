import { createStore } from "vuex";
import backendApi from "../../api/backendApiConnection";

export default createStore({
  state: {
    user: {},
    status: "",
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, data) {
      state.user.name = data.user.name;
      state.user.email = data.user.email;
      state.user.idToken = data.idToken;
      state.user._id = data.user._id;

      localStorage.setItem("idToken", data.idToken);
      state.status = "authenticated";
    },
    setError(state, error) {
      state.error = error;
    },
    logout(state) {
      state.user = {};
      state.status = "";
      localStorage.removeItem("idToken");
    },
  },
  actions: {
    async registerUser({ commit }, user) {
      try {
        await backendApi.post("user/register", user);
        commit("logout");
        return { ok: true };
      } catch (error) {
        return { ok: false, message: error.response.data.message };
      }
    },

    async loginUser({ commit }, user) {
      try {
        const { data } = await backendApi.post("user/login", user);
        commit("setUser", data);
        return { ok: true };
      } catch (error) {
        return { ok: false, message: error.response.data };
      }
    },

    async checkAuth({ commit }) {
      try {
        const idToken = localStorage.getItem("idToken");
        if (!idToken) {
          commit("logout");
          return { ok: false, message: "No token" };
        }
        const { data } = await backendApi.post("user/checkAuthToken", {
          idToken,
        });
        if (!data) {
          commit("logout");
          return { ok: false, message: "Invalid token" };
        }
        commit("setUser", data);
        return { ok: true, message: "Valid token" };
      } catch (error) {
        commit("logout");
        return { ok: false, message: "Invalid token" };
      }
    },
  },
  modules: {},
});
