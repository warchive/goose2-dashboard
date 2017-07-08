import * as Actions from '../src/store/Actions'
import * as Commands from '../events/commands'

export const GaugeDefinitions = [
  {
    title: 'Gyro X',
    unit: 'degrees',
    height: 200,
    width: 400,
    column: 4,
    min: -245,
    max: 245,
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.gyro.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.gyro[state.data.gyro.length - 1]

      return [latestData[0], latestData[1][0]]
    }
  }, {
    title: 'Gyro Y',
    unit: 'degrees',
    height: 200,
    width: 400,
    column: 4,
    min: -245,
    max: 245,
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.gyro.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.gyro[state.data.gyro.length - 1]
      return [latestData[0], latestData[1][1]]
    }
  },{
    title: 'Gyro Z',
    unit: 'degrees',
    height: 200,
    width: 400,
    column: 4,
    min: -245,
    max: 245,
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.gyro.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.gyro[state.data.gyro.length - 1]
      return [latestData[0], latestData[1][2]]
    }
  },{
    title: 'Acceleration X',
    unit: 'g',
    height: 200,
    width: 400,
    column: 4,
    min: -2,
    max: 2,
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.acceleration.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.acceleration[state.data.acceleration.length - 1]
      return [latestData[0], latestData[1][0]]
    }
  },{
    title: 'Acceleration Y',
    unit: 'g',
    height: 200,
    width: 400,
    column: 4,
    min: -2,
    max: 2,
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.acceleration.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.acceleration[state.data.acceleration.length - 1]
      return [latestData[0], latestData[1][1]]
    }
  },{
    title: 'Acceleration Z',
    unit: 'g',
    height: 200,
    width: 400,
    column: 4,
    min: -2,
    max: 2,
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.acceleration.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.acceleration[state.data.acceleration.length - 1]
      return [latestData[0], latestData[1][2]]
    }
  },{
    title: 'Magneto X',
    unit: 'g',
    height: 200,
    width: 400,
    column: 4,
    min: -100,
    max: 100,
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.magnetometer.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.magnetometer[state.data.magnetometer.length - 1]
      return [latestData[0], latestData[1][0]]
    }
  },{
    title: 'Magneto Y',
    unit: 'g',
    height: 200,
    width: 400,
    column: 4,
    min: -100,
    max: 100,
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.magnetometer.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.magnetometer[state.data.magnetometer.length - 1]
      return [latestData[0], latestData[1][1]]
    }
  },{
    title: 'Magneto Z',
    unit: 'g',
    height: 200,
    width: 400,
    column: 4,
    min: -100,
    max: 100,
    bufferSize: 200,
    getValFromState: (state) => {
      if (state.data.magnetometer.length < 1) {
        return [-1, 0] // Return default data
      }
      let latestData = state.data.magnetometer[state.data.magnetometer.length - 1]
      return [latestData[0], latestData[1][2]]
    }
  },
]

export const SliderDefinitions = []
