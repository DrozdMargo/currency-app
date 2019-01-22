<template>
  <v-container>
    <v-layout
        text-xs-center
        justify-center
        align-center
        wrap
    >
      <v-flex mb-4 md4 xs8>
        <h1 class="display-2 font-weight-bold mb-3">
          Currency Exchanges
        </h1>
        <p class="subheading font-weight-regular">
          Our amazing app for monitoring exchanges rates,
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, placeat, temporibus.
          Accusantium dolor minima molestiae numquam possimus qui, repudiandae sed!
        </p>
        <h2 class="headline font-weight-bold mb-3 text-xs-center" v-if="exchanges">Information for
          {{exchanges.date}}</h2>
      </v-flex>
    </v-layout>

    <v-layout
        text-xs-center
        justify-center
        align-center
        wrap>
      <v-flex
          mb-5
          md3
          xs8
      >
        <v-layout align-center justify-end fill-height mb-2 class="currency-filter">
          <v-flex>
            <v-select
                v-model="selectedCurrency"
                :items="currency"
                @input="fetchData"
                v-if="exchanges"
                multiple
                label="Select currency"
                clearable
                hide-details
                class="currency-filter__select pt-0">
              <template
                  slot="selection"
                  slot-scope="{ item, index }"
              >
                <v-chip v-if="index === 0">
                  <span>{{ item }}</span>
                </v-chip>
                <span
                    v-if="index === 1"
                    class="grey--text caption"
                >(+{{ selectedCurrency.length - 1 }} others)
                </span>
              </template>
            </v-select>
          </v-flex>

          <v-tooltip bottom>
            <v-btn
                slot="activator"
                color="primary"
                dark
                small
                icon
                @click="fetchData"
                class="currency-filter__button"
                :disabled="isLoading"
            >
              <v-icon>refresh</v-icon>
            </v-btn>
            <span>Refresh</span>
          </v-tooltip>
        </v-layout>

        <v-layout justify-center align-center mt-3>
          <v-flex xs12>
            <table v-if="!isLoading && exchanges">
              <tr>
                <th>Name</th>
                <th>Rate</th>
              </tr>
              <tr v-for="(rate, key) in exchanges.rates" :key="key">
                <td>{{key}}</td>
                <td>{{rate}}</td>
              </tr>
            </table>
            <v-progress-linear v-else
                               slot="progress"
                               color="blue"
                               indeterminate>
            </v-progress-linear>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'CurrencyComponent',
    data: () => ({
      selectedCurrency: ['EUR', 'USD'],
      currency: ['EUR', 'USD', 'JPY', 'CAD'],
      isLoading: true
    }),
    mounted() {
      this.fetchData();
      this.$nextTick(function () {
        window.setInterval(() => {
          this.fetchData();
        }, 10000);
      });
    },
    computed: {
      exchanges() {
        return this.$store.state.exchangeList;
      }
    },
    methods: {
      fetchData() {
        this.isLoading = true;
        this.$store.dispatch('fetchExchangeRates', this.selectedCurrency);
        this.isLoading = false;
      }
    }
  }
</script>

<style scoped>
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    padding: 0.25rem;
    border: 1px solid #ccc;
    text-align: center;
  }

  tbody tr:nth-child(odd) {
    background: #eee;
  }

  .currency-filter__select {
    max-width: 250px;
  }
</style>
