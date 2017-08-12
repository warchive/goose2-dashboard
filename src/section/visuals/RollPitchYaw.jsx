import React from 'react'
import { connect } from 'react-redux'

import Tilt from '../../components/Tilt'

const RollPitchYaw = ({ rollPitchYaw }) => {
  if (!rollPitchYaw) {
    rollPitchYaw = [0, [0, 0, 0]]
  }

  // let time = rollPitchYaw[0]
  let data = rollPitchYaw[1]

  let [roll, pitch, yaw] = data

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
