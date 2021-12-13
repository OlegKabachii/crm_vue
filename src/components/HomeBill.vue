<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Currency account</span>

        <p
            v-for="cur of currencies"
            :key="cur"
            class="currency-line">
          <span>{{ getCurrency(cur) | currency(currencies) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data: () => ({
    currencies: ['EUR', 'USD', 'NOK']
  }),
  computed: {
    base() {
      return this.$store.getters.info.bill / (this.rates['NOK'] / this.rates['EUR'])
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>
