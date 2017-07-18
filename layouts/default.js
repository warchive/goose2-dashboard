import * as Actions from '../src/store/Actions'
import * as Commands from '../events/commands'

export const GaugeDefinitions = [
  {
    title: 'Speed',
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
    unit: 'percentage',
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.temp.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.temp[state.data.temp.length - 1]
      return [latestData[0], latestData[1][0]]
    }
  }, {
    height: 200,
    width: 400,
    column: 4,
    min: 0,
    max: 100,
    title: 'Air Tank Level',
    unit: 'percentage',
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.airTankLevel.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.airTankLevel[state.data.airTankLevel.length - 1]
      return [latestData[0], latestData[1][0]]
    }
  }, {
    height: 200,
    width: 400,
    column: 4,
    min: 0,
    max: 100,
    title: 'distance',
    unit: 'percentage',
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.distance.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.distance[state.data.distance.length - 1]
      return [latestData[0], latestData[1][0]]
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
