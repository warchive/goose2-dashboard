import * as Actions from '../src/store/Actions'
import * as Commands from '../events/commands'

export const GaugeDefinitions = [
  {
    height: 200,
    width: 200,
    column: 2,
    min: 0,
    max: 100,
    title: 'Battery',
    type: 'gauge',
    unit: 'percentage',
    getValFromState: (state) => {
      if (state.data.battery.length < 1) {
        return 0 // Return default data
      }
      return state.data.battery[state.data.battery.length - 1][1][0]
    }
  }, {
    height: 200,
    width: 200,
    column: 2,
    min: 0,
    max: 100,
    title: 'Temperature',
    type: 'gauge',
    unit: 'percentage',
    getValFromState: (state) => {
      if (state.data.temp.length < 1) {
        return 0 // Return default data
      }
      return state.data.temp[state.data.temp.length - 1][1][0]
    }
  },
  {
    height: 200,
    width: 400,
    column: 4,
    min: 0,
    max: 100,
    title: 'Acceleration',
    type: 'multiChart',
    unit: 'percentage',
    bufferSize: 200,
    columnNames: ['x', 'y', 'z'],
    getValFromState: (state) => {
      if (state.data.gyro.length < 1) {
        return null // Return default data
      }
      return state.data.gyro[state.data.gyro.length - 1]
    }
  },{
    height: 200,
    width: 400,
    column: 4,
    min: 0,
    max: 100,
    title: 'Roll Pitch Yaw',
    type: 'multiChart',
    unit: 'degrees',
    bufferSize: 200,
    columnNames: ['Roll', 'Pitch', 'Yaw'],
    getValFromState: (state) => {
      if (state.data.rollPitchYaw.length < 1) {
        return null // Return default data
      }
      return state.data.rollPitchYaw[state.data.rollPitchYaw.length - 1]
    }
  },{
    height: 200,
    width: 400,
    column: 4,
    min: 0,
    max: 100,
    title: 'Angular Velocity',
    type: 'multiChart',
    unit: 'degrees',
    bufferSize: 200,
    columnNames: ['x', 'y', 'z'],
    getValFromState: (state) => {
      if (state.data.angularVelocity.length < 1) {
        return null // Return default data
      }
      return state.data.angularVelocity[state.data.angularVelocity.length - 1]
    }
  }
]

export const SliderDefinitions = [
  {
    title: 'Speed - Drive',
    min: 0,
    max: 100,
    default: 0,
    action: Actions.CHANGE_DRIVETRAIN_SPEED,
    command: Commands.DRIVE_TRAIN_SPEED,
    getValFromState: (state) => state.controls.acceleration
  }, {
    title: 'Speed - Mag',
    min: 0,
    max: 100,
    default: 0,
    action: Actions.CHANGE_MAGWHEEL_SPEED,
    command: Commands.MAGWHEEL_SPEED,
    getValFromState: (state) => state.controls.speed
  }
]
