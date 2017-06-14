import * as Actions from './src/store/Actions'
import * as Commands from './events/commands'

export const URL = 'ws://localhost:8080/'

export const SPEED_CONF = {
  min: 0,
  max: 100,
  default: 0
}

export const ACCELERATION_CONF = {
  min: 0,
  max: 100,
  default: 0
}

export const SliderDefinitions = [
  {
    name: 'Acceleration',
    min: 0,
    max: 100,
    default: 0,
    action: Actions.CHANGE_ACCELERATION,
    command: Commands.ACCELERATION,
    valueFromState: (state) => state.controls.acceleration
  }, {
    name: 'Speed',
    min: 0,
    max: 100,
    default: 0,
    action: Actions.CHANGE_SPEED,
    command: Commands.SPEED,
    valueFromState: (state) => state.controls.speed
  }
]
