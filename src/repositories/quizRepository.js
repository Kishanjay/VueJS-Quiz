import axios from 'axios';
import config from '../config';

export const getQuizQuestion = axios({
  method: 'GET',
  url: config.quizApiUrl,
  params: {
    amount: 1,
  },
});

export default {
  getQuestion: getQuizQuestion,
};
