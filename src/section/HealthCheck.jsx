import React from 'react'
import { connect } from 'react-redux'
import { sendCommand } from '../api/api.js'
import { EMERGENCY_STOP } from '../../events/commands.js'
import SensorHealth from '../components/SensorHealth'

import '../scss/healthCheck.scss'

function getLastDataAtIdx (data, idx) {
  let lastData = data.slice(-1)[0]

  if (!lastData) return null
  return lastData[1][idx]
}

const SENSORS = [
  {
    name: 'FWD_ACCEL',
    get: (state) => getLastDataAtIdx(state.podData.IMU, 4),
    error: (val) => val < -22 || val > 11
  }, {
    name: 'DIST',
    get: (state) => getLastDataAtIdx(state.podData.color, 0),
    error: (val) => val < 0 || val > 1600
  }, {
    name: 'ROLL',
    get: (state) => getLastDataAtIdx(state.podData.IMU, 6),
    error: (val) => val < -2 || val > 2
  }, {
    name: 'PITCH',
    get: (state) => getLastDataAtIdx(state.podData.IMU, 7),
    error: (val) => val < -1 || val > 1
  }, {
    name: 'YAW',
    get: (state) => getLastDataAtIdx(state.podData.IMU, 8),
    error: (val) => val < -1 || val > 1
  }, {
    name: 'MN_TNK_PSSURE',
    get: (state) => getLastDataAtIdx(state.levData.highPressure, 0),
    error: (val) => val < 150 || val > 4520
  }, {
    name: 'MD_TNK_PSSURE',
    get: (state) => getLastDataAtIdx(state.levData.mediumPressure, 0),
    error: (val) => val < 0 || val > 150
  }, {
    name: 'DPR_PSSURE',
    get: (state) => getLastDataAtIdx(state.levData.DPR, 0),
    error: (val) => val < 0 || val > 100
  }, {
    name: 'BAT_24_V',
    get: (state) => getLastDataAtIdx(state.podData.battery, 4),
    error: (val) => val < 24 || val > 30
  }, {
    name: 'BAT_48_V',
    get: (state) => getLastDataAtIdx(state.podData.battery, 8),
    error: (val) => val < 47 || val > 54.5
  }, {
    name: 'BAT_5_V',
    get: (state) => getLastDataAtIdx(state.podData.battery, 1),
    error: (val) => val < 5 || val > 5.5
  }, {
    name: 'BAT_24_C',
    get: (state) => getLastDataAtIdx(state.podData.battery, 3),
    error: (val) => val < 0 || val > 160
  }, {
    name: 'BAT_48_C',
    get: (state) => getLastDataAtIdx(state.podData.battery, 6),
    error: (val) => val < 0 || val > 25
  }, {
    name: 'BAT_5_C',
    get: (state) => getLastDataAtIdx(state.podData.battery, 0),
    error: (val) => val < 0.4 || val > 2.4
  }, {
    name: 'BAT_24_T',
    get: (state) => getLastDataAtIdx(state.podData.battery, 5),
    error: (val) => val < 0 || val > 60,
    errorAction: () => { sendCommand(EMERGENCY_STOP) }
  }, {
    name: 'BAT_48_T',
    get: (state) => getLastDataAtIdx(state.podData.battery, 8),
    error: (val) => val < 0 || val > 60,
    errorAction: () => { sendCommand(EMERGENCY_STOP) }
  }, {
    name: 'BAT_5_T',
    get: (state) => getLastDataAtIdx(state.podData.battery, 2),
    error: (val) => val < 0 || val > 60,
    errorAction: () => { sendCommand(EMERGENCY_STOP) }
  }, {
    name: 'MAG_RPM_1',
    get: (state) => getLastDataAtIdx(state.MWData.RPM, 0),
    error: (val) => val < 0 || val > 7500
  }, {
    name: 'MAG_RPM_2',
    get: (state) => getLastDataAtIdx(state.MWData.RPM, 1),
    error: (val) => val < 0 || val > 7500
  }, {
    name: 'MAG_RPM_3',
    get: (state) => getLastDataAtIdx(state.MWData.RPM, 2),
    error: (val) => val < 0 || val > 7500
  }, {
    name: 'MAG_RPM_4',
    get: (state) => getLastDataAtIdx(state.MWData.RPM, 3),
    error: (val) => val < 0 || val > 7500
  }, {
    name: 'LEV_DIST_1',
    get: (state) => getLastDataAtIdx(state.levData.photo, 0),
    error: (val) => val < 20 || val > 80
  }, {
    name: 'LEV_DIST_2',
    get: (state) => getLastDataAtIdx(state.levData.photo, 1),
    error: (val) => val < 20 || val > 80
  }, {
    name: 'LAT_DIST_1',
    get: (state) => getLastDataAtIdx(state.ECData.photo, 0),
    error: (val) => val < -10 || val > 10
  }, {
    name: 'LAT_DIST_2',
    get: (state) => getLastDataAtIdx(state.ECData.photo, 1),
    error: (val) => val < -10 || val > 10
  }
]

const HealthCheck = ({ state }) => {
  return (
    <div className='health-check'>
      {
        SENSORS.map(v =>
          <SensorHealth
            name={v.name}
            key={v.name}
            value={v.get(state)}
            error={v.error}
            errorAction={v.errorAction} />
        )
      }
    </div>
  )
}

export default connect(
  (state) => ({
    state: state
  })
)(HealthCheck)
