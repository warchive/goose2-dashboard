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
            data={[this.props.input1, this.props.input2, 30]}
            settings={[
              {
                color: 0xff0000,
                min: 0,
                max: 100,
                label: 'Speed',
                unit: 'm/s'
              },
              {
                color: 0x00ff00,
                min: 0,
                max: 100,
                label: 'Accel',
                unit: 'm/s/s'
              },
              {
                color: 0x0000ff,
                min: 0,
                max: 100,
                label: 'something',
                unit: 'blah'
              }
            ]} />
        </Col>
      </Row>
    )
  }
}

export default connect(
  (state) => Object({
    input1: state.controls.speed,
    input2: state.controls.acceleration
  })
)(Dashboard)
