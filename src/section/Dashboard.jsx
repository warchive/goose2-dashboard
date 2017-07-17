import React from 'react'
import { Row, Col } from 'react-bootstrap'
import CentralCluster from './CentralCluster'

class Dashboard extends React.Component {
  render () {
    return (
      <Row className='dashboard'>
        <Col sm={12}>
          <CentralCluster
            height={600}
            data={[10, 20, 30]}
            settings= {[
              {
                color: 0xff0000,
                min: 0,
                max: 100
              },
              {
                color: 0x00ff00,
                min: 0,
                max: 100
              },
              {
                color: 0x0000ff,
                min: 0,
                max: 100
              }
            ]}/>
        </Col>
      </Row>
    )
  }
}

export default Dashboard
