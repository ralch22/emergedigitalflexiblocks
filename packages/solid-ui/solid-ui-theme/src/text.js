const heading = {
  display: `block`,
  color: `heading`,
  textDecoration: `none`,
  mb: 3
}

export default {
  h1: {
    ...heading,
    fontSize: [6, 7],
    maxWidth: 650,
    mx: `auto`,
    mb: 4
  },
  h2: {
    ...heading,
    fontSize: 5,
    maxWidth: 650,
    mx: `auto`,
    mb: 5
  },
  h3: {
    ...heading,
    fontSize: 4
  },
  h4: {
    ...heading,
    fontSize: 3
  },
  h5: {
    ...heading,
    fontSize: 2,
    mb: 2
  },
  h6: {
    ...heading,
    fontSize: 1,
    mb: 0
  },
  medium: {
    fontSize: 2,
    mb: 3
  },
  small: {
    fontSize: 1,
    m: 0
  },
  xsmall: {
    fontSize: 0,
    m: 0
  },
  p: {
    fontFamily: `body`,
    mb: 3
  }
}
