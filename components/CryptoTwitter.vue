<template>
  <div>
    <p v-if="$fetchState.pending">Loading....</p>
    <p v-else-if="$fetchState.error">Error while fetching coins</p>
    <div v-else>
        <div v-for="(coin, index) in twitterInfo" :key="index" class="my-2"> 
              <b-card
                :title="coin.user_name"
                style="max-width: 20rem;"
                class="mb-2"
            >
                <p v-html="coin.date"></p>
                <b-card-text v-html="coin.status"></b-card-text>
            </b-card> 
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
        twitterInfo: {}
      }
    },
    /**
     * Gather tweets about selected coin
     */
    async fetch() {
      this.twitterInfo = await fetch(
        `https://api.coinpaprika.com/v1/coins/${this.coinId}/twitter`
      ).then(res => res.json())
    },
    watch: {
        /** When new coin has been clicked refetch twitter tweets about coin */
        coinId: {
            deep: true,
            async handler(value) {
                this.twitterInfo = await fetch(`https://api.coinpaprika.com/v1/coins/${value}/twitter`).then(res => res.json())
            }
        }
    }
  }
</script>