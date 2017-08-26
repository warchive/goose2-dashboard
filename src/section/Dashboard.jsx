import React from 'react'
import { Row, Col } from 'react-bootstrap'
import CentralCluster from './CentralCluster'
import { connect } from 'react-redux'
import InnerCluster from './visuals/InnerCluster'
import RollPitchYaw from './visuals/RollPitchYaw'
import HealthCheck from './HealthCheck'
import MessageDisplay from '../components/MessageDisplay'

const centralClusterSettings = [
  {
    color: 0x99FD77,
    min: 0,
    max: 100,
    label: 'Speed',
    unit: 'm/s'
  },
  {
    color: 0x8ADCFF,
    min: 0,
    max: 100,
    label: 'Accel',
    unit: 'm/s/s'
  },
  {
    color: 0xFF7575,
    min: 0,
    max: 100,
    label: 'Pos',
    unit: 'm'
  }
]

class Dashboard extends React.Component {
  shouldComponentUpdate (nextProps) {
    return !(
      this.props.speed === nextProps.speed &&
      this.props.accel === nextProps.accel &&
      this.props.distance === nextProps.distance
    )
  }

  render () {
    return (
      <Row className='dashboard'>
        <Col sm={2}>
          <RollPitchYaw />
        </Col>
        <Col sm={7}>
          <CentralCluster
            height={500}
            data={[this.props.speed, this.props.accel, this.props.distance]}
            settings={centralClusterSettings}>
            <InnerCluster />
          </CentralCluster>
        </Col>
        <Col sm={3}>
          <Row>
            <HealthCheck />
          </Row>
          <Row>
            <MessageDisplay height={200} />
          </Row>
        </Col>
      </Row>
    )
  }
}

function getLastPairValue (array, idx) {
  let lastIdx = array.length - 1
  if (lastIdx === -1) return null

  return array[lastIdx][1][idx]
}

/**
 * @todo: intergrate this part, not sure where to get the data points right now
 */

export default connect(
  (state) => ({
    speed: 0,
    accel: getLastPairValue(state.podData.imu, 4),
    distance: getLastPairValue(state.podData.color, 0)
  })
)(Dashboard)
