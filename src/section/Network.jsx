import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import '../scss/network.scss'

const Network = ({ connected, strength, latency }) => {
  return (
    <Row className='network-bar'>
      <p className={connected ? 'good' : 'error'}>
        Connected: {connected ? 'yes' : 'no'}
      </p>
      <p> Strength: {strength} </p>
      <p> Latency: {latency} </p>
    </Row>
  )
}

export default connect(
  (state) => {
    return {
      connected: state.connection.connected,
      strength: state.connection.strength,
      latency: state.connection.latency
    }
  }
)(Network)
