import * as Actions from '../src/store/Actions'
import * as Commands from '../events/commands'

export const GaugeDefinitions = [
  {
    title: 'Speed',
    type: 'chartGauge',
    unit: 'm/s',
    height: 200,
    width: 400,
    column: 4,
    min: 0,
    max: 100,
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.speed.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.speed[state.data.speed.length - 1]
      return [latestData[0], latestData[1][0]]
    }
  }, {
    height: 200,
    width: 400,
    column: 4,
    min: 0,
    max: 100,
    title: 'Acceleration',
    type: 'chartGauge',
    unit: 'm/s/2',
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.acceleration.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.acceleration[state.data.acceleration.length - 1]
      return [latestData[0], latestData[1][0]]
    }
  }, {
    height: 200,
    width: 400,
    column: 4,
    min: 0,
    max: 100,
    title: 'Battery',
    type: 'chartGauge',
    unit: 'percentage',
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.battery.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.battery[state.data.battery.length - 1]
      return [latestData[0], latestData[1][0]]
    }
  }, {
    height: 200,
    width: 400,
    column: 4,
    min: 0,
    max: 100,
    title: 'Temperature',
    type: 'chartGauge',
    unit: 'percentage',
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.temp.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.temp[state.data.temp.length - 1]
      return [latestData[0], latestData[1][0]]
    }
  }, /*{
    height: 200,
    width: 400,
    column: 8,
    min: 0,
    max: 100,
    title: 'Gyro',
    type: 'multiChart',
    unit: 'percentage',
    dimension: 3,
    bufferSize: 200,
    columnsDef: [
      {
        name: 'x',
        type: 'linear',
        min:  0,
        max: 100,
      },{
        name: 'y',
        type: 'linear',
        min:  0,
        max: 100,
      },{
        name: 'z',
        type: 'linear',
        min:  0,
        max: 100,
      }
    ],
    getValFromState: (state) => {
      if (state.data.gyro.length < 1) {
        return null // Return default data
      }
      return state.data.gyro[state.data.gyro.length - 1]
    }
  }*/
  {
    height: 200,
    width: 400,
    column: 8,
    min: 0,
    max: 100,
    title: 'Gyro',
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
