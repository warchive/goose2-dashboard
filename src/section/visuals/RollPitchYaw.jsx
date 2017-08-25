import React from 'react'
import { connect } from 'react-redux'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import { SMALL_GRAPH_POINTS } from '../../../config'

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

const RollPitchYaw = ({ roll, pitch, yaw }) => {
  let lastRoll, lastPitch, lastYaw
  lastRoll = lastPitch = lastYaw = 0

  if (roll.length) {
    lastRoll = roll.slice(-1)[0]
    lastPitch = pitch.slice(-1)[0]
    lastYaw = yaw.slice(-1)[0]
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={rowStyle}>
        <Tilt
          min={-180}
          max={180}
          label='Roll'
          value={lastRoll} />

        <Sparklines data={roll} {...SparkLineProps}>
          <SparklinesLine color='blue' />
        </Sparklines>
      </div>
      <div style={rowStyle}>
        <Tilt
          min={-180}
          max={180}
          label='Pitch'
          value={lastPitch} />

        <Sparklines data={pitch} {...SparkLineProps}>
          <SparklinesLine color='blue' />
        </Sparklines>
      </div>
      <div style={rowStyle}>
        <Tilt
          min={-180}
          max={180}
          label='Yaw'
          value={lastYaw} />

        <Sparklines data={yaw} {...SparkLineProps}>
          <SparklinesLine color='blue' />
        </Sparklines>
      </div>
    </div >
  )
}

export default connect(state => {
  let lastIMUDataPoints = state.podData.IMU.slice(-SMALL_GRAPH_POINTS)
  let roll = []
  let pitch = []
  let yaw = []
  lastIMUDataPoints.forEach(v => {
    let data = v[1]
    roll.push(data[6])
    pitch.push(data[7])
    yaw.push(data[8])
  })
  return { roll, pitch, yaw }
})(RollPitchYaw)
