import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button.vue component', () => {
  const localVue = createLocalVue();

  it('Check button has c-button class', () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        tag: 'a', // Required
        theme: 'primary', // Required
      },
    });

    expect(wrapper.classes()).toContain('c-button');
  });

  describe('Check modifier theme classes working properly', () => {
    const themeClasses = ['primary', 'info', 'danger'];

    themeClasses.forEach(themeClass => {
      it(`Can theme property have '${themeClass}'`, () => {
        const wrapper = shallowMount(Button, {
          localVue,
          propsData: {
            tag: 'a', // Required
            theme: 'primary', // Required
            theme: themeClass,
          },
        });

        expect(wrapper.classes()).toContain('c-button--' + themeClass);
      });
    });
  });

  it('Check button has c-button--small if isSmall is true', () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        tag: 'a', // Required
        theme: 'primary', // Required
        isSmall: true,
      },
    });

    expect(wrapper.classes()).toContain('c-button--small');
  });

  it('Check button has c-button--circle if isCircle is true', () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        tag: 'a', // Required
        theme: 'primary', // Required
        isCircle: true,
      },
    });

    expect(wrapper.classes()).toContain('c-button--circle');
  });

  it('Check button has is-disabled if isDisabled is true', () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        tag: 'a', // Required
        theme: 'primary', // Required
        isDisabled: true,
      },
    });

    expect(wrapper.classes()).toContain('is-disabled');
  });

  describe('Check button href attribute working properly', () => {
    it(`Check href working properly`, () => {
      const wrapper = mount(Button, {
        localVue,
        propsData: {
          tag: 'a', // Required
          theme: 'primary', // Required
          href: 'example.com',
        },
      });

      expect(wrapper.attributes('href')).toBe('example.com');
    });

    it(`Should be undefined if href is empty`, () => {
      const wrapper = mount(Button, {
        localVue,
        propsData: {
          tag: 'a', // Required
          theme: 'primary', // Required
        },
      });

      expect(wrapper.attributes('href')).toBeUndefined();
    });
  });

  describe('Check button type attribute working properly', () => {
    it(`Check type working properly`, () => {
      const wrapper = mount(Button, {
        localVue,
        propsData: {
          tag: 'a', // Required
          theme: 'primary', // Required
          type: 'button',
        },
      });

      expect(wrapper.attributes('type')).toBe('button');
    });

    it(`Should be undefined if type is empty`, () => {
      const wrapper = mount(Button, {
        localVue,
        propsData: {
          tag: 'a', // Required
          theme: 'primary', // Required
          type: '',
        },
      });

      expect(wrapper.attributes('type')).toBeUndefined();
    });
  });

  describe('Check button to attribute working properly', () => {
    it(`Check to working properly`, () => {
      const wrapper = mount(Button, {
        localVue,
        propsData: {
          tag: 'a', // Required
          theme: 'primary', // Required
          to: '/',
        },
      });

      expect(wrapper.attributes('to')).toBe('/');
    });

    it(`Should be undefined if to is empty`, () => {
      const wrapper = mount(Button, {
        localVue,
        propsData: {
          tag: 'a', // Required
          theme: 'primary', // Required
        },
      });

      expect(wrapper.attributes('to')).toBeUndefined();
    });
  });

  it(`Check if component is 'NuxtLink'`, () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        tag: 'NuxtLink', // Required
        theme: 'primary', // Required
        type: '', // Will be removed
      },
    });

    expect(wrapper.attributes('href')).toBeUndefined();
    expect(wrapper.attributes('type')).toBeUndefined();
  });

  it("Check if component is 'a'", () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        tag: 'a', // Required
        theme: 'primary', // Required
        type: '',
      },
    });

    expect(wrapper.attributes('to')).toBeUndefined();
    expect(wrapper.attributes('type')).toBeUndefined();
  });

  it(`Check if component is 'button'`, () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        tag: 'a', // Required
        theme: 'primary', // Required
      },
    });

    expect(wrapper.attributes('href')).toBeUndefined();
    expect(wrapper.attributes('to')).toBeUndefined();
  });

  describe('Check button disabled attribute working properly', () => {
    it(`Check disabled working properly`, () => {
      const wrapper = mount(Button, {
        localVue,
        propsData: {
          tag: 'a', // Required
          theme: 'primary', // Required
          isDisabled: true,
        },
      });

      expect(wrapper.attributes('disabled')).toBe('disabled');
    });

    it(`Should be undefined if disabled is null`, () => {
      const wrapper = mount(Button, {
        localVue,
        propsData: {
          tag: 'a', // Required
          theme: 'primary', // Required
        },
      });

      expect(wrapper.attributes('disabled')).toBeUndefined();
    });
  });
});
