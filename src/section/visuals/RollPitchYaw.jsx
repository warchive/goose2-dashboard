import React from 'react'
import { connect } from 'react-redux'
import { Sparklines, SparklinesLine } from 'react-sparklines'

import Tilt from '../../components/Tilt'

const SparkLineProps = {
  limit: 20,
  width: 150,
  height: 100,
  margin: 2,
  style: { flexGrow: 0, flexShrink: 0, width: 150, height: 100 }
}

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}

const RollPitchYaw = ({ rollPitchYaw }) => {
  let roll, pitch, yaw
  let rollHistory, pitchHistory, yawHistory
  if (rollPitchYaw.length < 1) {
    roll = pitch = yaw = null
    rollHistory = pitchHistory = yawHistory = []
  } else {
    [roll, pitch, yaw] = rollPitchYaw.slice(-1)[0][1]

    let formattedHistory = rollPitchYaw.slice(-20).reduce((pre, curr) => {
      pre.forEach((v, i) => v.push(curr[1][i]))
      return pre
    }, Array(3).fill(0).map(() => []))

    rollHistory = formattedHistory[0]
    pitchHistory = formattedHistory[1]
    yawHistory = formattedHistory[2]
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={rowStyle}>
        <Tilt
          min={-180}
          max={180}
          label='Roll'
          value={roll} />

        <Sparklines data={rollHistory} {...SparkLineProps}>
          <SparklinesLine color='blue' />
        </Sparklines>
      </div>
      <div style={rowStyle}>
        <Tilt
          min={-180}
          max={180}
          label='Pitch'
          value={pitch} />

        <Sparklines data={pitchHistory} {...SparkLineProps}>
          <SparklinesLine color='blue' />
        </Sparklines>
      </div>
      <div style={rowStyle}>
        <Tilt
          min={-180}
          max={180}
          label='Yaw'
          value={yaw} />

        <Sparklines data={yawHistory} {...SparkLineProps}>
          <SparklinesLine color='blue' />
        </Sparklines>
      </div>
    </div >
  )
}

export default connect(state => Object({
  rollPitchYaw: state.data.rollPitchYaw
}))(RollPitchYaw)
