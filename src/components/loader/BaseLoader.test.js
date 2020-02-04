import { shallowMount } from '@vue/test-utils';
import BaseLoader from './BaseLoader.vue';

describe('BaseLoader.vue', () => {
  const title = 'test title';

  const wrapper = shallowMount(BaseLoader, {
    propsData: { title },
  });

  it('displays the title', () => {
    expect(wrapper.text()).toMatch(title);
  });
});
