import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
// import { GaugeConfig } from '../../../config'
import GaugeChart from '../../components/GaugeChart'

const SpeedChart = ({ val }) => {
  return (
    <GaugeChart
      value={val}
      height={200}
      min={0}
      max={100}
      title='Speed'
      unit='m/s'
      bufferSize={200} />
  )
}

const SpeedChartConnected = connect((state) => {
  return {
    val: state.data.speed[state.data.speed.length - 1]
  }
})(SpeedChart)

const AccelerationChart = ({ val }) => {
  return (
    <GaugeChart
      value={val}
      height={200}
      min={0}
      max={100}
      title='Speed'
      unit='m/s'
      bufferSize={200} />
  )
}

const AccelerationChartConnected = connect((state) => {
  return {
    val: state.data.acceleration[state.data.acceleration.length - 1]
  }
})(AccelerationChart)

const SpeedAccelChart = ({ speed, acceleration }) => {
  return (
    <Row>
      <Col sm={6}>
        <SpeedChartConnected />
      </Col>

      <Col sm={6}>
        <AccelerationChartConnected />
      </Col>
    </Row>
  )
}

export default SpeedAccelChart
