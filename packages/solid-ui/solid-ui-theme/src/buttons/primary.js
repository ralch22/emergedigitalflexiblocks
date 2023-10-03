import common from './common';

export default {
  ...common.button,
  color: `black`,
  '::after': {
    ...common.button['::after'],
    bg: `alpha`,
    borderColor: `alpha`,
  },
};
