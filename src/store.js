import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// didn't put in .env file because of deploy to gh-pages
const app_id = '23c133e0a69c4ecea2fa54f6e6645d6d';

export default new Vuex.Store({
  state: {
    exchangeList: null
  },
  mutations: {
    setExchangeRates(state, data) {
      state.exchangeList = data;
    }
  },
  getters: {
    currencyRatesInRub(state) {
      const arr = [];
      if (state.exchangeList) {
        const rates = Object.assign(state.exchangeList.rates);
        const rub = state.exchangeList.rates['RUB'];

        Object.keys(rates).forEach((rate) => {
          if (rate !== 'RUB') {
            arr.push({currency: rate, value: rates[rate] / rub});
          }
        });
      }
      return arr;
    }
  },
  actions: {
    async fetchExchangeRates({commit, state}, symbols) {
      try {
        let query = symbols.join(',') + ',RUB';
        let url = 'https://openexchangerates.org/api/latest.json?app_id=' + app_id + '&symbols=' + query;
        const res = await fetch(url);
        const data = await res.json();
        commit('setExchangeRates', data);
      } catch (e) {
        console.log(e);
      }
    }
  },
});
