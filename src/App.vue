<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase text-xs-center">
        <span>Exchange Rates</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <CurrencyComponent/>
    </v-content>
  </v-app>
</template>

<script>
import CurrencyComponent from './components/CurrencyComponent'

export default {
  name: 'App',
  components: {
    CurrencyComponent
  },
  data () {
    return {
      //
    }
  }
}
</script>
