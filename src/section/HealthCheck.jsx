import React from 'react'
import { connect } from 'react-redux'
import SensorHealth from '../components/SensorHealth'

/** Bootstrap */
import { Row } from 'react-bootstrap'

const HealthCheck = ({ state }) => {
  return (
    <div>
      <h6>Lev</h6>
      <Row>
        <SensorHealth
          val={state.levData.tankPressure}
          error={(val) => val[1][0] < 100 || val[1][0] < 4450}
          warning={(val) => false}>
          Pressure Sensor
        </SensorHealth>
      </Row>

      <h6>EC Brakes</h6>
      <Row>
        {[0, 1].map((num) =>
          <SensorHealth
            val={state.ECData.photo}
            error={(val) => val[1][num] < 4 || val[1][num] < 14}
            warning={(val) => false}>
            Photoelectric Sensor {num + 1}
          </SensorHealth>
        )}

        {[0, 1].map((num) =>
          <SensorHealth
            val={state.ECData.temp}
            error={(val) => val[1][num] < 0 || val[1][num] > 100}
            warning={(val) => false}>
            Solenoid Temperature {num + 1}
          </SensorHealth>
        )}
      </Row>

      <h6>Electrical</h6>
      <Row>
        {[0, 1, 2].map((num) =>
          <SensorHealth
            val={state.podData.batteryTemp}
            error={(val) => val[1][num] < 0 || val[1][num] < 60}
            warning={(val) => false}>
            Battery {num + 1} Temp
          </SensorHealth>
        )}
      </Row>
    </div>
  )
}

export default connect(
  (state) => Object({
    state: state
  })
)(HealthCheck)
