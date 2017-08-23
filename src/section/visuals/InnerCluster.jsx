import React from 'react'
import { connect } from 'react-redux'
import SemiCircle from '../../components/SemiCircle'
import Line from '../../components/LineGauge'
import { roundValue } from '../../../config.js'
import '../../scss/InnerCluster.scss'

const InnerCluster = ({
  state, pusher,
  tankPressure,
  regulatorOutput,
  batteryTemp
}) => {
  let battery48, battery24, battery5, tank, regulator

  if (!batteryTemp) {
    battery48 = battery24 = battery5 = null
  } else {
    //[battery48, battery24, battery5] = batteryTemp[1]
    battery48 = battery24 = battery5 = null
  }

  if (tankPressure.length) tank = tankPressure.slice(-1)[0][1][0]
  if (regulatorOutput.length) regulator = regulatorOutput.slice(-1)[0][1][0]

  return (
    <div className='container-fluid' id='inner-cluster'>
      <div className='row'>
        <div style={{ margin: 'auto' }}>
          <h6>State: {state}</h6>
          <h6>Pusher: {pusher ? 'ON' : 'OFF'}</h6>
        </div>
      </div>
      <div className='row'>
        <SemiCircle
          min={0}
          max={100}
          value={roundValue(tank)}
          label='Tnk pressure'
          unit='PSI'
          width={200} />
        <SemiCircle
          min={0}
          max={100}
          value={roundValue(regulator)}
          label='Regulator'
          unit='PSI'
          width={200} />
      </div>
      <h6 style={{ textAlign: 'center', marginTop: 20 }}>Batteries</h6>
      <div className='row'>
        <Line
          min={0}
          max={100}
          value={battery48}
          label='48V'
          unit=''
          width={200} />
      </div>
      <div className='row'>
        <Line
          min={0}
          max={100}
          value={battery24}
          label='24V'
          unit=''
          width={200} />
      </div>
      <div className='row'>
        <Line
          min={0}
          max={100}
          value={battery5}
          label='5V'
          unit=''
          width={200} />
      </div>
    </div>
  )
}

export default connect(state => ({
  state: state.podData.state,
  pusher: state.podData.pusher,
  tankPressure: state.levData.tankPressure,
  regulatorOutput: state.levData.regulatorOutput,
  batteryTemp: state.podData.batteryTemp,
  batteryVolt: state.podData.batteryVolt,
  batteryAmp: state.podData.batteryAmp
}))(InnerCluster)
