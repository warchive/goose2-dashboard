import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { HEART_BEAT_POLLING_DELAY } from '../../config'
import '../scss/network.scss'

const Network = ({ connected, strength, beatLatency }) => {
  let beatDelta = beatLatency - HEART_BEAT_POLLING_DELAY
  let beatClass

  if (beatDelta > 50) {
    beatClass = 'warn'
  } else if (beatDelta > 100) {
    beatClass = 'error'
  } else beatClass = 'good'

  return (
    <Row className='network-bar'>
      <p className={connected ? 'good' : 'error'}>
        Connected: {connected ? 'yes' : 'no'}
      </p>
      <p> Expected Polling Rate: {HEART_BEAT_POLLING_DELAY} </p>
      <p className={beatClass}> Last Beat Latency: {beatLatency} </p>
      <p> Ping: {ping} ms</p>
    </Row>
  )
}

export default connect(
  (state) => {
    let beatLatency
    let heartBeatLen = state.data.heartBeat.length
    let ping = state.data.ping
    if (heartBeatLen >= 2) {
      beatLatency = state.data.heartBeat[heartBeatLen - 1] -
        state.data.heartBeat[heartBeatLen - 2]
    } else {
      beatLatency = null
    }

    return {
      connected: state.connection.connected,
      strength: state.connection.strength,
      beatLatency
    }
  }
)(Network)
