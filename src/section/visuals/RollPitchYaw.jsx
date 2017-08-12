import React from 'react'
import { connect } from 'react-redux'

import Tilt from '../../components/Tilt'

const RollPitchYaw = ({ rollPitchYaw }) => {
  let roll, pitch, yaw
  if (!rollPitchYaw) {
    roll = pitch = yaw = null
  } else {
    [roll, pitch, yaw] = rollPitchYaw[1]
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Tilt
        min={-180}
        max={180}
        label='Roll'
        value={roll} />
      <Tilt
        min={-180}
        max={180}
        label='Pitch'
        value={pitch} />
      <Tilt
        min={-180}
        max={180}
        label='Yaw'
        value={yaw} />
    </div>
  )
}

export default connect(state => Object({
  rollPitchYaw: state.data.rollPitchYaw.slice(-1)[0]
}))(RollPitchYaw)
