import { shallowMount } from '@vue/test-utils';
import BaseScoreboard from './BaseScoreboard.vue';

describe('BaseScoreboard.vue', () => {
  const highlightedId = 'test-id';
  const scoreboardScores = [
    {
      score: 10,
      username: 'Indiana Jones',
      id: highlightedId,
    },
  ];
  const wrapper = shallowMount(BaseScoreboard, {
    propsData: { scoreboardScores, highlightedId },
  });

  it('displays the username and score', () => {
    expect(wrapper.text().includes('Indiana Jones')).toBe(true);
    expect(wrapper.text().includes('10')).toBe(true);
  });

  it('Highlight entry correctly', () => {
    expect(wrapper.html().includes('table-primary'));
  });
});
