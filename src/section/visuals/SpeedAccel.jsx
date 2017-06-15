import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
// import { GaugeConfig } from '../../../config'
import Gauge from '../../components/Gauge'
import LiveChart from '../../components/LiveChart'

const SpeedAccelChart = ({ speed, acceleration }) => {
  let lastData = speed[speed.length - 1]
  return (
    <Row>
      <Col sm={6}>
        <div>
          <Gauge
            width={200}
            height={200}
            min={0}
            max={100}
            value={lastData[1]}
            default={0}
            unit='km/h'
            title='speed'
          />
        </div>
      </Col>
      <Col sm={6}>
        <LiveChart
          tile='speed'
          unit='m/s'
          value={lastData}
          bufferSize={100}
          />
      </Col>
    </Row>
  )
}

export default connect(
  (state) => {
    return {
      speed: state.data.speed,
      acceleration: state.data.acceleration
    }
  }
)(SpeedAccelChart)
