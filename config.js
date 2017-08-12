/**
 * Configuration file for the control panel, we should
 * try to move as much definitions as possible here
 */

// Default URL for the server
export const URL = 'ws://localhost:8000/'

// If we need to prompt for URL every time
export const PROMPT_FOR_URL = false

// If we want to cache all recieved data in the redux store
export const CACHE_LAST_DATA = true

// Expected time delay between heart beats
export const HEART_BEAT_POLLING_DELAY = 200

// How many decimal places values should be rounded to
export const ROUNDING = 1

export const roundValue = (val) => Math.round(val * (10 ** ROUNDING)) / 10 ** ROUNDING

/**
 * @typedef {Object} SliderConfig
 * @property {String} title The title for the slider
 * @property {Integer} min The minmum value
 * @property {Integer} max The maximum value
 * @property {Integer} default The default value
 * @property {String} action The redux action that will be emitted on change
 * @property {String} command The command that will be sent to the pod
 * @property {Function} valueFromControl Getting the value from state.control
 */

/**
 * @typedef {Object} GaugeConfig
 * @property {String} title Name of the display
 * @property {String} unit Units of the display
 * @property {Integer} height Height of the display in px
 * @property {Integer} column About of bootstrap grid columns
 * @property {Integer} min Minimum value
 * @property {Integer} max Maximum value
 * @property {Integer} bufferSize How many values will be displayed
 * @property {Function} getvalFromState return the date val tuple from state
 *  at once
 *
 */

/**
 * Import Gauge and Slider definitions from a layout file and re-export them
 */
export {
  GaugeDefinitions,
  SliderDefinitions
}
from './layouts/unveilLayout' // eslint-disable-line
