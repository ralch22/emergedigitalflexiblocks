import common from './common';

export default {
  ...common.badge,
  bg: `black`,
  color: `white`,
  ':hover': {
    bg: `white`,
    color: `black`,
  },
};
