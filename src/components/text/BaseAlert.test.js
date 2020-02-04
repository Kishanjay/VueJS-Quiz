import { shallowMount } from '@vue/test-utils';
import BaseAlert from './BaseAlert.vue';

describe('BaseAlert.vue', () => {
  const message = 'test message';

  const wrapper = shallowMount(BaseAlert, {
    propsData: { message },
  });

  it('displays the message', () => {
    expect(wrapper.text()).toMatch(message);
  });
});
