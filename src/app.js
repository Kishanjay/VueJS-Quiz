import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

import './scss/styles.scss';

import FmQuizPage from './pages/FmQuiz.vue';
import FmScoreboard from './pages/FmScoreboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/quiz',
    component: FmQuizPage,
  },
  {
    path: '/scoreboard',
    component: FmScoreboard,
  },
];
const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
