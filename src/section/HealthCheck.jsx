import React from 'react'
import { connect } from 'react-redux'
import SensorHealth from '../components/SensorHealth'

const HealthCheck = ({ state }) => {
  return (
    <div>
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
    </div>
  )
}

export default connect(
  (state) => Object({
    state: state
  })
)(HealthCheck)
