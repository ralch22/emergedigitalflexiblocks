/**
 *
 * These styles are solely for adding [background images] or
 * [background colors] to blocks.
 *
 */

import tornado from './assets/tornado-pattern.svg'

export default {
  heroContainer: {
    position: `relative`,
    background: `url(${tornado}) no-repeat`,
    width: "100%",
    height: "40vh"
    },
  teamContainer: {
    'img, .block-overlay': {
      borderRadius: `xl`
    }
  }
}
