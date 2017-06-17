import React from 'react'
import { Row, Col } from 'react-bootstrap'
import GaugeChartGroup from './visuals/GaugeChartGroup'

class Dashboard extends React.Component {
  render () {
    return (
      <Row className='dashboard'>
        <Col sm={12}>
          <GaugeChartGroup />
        </Col>
      </Row>
    )
  }
}

export default Dashboard
