import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { GaugeDefinitions } from '../../../config'
import GaugeChart from '../../components/GaugeChart'

const GaugeChartGroup = ({ speed, acceleration }) => {
  let connectedGauges = GaugeDefinitions.map(v => {
    let comp = ({ val }) =>
      <GaugeChart
        key={v.title}
        value={val}
        height={v.height}
        width={v.width}
        min={v.min}
        max={v.max}
        title={v.title}
        unit={v.unit}
        bufferSize={v.bufferSize} />

    let Connected = connect((state) => {
      return {
        val: v.getValFromState(state)
      }
    })(comp)

    return <Col sm={v.column} key={v.title}>
      <Connected />
    </Col>
  })

  return (
    <Row>
      {
        connectedGauges
      }
    </Row>
  )
}

export default GaugeChartGroup
