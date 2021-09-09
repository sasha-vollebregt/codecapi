<template>
    <main>
        <b-container fluid>
            <TheHeader />
            <b-row>
                <b-col class="text-center" cols="12">
                    <h1> Welcome to Sasha's playground </h1>
                </b-col>
                <b-col class="text-center my-2" cols="12">
                    <img src="~/assets/images/sasha.jpg" />
                </b-col>
            </b-row>
            <b-row>
               <b-col class="text-right my-2" cols="6">
                    <b-button variant="info" href="ranking">Ranking</b-button>
               </b-col>
               <b-col class="my-2" cols="6">
                    <b-button variant="info" href="quiz">Quiz</b-button>
               </b-col>
            </b-row>
        </b-container>
    </main>
</template>