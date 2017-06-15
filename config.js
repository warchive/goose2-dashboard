import * as Actions from './src/store/Actions'
import * as Commands from './events/commands'

export const URL = 'ws://localhost:8080/'

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

export const GaugeConfig = {
  speed: {
    label: 'Speed',
    id: 'speed-gauge',
    width: 120,
    height: 120,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5
  }
}
