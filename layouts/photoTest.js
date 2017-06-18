// import * as Actions from './src/store/Actions'
// import * as Commands from './events/commands'

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

export const SliderDefinitions = []
