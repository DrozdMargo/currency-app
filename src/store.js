import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    exchangeList: null
  },
  mutations: {
    setExchangeRates(state, data) {
      state.exchangeList = data;
    }
  },
  actions: {
    async fetchExchangeRates({commit, state}, symbols) {
      try {
        let query = symbols.join(',');
        let url = 'https://api.exchangeratesapi.io/latest?base=RUB&symbols=' + query;
        const res = await fetch(url);
        const data = await res.json();
        commit('setExchangeRates', data);
        console.log(data);
      } catch(e) {
        console.log(e);
      }
    }
  },
});
