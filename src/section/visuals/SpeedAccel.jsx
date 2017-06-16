import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { GaugeConfig } from '../../../config'
import GaugeChart from '../../components/GaugeChart'

/*
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
200
const AccelerationChartConnected = connect((state) => {
  return {
    val: state.data.acceleration[state.data.acceleration.length - 1]
  }
})(AccelerationChart)
*/
const SpeedAccelChart = ({ speed, acceleration }) => {
  let connectedGauges = GaugeConfig.map(v => {
    let comp = ({val}) =>
      <GaugeChart
        key={v.title}
        value={val}
        height={v.height}
        min={v.min}
        max={v.max}
        title={v.title}
        unit={v.unit}
        bufferSize={v.bufferSize} />

    return connect((state) => {
      return {
        val: v.getValFromState(state)
      }
    })(comp)
  })

  return (
    <Row>
      {
        connectedGauges.map((V, i) =>
          <Col sm={4} key={i}>
            <V />
          </Col>)
      }
    </Row>
  )
}

export default SpeedAccelChart
