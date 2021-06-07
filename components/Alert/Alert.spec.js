import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import Alert from './Alert.vue';

describe('Alert.vue Component', () => {
  const localVue = createLocalVue();

  it('Is alert closable', () => {
    const wrapper = mount(Alert, {
      localVue,
      propsData: {
        theme: 'info', // Required
        isClosable: true,
      },
    });

    expect(wrapper.classes()).toContain('has-close-button');
  });

  describe('Check modifier theme classes working properly', () => {
    const themeClasses = ['info', 'danger', 'success'];

    themeClasses.forEach(themeClass => {
      it(`Can theme property have '${themeClass}'`, () => {
        const wrapper = shallowMount(Alert, {
          localVue,
          propsData: {
            theme: themeClass,
          },
        });
        expect(wrapper.classes()).toContain(`c-alert--${themeClass}`);
      });
    });
  });

  it('Check close button showing properly', () => {
    const wrapper = mount(Alert, {
      localVue,
      propsData: {
        theme: 'info', // Required
        isClosable: true,
      },
    });

    expect(wrapper.html().includes('c-alert__close')).toBe(true);
  });

  it('Check button calls deleteAlert when clicked', async () => {
    const wrapper = mount(Alert, {
      localVue,
      propsData: {
        theme: 'info', // Required
      },
    });

    const deleteAlert = jest.spyOn(wrapper.vm, 'deleteAlert');
    await wrapper.vm.deleteAlert();

    wrapper.find('button').trigger('click');
    expect(deleteAlert).toHaveBeenCalled();

    setTimeout(() => {
      expect(wrapper.html()).toBe(false);
    }, 1000);
  });

  it('Check iconName working properly', () => {
    const iconName = 'info';

    const wrapper = mount(Alert, {
      localVue,
      propsData: {
        theme: 'info', // Required
        iconName,
      },
    });
    expect(wrapper.html().includes('info')).toBe(true);
  });

  it('Check iconTitle working properly', () => {
    const iconTitle = 'info';

    const wrapper = mount(Alert, {
      localVue,
      propsData: {
        theme: 'info', // Required
        iconTitle,
      },
    });

    expect(wrapper.html().includes('info')).toBe(true);
  });

  it('Check svg alert icon showing properly', () => {
    const wrapper = mount(Alert, {
      localVue,
      propsData: {
        theme: 'info', // Required
        hasIcon: true,
      },
    });

    expect(wrapper.html().includes('c-alert__icon')).toBe(true);
  });
});
