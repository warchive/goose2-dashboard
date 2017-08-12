import React from 'react'
import { Row, Col } from 'react-bootstrap'
import CentralCluster from './CentralCluster'
import { connect } from 'react-redux'

class Dashboard extends React.Component {
  render () {
    return (
      <Row className='dashboard'>
        <Col sm={12}>
          <CentralCluster
            height={600}
            data={[this.props.speed, this.props.accel, 100]}
            settings={[
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
                label: 'something',
                unit: 'blah'
              }
            ]}>
            <div className='container-fluid'>
              <div className='row'>
                <div style={{ margin: 'auto' }}>
                  <p>State:</p>
                </div>
              </div>
            </div>

          </CentralCluster>
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

export default connect(
  (state) => Object({
    speed: getLastPairValue(state.data.speed, 0),
    accel: getLastPairValue(state.data.acceleration, 0),
    distance: getLastPairValue(state.data.distance, 0)
  })
)(Dashboard)
