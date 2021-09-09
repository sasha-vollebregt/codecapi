<template>
    <main>
        <b-container fluid>
            <TheHeader />
            <b-row>
                <b-col cols="12" class="text-center">
                    <h1> Quiz </h1>
                </b-col>
            </b-row>
            <b-row class="px-5">
                <b-col cols="12">
                    <p v-if="$fetchState.pending">Loading....</p>
                    <p v-else-if="$fetchState.error">Error while fetching quiz</p>
                    <div v-else>
                        <div v-if="isLastAnswer">
                            <h2> Your final score is {{counter}} / {{maxCounter}} </h2>
                        </div>
                        <div v-else>
                            <h2>{{questionNumber}}</h2>
                            <h2> Counter: {{ counter }} / {{maxCounter}} </h2>
                            <h2 class="py-2" v-html="question"> {{questionNumber}}. {{ question }} </h2>
                            <div class="px-5" v-for="(answer, index) in shuffeledAnswers" :key="index"> 
                                <input type="radio" :id="answer" :value="answer" v-model="picked">
                                <label :for="answer" v-html="answer"></label>
                            </div>
                            <b-button class="my-2" variant="info" @click="checkAnswer" v-if="!isAnswerChecked">Check answer</b-button>
                            <b-button class="my-2"  variant="primary" @click="nextQuestions" v-else> Next question </b-button>
                            <b-alert variant="success" :show="isAnswerCorrect === true"> The answer was correct </b-alert>
                            <b-alert variant="warning" :show="isAnswerCorrect === false"> The answer was wrong. It was {{correctAnswer}}</b-alert>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </main>
</template>
<script>
export default {
    computed: {
        /**
         * List the questions
         * @return {array} x number of questions
         */
        results: function() {
            const { results } = this.listQuestions;
            return results;
        },
        /**
         * Show the specific question that needs to be shown
         * @return {object} the question with correct and incorrect answers
         */
        questionAndAnswer: function() {
            if( !this.results || this.results.length > 0) {
                return this.results[this.questionIndex];
            } else {
                return {};
            }
        },
        /**
         * The question that will be shown
         * @return {string} The question 
         */
        question: function() {
            if(this.questionAndAnswer === undefined) {
                return '';
            }

            const { question } = this.questionAndAnswer;
            if (question !== undefined) {
                return question;
            }
            return '';
        },
        /**
         * The correct answer of the question
         * @return {string} The correct answer string 
         */
        correctAnswer: function() {
            const { correct_answer } = this.questionAndAnswer;
            if(correct_answer !== undefined) {
                return correct_answer; 
            }
            return ''; 
        },
        /**
         * The incorrect answers of the question
         * @return {array} An array of strings of incorrect answers
         */
        incorrectAnswer: function() {
             const { incorrect_answers } = this.questionAndAnswer;
             if(incorrect_answers !== undefined) {
                return incorrect_answers;
             }
            return []
        },
        /**
         * Combine and shuffle the incorrect and correct answers to display
         * @return {array} List of shuffeled potential answers
         */
        shuffeledAnswers:  function() {
            if (this.incorrectAnswer !== undefined  || this.correctAnswer !== undefined) {
                const answersArray = this.incorrectAnswer.concat(this.correctAnswer);
                return this.shuffle(answersArray);
            }
            return []
        },
        /**
         * The max amount of points possible
         * @return {number} Length of points and each point is worth 10 poins
         */
        maxCounter: function() {
            return this.results.length * 10;
        },
        /**
         * Check where the current questions is and when it is the last question. Return the last answer.
         * @return {boolean} When it is the last question return true
         */
        isLastAnswer: function() {
            if(this.questionIndex === this.results.length) {
                return true;
            }
            return false;
        },
        /**
         * People start questions from 1 and not 0. 
         * Show user which question they are.
         * @return {number} Question number
         */
        questionNumber: function() {
            return this.questionIndex + 1; 
        }
    },
    data() {
        return {
            picked: '',
            listQuestions: {},
            questionIndex: 0,
            isAnswerCorrect: null,
            counter: 0,
            isAnswerChecked: false
      }
    },
    methods: {
        /**
         * Go to the next question
         */
        nextQuestions() {
            this.questionIndex = this.questionIndex + 1;
            this.isAnswerChecked = false;
            this.isAnswerCorrect = null;
        },
        /**
         * Check if answer is correct and if so add 10 points
         */
        checkAnswer() {
            if(this.picked === this.correctAnswer) {
                this.counter = this.counter + 10;
                this.isAnswerCorrect = true;
            } else {
                this.isAnswerCorrect = false;
            }
            this.isAnswerChecked = true;
        
        },
        /**
         * Shuffle the array 
         * @param {array} Shuffle the array
         * @return {array} Shuffles array
         */
        shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }
    },
    /**
     * Fetch a list of questions
     */
    async fetch() {
      this.listQuestions = await fetch(
        'https://opentdb.com/api.php?amount=10&type=multiple'
      ).then(res => res.json());
    },
}
</script>
