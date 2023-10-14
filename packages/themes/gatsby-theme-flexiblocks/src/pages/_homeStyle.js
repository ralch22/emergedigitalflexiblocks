import heroBg from './assets/contour-pattern.svg';
import bg from './assets/3CX.jpg';

export default {
  heroContainer: {
    '::before': {
      content: `" "`,
      size: `full`,
      position: `absolute`,
      top: `-10%`,
      left: 0,
      zIndex: -1,
      background: t => `url(${heroBg}) no-repeat center 0`,
      backgroundSize: `100%`,
    },
  },
  heroContainer3CX: {
    '::before': {
      content: `" "`,
      size: `full`,
      position: `absolute`,
      top: `-10%`,
      left: 0,
      zIndex: -1,
      background: t =>
        `url(${bg}) no-repeat center 0, linear-gradient(
          180deg,
          ${t.colors.alphaLighter} 0%,
          ${t.colors.background} 100%
        )`,
      backgroundSize: `100%`,
    },
  },
  strategiesContainer: {
    position: `relative`,
    '::before': {
      content: `" "`,

      width: `full`,
      height: `150%`,
      position: `absolute`,
      overflowX: 'hidden',
      top: 0,
      left: 0,
      zIndex: -1,
      background: t =>
        `url(${heroBg}) no-repeat center 0, linear-gradient(
          180deg,
          ${t.colors.alphaLighter} 0%,
          ${t.colors.background} 100%
        )`,
      backgroundSize: `100%`,
    },
  },
  whyChooseUsContainer: {
    bg: `omegaLighter`,
    borderRadius: `xl`,
    py: 5,
    px: [4, 0],
  },
};