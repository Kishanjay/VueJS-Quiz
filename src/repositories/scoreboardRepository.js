const STORAGE_KEY = 'scoreboardStorage';

export const isValidScoreboardScore = (score) => {
  if (!('score' in score)) {
    return false;
  }
  if (!('username' in score)) {
    return false;
  }
  return true;
};

export const listScoreboardScores = async (filter) => {
  let result = localStorage.getItem(STORAGE_KEY) || [];

  if (filter.username) {
    result = result.filter((s) => s.username === filter.username);
  }

  // ignore invalid data (localstorage is user modifyable)
  result = result.filter((s) => isValidScoreboardScore(s));

  return result.sort((a, b) => a.score - b.score);
};

export const addScoreboardScore = async (score, username) => {
  if (!score) {
    throw new Error('score required for adding scoreboard score');
  }

  const scoreboardScores = localStorage.getItem(STORAGE_KEY) || [];
  scoreboardScores.push(username, score);

  localStorage.setItem(STORAGE_KEY, scoreboardScores);
};

export const deleteScoreboardScores = async () => {
  localStorage.removeItem(STORAGE_KEY);
};

export default {
  listScores: listScoreboardScores,
  addScore: addScoreboardScore,
  deleteScores: deleteScoreboardScores,
};
