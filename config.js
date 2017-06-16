import * as Actions from './src/store/Actions'
import * as Commands from './events/commands'

export const URL = 'ws://localhost:8080/'

export const CACHE_LAST_DATA = true

export const SliderDefinitions = [
  {
    name: 'Acceleration',
    min: 0,
    max: 100,
    default: 0,
    action: Actions.CHANGE_ACCELERATION,
    command: Commands.ACCELERATION,
    valueFromControl: (controls) => controls.acceleration
  }, {
    name: 'Speed',
    min: 0,
    max: 100,
    default: 0,
    action: Actions.CHANGE_SPEED,
    command: Commands.SPEED,
    valueFromControl: (controls) => controls.speed
  }
]

export const GaugeConfig = [
  {
    height: 200,
    min: 0,
    max: 100,
    title: 'Speed',
    unit: 'm/s',
    bufferSize: 200,
    getValFromState: (state) =>
      state.data.speed[state.data.speed.length - 1]
  }, {
    height: 200,
    min: 0,
    max: 100,
    title: 'Acceleration',
    unit: 'm/s/2',
    bufferSize: 200,
    getValFromState: (state) =>
      state.data.acceleration[state.data.acceleration.length - 1]
  }, {
    height: 200,
    min: 0,
    max: 100,
    title: 'Battery',
    unit: 'percentage',
    bufferSize: 200,
    getValFromState: (state) =>
      state.data.battery[state.data.battery.length - 1]
  }
]
