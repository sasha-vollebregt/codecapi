<template>
    <main>
        <TheHeader />
        <b-container fluid>
            <b-row>
                <b-col cols="12" class="text-center">
                    <h1> Ranking of the current bitcoin </h1>
                </b-col>
            </b-row>
            <b-row class="px-3">
                <b-col cols="3">
                    <CryptoRanking @sendCoinId="getCoinId" />
                </b-col>
                <b-col cols="9">
                    <CryptoById v-if="coinId" :coinId="coinId" />
                    <CryptoTwitter v-if="coinId" :coinId="coinId" />
                </b-col>
            </b-row>
        </b-container>
    </main>
</template>
<script>
export default {
    data() {
        return {
            // the coin that is selected to display
            coinId: undefined,
      }
    },
    methods: {
        /**
         * 
         */
        getCoinId(id) {
            this.coinId = id; 
        }
    }
}
</script>