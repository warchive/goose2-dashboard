import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { GaugeDefinitions } from '../../../config'
import GaugeChart from '../../components/GaugeChart'
import LiveChartMulti from '../../components/LiveChartMulti'
import Gauge from '../../components/Gauge'

const GaugeChartGroup = ({ speed, acceleration }) => {
  let connectedGauges = GaugeDefinitions.map(v => {
    let comp
    if (v.type === 'chartGauge') {
      comp = ({ val }) =>
        <GaugeChart
          key={v.title}
          data={val}
          height={v.height}
          width={v.width}
          min={v.min}
          max={v.max}
          title={v.title}
          unit={v.unit}
          bufferSize={v.bufferSize} />
    } else if (v.type === 'multiChart') {
      comp = ({val}) =>
        <LiveChartMulti
          min={v.min}
          max={v.max}
          key={v.title}
          data={val}
          height={v.height}
          width={v.width}
          title={v.title}
          unit={v.unit}
          bufferSize={v.bufferSize}
          dimension={v.dimension}
          columnNames={v.columnNames} />
    } else if (v.type === 'gauge') {
      comp = ({val}) =>
        <Gauge
          min={v.min}
          max={v.max}
          width={v.width}
          height={v.height}
          title={v.title}
          unit={v.unit}
          data={val} />
    }

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
