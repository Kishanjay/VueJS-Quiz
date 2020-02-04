import { isArray } from 'util';
import { generateUUID } from './helper';

const STORAGE_KEY = 'scoreboardStorage';

const isValidScoreboardScore = (score) => {
  if (!('score' in score)) {
    // eslint-disable-next-line no-console
    console.warning(`missing 'score' property on score: ${score}`);
    return false;
  }
  if (!('username' in score)) {
    // eslint-disable-next-line no-console
    console.warning(`missing 'username' property on score: ${score}`);
    return false;
  }
  return true;
};

const loadScoreboardScores = async () => {
  let scoreboardScores = localStorage.getItem(STORAGE_KEY);
  scoreboardScores = JSON.parse(scoreboardScores);

  if (!scoreboardScores || !isArray(scoreboardScores)) {
    scoreboardScores = [];
  }

  return scoreboardScores;
};

export const listScoreboardScores = async () => {
  let result = await loadScoreboardScores();

  // ignore invalid data (localstorage is user modifyable)
  result = result.filter((s) => isValidScoreboardScore(s));

  return result.sort((a, b) => b.score - a.score);
};

export const addScoreboardScore = async (score, username) => {
  if (score === null) {
    throw new Error('score required for adding scoreboard score');
  }

  const scoreboardScores = await loadScoreboardScores();
  const id = generateUUID();
  scoreboardScores.push({ username, score, id });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(scoreboardScores));

  const resultingScoreboardScores = await listScoreboardScores();
  return { insertId: id, scoreboardScores: resultingScoreboardScores };
};

export const deleteScoreboardScores = async () => {
  localStorage.removeItem(STORAGE_KEY);
};

export default {
  listScores: listScoreboardScores,
  addScore: addScoreboardScore,
  deleteScores: deleteScoreboardScores,
};
