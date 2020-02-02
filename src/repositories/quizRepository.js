import axios from 'axios';
import config from '../config';

export const getQuizQuestion = async () => axios({
  method: 'GET',
  url: config.quizApiUrl,
  params: {
    amount: 1,
  },
});

export default {
  getQuestion: getQuizQuestion,
};
