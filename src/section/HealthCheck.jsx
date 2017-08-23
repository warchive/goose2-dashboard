import React from 'react'
import { connect } from 'react-redux'
import SensorHealth from '../components/SensorHealth'

/** Bootstrap */
import { Grid, Row, Col } from 'react-bootstrap'

const HealthCheck = ({ state }) => {

  // <div style={{
  //   display: 'flex',
  //   justifyContent: 'flex-start',
  //   alignItems: 'stretch',
  //   flex: 'row wrap'
  // }}>
  return (
    <Row style={{
      justifyContent: 'center'
    }}>
      <SensorHealth
        val={state.connection.connected}
        error={(val) => !val}
        warning={(val) => false}>
        Connection
      </SensorHealth>

      <SensorHealth
        val={state.controls.magwheel}
        error={(val) => val > 75}
        warning={(val) => val > 50}>
        Magwheels
      </SensorHealth>

      <SensorHealth
        val={state.controls.magwheel}
        error={(val) => val > 75}
        warning={(val) => val > 50}>
        Magwheels
      </SensorHealth>

      <SensorHealth
        val={state.controls.magwheel}
        error={(val) => val > 75}
        warning={(val) => val > 50}>
        Magwheels
      </SensorHealth>

      <SensorHealth
        val={state.controls.magwheel}
        error={(val) => val > 75}
        warning={(val) => val > 50}>
        Magwheels
      </SensorHealth>

      <SensorHealth
        val={state.controls.magwheel}
        error={(val) => val > 75}
        warning={(val) => val > 50}>
        Magwheels
      </SensorHealth>

      <SensorHealth
        val={state.controls.magwheel}
        error={(val) => val > 75}
        warning={(val) => val > 50}>
        Magwheels
      </SensorHealth>

      <SensorHealth
        val={state.controls.magwheel}
        error={(val) => val > 75}
        warning={(val) => val > 50}>
        Magwheels
      </SensorHealth>

      <SensorHealth
        val={state.controls.magwheel}
        error={(val) => val > 75}
        warning={(val) => val > 50}>
        Magwheels
      </SensorHealth>
    </Row>
  )
}

export default connect(
  (state) => Object({
    state: state
  })
)(HealthCheck)
