import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import Badge from './Badge.vue';

describe('Badge.vue component', () => {
  const localVue = createLocalVue();

  describe('Check modifier theme classes working properly', () => {
    const themeClasses = ['info', 'danger', 'success'];

    themeClasses.forEach(themeClass => {
      it(`Can theme property have '${themeClass}'`, () => {
        const wrapper = shallowMount(Badge, {
          localVue,
          propsData: {
            theme: themeClass,
          },
        });
        expect(wrapper.classes()).toContain(`c-badge--${themeClass}`);
      });
    });
  });
});
