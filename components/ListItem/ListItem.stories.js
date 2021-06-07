import Component from './ListItem';

export default {
  title: 'Form/ListItem',
  component: Component,
  argTypes: {},
};

export const Input = (arg, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<ListItem
    :id="24"
    :name="$props.name"
    :isDisabled="$props.isDisabled"
    :isValid="$props.isValid"
    :isInvalid="$props.isInvalid"
    :isWarning="$props.isWarning"
  >
  Lorem Ipsum
  </ListItem>`,
});
