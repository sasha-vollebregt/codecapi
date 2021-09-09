<template>
  <div>
    <p v-if="$fetchState.pending">Loading....</p>
    <p v-else-if="$fetchState.error">Error while fetching coins</p>
    <div v-else>
        <h1>Name: {{coin.name}}</h1>
        <h2>Symbol: {{coin.symbol}}</h2>
        <p>{{coin.description}} </p>
        <p>Members:</p>
        <div v-for="(member, index) in coin.team" :key="index">
        <span>{{member.name}}</span>
            <span>{{member.position}}</span>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        coinId: {
            type: String,
            default: null
        }
    },
    data() {
      return {
        coin: {}
      }
    },
    /**
     * Fetch with the coin id particular information about the coint
     */
    async fetch() {
      this.coin = await fetch(
        `https://api.coinpaprika.com/v1/coins/${this.coinId}`
      ).then(res => res.json())
    },
    watch: {
        /**
         * When coin id has changed in parent, refetch new coin.
         */
        coinId: {
            async handler(value) {
                this.coin = await fetch(`https://api.coinpaprika.com/v1/coins/${value}`).then(res => res.json())
            }
        }
    }
  }
</script>