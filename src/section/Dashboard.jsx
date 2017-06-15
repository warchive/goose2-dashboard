import React from 'react'
import { Row } from 'react-bootstrap'
import SpeedAccel from './visuals/SpeedAccel'

class Dashboard extends React.Component {
  render () {
    return (
      <Row>
        <SpeedAccel />
      </Row>
    )
  }
}

export default Dashboard
