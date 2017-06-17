import * as Actions from './src/store/Actions'
import * as Commands from './events/commands'

export const URL = 'ws://192.168.1.142:8002/'
export const PROMPT_FOR_URL = true

export const CACHE_LAST_DATA = true

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
export const SliderDefinitions = [
  {
    title: 'Acceleration',
    min: 0,
    max: 100,
    default: 0,
    action: Actions.CHANGE_ACCELERATION,
    command: Commands.ACCELERATION,
    getValFromState: (state) => state.controls.acceleration
  }, {
    title: 'Speed',
    min: 0,
    max: 100,
    default: 0,
    action: Actions.CHANGE_SPEED,
    command: Commands.SPEED,
    getValFromState: (state) => state.controls.speed
  }
]

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
export const GaugeDefinitions = [
  {
    title: 'Speed',
    unit: 'm/s',
    height: 200,
    column: 4,
    min: 0,
    max: 100,
    bufferSize: 200,
    getValFromState: (state) =>
      state.data.speed[state.data.speed.length - 1]
  }, {
    height: 200,
    column: 4,
    min: 0,
    max: 100,
    title: 'Acceleration',
    unit: 'm/s/2',
    bufferSize: 200,
    getValFromState: (state) =>
      state.data.acceleration[state.data.acceleration.length - 1]
  }, {
    height: 200,
    column: 4,
    min: 0,
    max: 100,
    title: 'Battery',
    unit: 'percentage',
    bufferSize: 200,
    getValFromState: (state) =>
      state.data.battery[state.data.battery.length - 1]
  }, {
    height: 200,
    column: 4,
    min: 0,
    max: 100,
    title: 'Temperature',
    unit: 'percentage',
    bufferSize: 200,
    getValFromState: (state) =>
      state.data.temp[state.data.temp.length - 1]
  }, {
    height: 200,
    column: 4,
    min: 0,
    max: 100,
    title: 'Air Tank Level',
    unit: 'percentage',
    bufferSize: 200,
    getValFromState: (state) =>
      state.data.airTankLevel[state.data.airTankLevel.length - 1]
  }, {
    height: 200,
    column: 4,
    min: 0,
    max: 100,
    title: 'distance',
    unit: 'percentage',
    bufferSize: 200,
    getValFromState: (state) =>
      state.data.distance[state.data.distance.length - 1]
  }
]*/

export const GaugeDefinitions = [
  {
    title: 'Photo',
    unit: '',
    height: 200,
    column: 12,
    min: 0,
    max: 1000,
    bufferSize: 200,
    getValFromState: (state) => {
      let currData = state.data.photo[state.data.photo.length - 1]
      return [currData[0], currData[1][0]]
    }
  }
]
