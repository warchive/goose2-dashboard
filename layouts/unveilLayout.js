import * as Actions from '../src/store/Actions'
import * as Commands from '../events/commands'

export const GaugeDefinitions = [
  {
    height: 200,
    width: 200,
    column: 2,
    min: 0,
    max: 100,
    title: 'Distance',
    type: 'gauge',
    unit: 'millimeters',
    getValFromState: (state) => {
      if (state.data.distance.length < 1) {
        return 0 // Return default data
      }
      return state.data.distance[state.data.distance.length - 1][1][0]
    }
  }, {
    height: 200,
    width: 200,
    column: 2,
    min: 0,
    max: 100,
    title: 'IR Temperature',
    type: 'gauge',
    unit: 'degrees',
    getValFromState: (state) => {
      if (state.data.irtemp.length < 1) {
        return 0 // Return default data
      }
      return state.data.irtemp[state.data.irtemp.length - 1][1][0]
    }
  },
  {
    height: 200,
    width: 400,
    column: 4,
    min: -5,
    max: 5,
    title: 'Acceleration (m/s/s)',
    type: 'multiChart',
    unit: 'percentage',
    bufferSize: 50,
    columnNames: ['x', 'y', 'z'],
    getValFromState: (state) => {
      if (state.data.acceleration.length < 1) {
        return null // Return default data
      }
      return state.data.acceleration[state.data.acceleration.length - 1]
    }
  },{
    height: 200,
    width: 400,
    column: 4,
    min: -8,
    max: 8,
    title: 'Roll Pitch Yaw (degrees)',
    type: 'multiChart',
    unit: 'degrees',
    bufferSize: 50,
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
    min: -8,
    max: 8,
    title: 'Angular Velocity',
    type: 'multiChart',
    unit: 'degrees',
    bufferSize: 50,
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
    min: -1,
    max: 1,
    title: 'Linear Velocity (m/s)',
    type: 'multiChart',
    unit: 'degrees',
    bufferSize: 50,
    columnNames: ['x', 'y', 'z'],
    getValFromState: (state) => {
      if (state.data.linearVelocity.length < 1) {
        return null // Return default data
      }
      return state.data.linearVelocity[state.data.linearVelocity.length - 1]
    }
  },{
    height: 200,
    width: 400,
    column: 4,
    min: -1,
    max: 20,
    title: 'Linear Displacement (m)',
    type: 'multiChart',
    unit: 'degrees',
    bufferSize: 50,
    columnNames: ['x', 'y', 'z'],
    getValFromState: (state) => {
      if (state.data.linearDisplacement.length < 1) {
        return null // Return default data
      }
      return state.data.linearDisplacement[state.data.linearDisplacement.length - 1]
    }
  }
]

export const SliderDefinitions = [
  {
    title: 'Speed - Drive',
    min: -1,
    max: 1,
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
