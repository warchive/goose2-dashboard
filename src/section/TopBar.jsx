import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { HEART_BEAT_POLLING_DELAY } from '../../config'
import Settings from '../section/controls/Settings'
import '../scss/topbar.scss'

const TopBar = ({ connected, strength, beatLatency }) => {
  let beatDelta = beatLatency - HEART_BEAT_POLLING_DELAY
  let beatClass

  if (beatDelta > 50) {
    beatClass = 'warn'
  } else if (beatDelta > 100) {
    beatClass = 'error'
  } else beatClass = 'good'

  return (
    <Row>
      <div id='top-bar'>
        <Settings />
        <p className={connected ? 'good' : 'error'}>
          Connected: {connected ? 'yes' : 'no'}
        </p>
        <p> Expected Polling Rate: {HEART_BEAT_POLLING_DELAY} </p>
        <p className={beatClass}> Last Beat Latency: {beatLatency} </p>
      </div>
    </Row>
  )
}

export default connect(
  (state) => {
    return {
      connected: state.connection.connected,
      strength: state.connection.strength
    }
  }
)(TopBar)
