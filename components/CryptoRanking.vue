<template>
  <div>
    <p v-if="$fetchState.pending">Loading....</p>
    <p v-else-if="$fetchState.error">Error while fetching coins</p>
    <ul v-else>
      <!-- <b-form-input v-model="searchedCoin" placeholder="Enter the coin you want to find"></b-form-input> -->
      <div v-for="(coin, index) in coins" :key="index">
        <b-button class="my-2" @click="sendToParent(coin.id)">
        {{coin.rank}}. {{ coin.symbol }}
        </b-button>
      </div>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // array of list of coins
        coins: [],
        searchedCoin: ''
      }
    },
    /**
     * Fetch coins by ranking
     */
    async fetch() {
      this.coins = await fetch(
        'https://api.coinpaprika.com/v1/coins'
      ).then(res => res.json());
    },
    methods: {
      /**
       * When coin is clicked emit to parent the coin id
       */
      sendToParent(id) {
        this.$emit('sendCoinId', id);
      }
    }
  }
</script>