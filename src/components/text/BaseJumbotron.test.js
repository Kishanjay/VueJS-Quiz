import { shallowMount } from '@vue/test-utils';
import BaseJumbotron from './BaseJumbotron.vue';

describe('BaseJumbotron.vue', () => {
  const title = 'test_title';
  const description = 'test_description';
  const input = 'test_input';
  const cta = 'test_cta';

  const wrapper = shallowMount(BaseJumbotron, {
    propsData: {
      title, description, input, cta,
    },
  });

  it('displays the title', () => {
    expect(wrapper.text().includes(title)).toBe(true);
  });

  it('displays the description', () => {
    expect(wrapper.text().includes(description)).toBe(true);
  });

  it('displays the input', () => {
    expect(wrapper.text().includes(input)).toBe(true);
  });

  it('displays the cta', () => {
    expect(wrapper.text().includes(cta)).toBe(true);
  });
});
