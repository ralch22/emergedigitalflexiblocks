import common from './common'

export default {
  ...common.button,
  color: `white`,
  backgroundImage: `linear-gradient(90deg, #346464 0%, #433154 100%)`,
  backgroundSize: `200% auto`,
  py: t => `calc(${t.space[2]} + ${t.borderWidths.md}px)`,
  ':hover': {
    backgroundPosition: `right center`
  }
}
