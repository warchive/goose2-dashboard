import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import SemiCircle from '../../components/SemiCircle'
import Line from '../../components/LineGauge'
import { roundValue } from '../../../config.js'
import '../../scss/InnerCluster.scss'

const InnerCluster = ({
  state, pusher,
  highPressure, mediumPressure,
  battery
}) => {
  let tank, regulator

  if (highPressure.length) tank = highPressure.slice(-1)[0][1][0]
  if (mediumPressure.length) regulator = mediumPressure.slice(-1)[0][1][0]

  let battery5Current, battery5Voltage, battery5Temp, battery24Current,
    battery24Voltage, battery24Temp, battery48Current, battery48Voltage,
    battery48Temp

  if (!battery.length) {
    battery5Current =
      battery5Voltage =
      battery5Temp =
      battery24Current =
      battery24Voltage =
      battery24Temp =
      battery48Current =
      battery48Voltage =
      battery48Temp =
      null
  } else {
    let lastBatteryData = battery.slice(-1)[0][1]

    battery5Current = lastBatteryData[0]
    battery5Voltage = lastBatteryData[1]
    battery5Temp = lastBatteryData[2]
    battery24Current = lastBatteryData[3]
    battery24Voltage = lastBatteryData[4]
    battery24Temp = lastBatteryData[5]
    battery48Current = lastBatteryData[6]
    battery48Voltage = lastBatteryData[7]
    battery48Temp = lastBatteryData[8]
  }
  return (
    <div className='container-fluid' id='inner-cluster'>
      <Row>
        <div style={{ margin: 'auto' }}>
          <p style={{ fontSize: 12 }}>State: {state}</p>
          <p style={{ fontSize: 12 }}>Pusher: {pusher ? 'ON' : 'OFF'}</p>
        </div>
      </Row>
      <Row>
        <Col sm={6}>
          <SemiCircle
            min={0}
            max={100}
            value={roundValue(tank)}
            label='Tnk'
            unit='PSI'
            width={150} />
        </Col>
        <Col sm={6}>
          <SemiCircle
            min={0}
            max={100}
            value={roundValue(regulator)}
            label='Regulator'
            unit='PSI'
            width={150} />
        </Col>
      </Row>
      <h6 style={{ textAlign: 'center', marginTop: 20, fontSize: 10 }}>Battery-5V</h6>
      <Row>
        <Col sm={4}>
          <Line
            min={0}
            max={100}
            value={battery5Current}
            label='Curr'
            unit='a'
            width={100} />
        </Col>
        <Col sm={4}>
          <Line
            min={0}
            max={100}
            value={battery5Voltage}
            label='Volt'
            unit='v'
            width={100} />
        </Col>
        <Col sm={4}>
          <Line
            min={0}
            max={100}
            value={battery5Temp}
            label='Temp'
            unit='c'
            width={100} />
        </Col>
      </Row>
      <h6 style={{ textAlign: 'center', marginTop: 20, fontSize: 10 }}>Battery-24V</h6>
      <Row>
        <Col sm={4}>
          <Line
            min={0}
            max={100}
            value={battery24Current}
            label='Curr'
            unit='a'
            width={100} />
        </Col>
        <Col sm={4}>
          <Line
            min={0}
            max={100}
            value={battery24Voltage}
            label='Volt'
            unit='v'
            width={100} />
        </Col>
        <Col sm={4}>
          <Line
            min={0}
            max={100}
            value={battery24Temp}
            label='Temp'
            unit='c'
            width={100} />
        </Col>
      </Row>
      <h6 style={{ textAlign: 'center', marginTop: 20, fontSize: 10 }}>Battery-48V</h6>
      <Row>
        <Col sm={4}>
          <Line
            min={0}
            max={100}
            value={battery48Current}
            label='Curr'
            unit='a'
            width={100} />
        </Col>
        <Col sm={4}>
          <Line
            min={0}
            max={100}
            value={battery48Voltage}
            label='Volt'
            unit='v'
            width={100} />
        </Col>
        <Col sm={4}>
          <Line
            min={0}
            max={100}
            value={battery48Temp}
            label='Temp'
            unit='c'
            width={100} />
        </Col>
      </Row>
    </div>
  )
}

export default connect(state => ({
  state: state.podData.state,
  pusher: state.podData.pusher,
  highPressure: state.levData.highPressure,
  mediumPressure: state.levData.mediumPressure,
  battery: state.podData.battery
}))(InnerCluster)
