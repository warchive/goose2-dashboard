import React from 'react'
import { connect } from 'react-redux'

import SensorHealth from '../components/SensorHealth'

export default class HealthCheck extends React.Component {
  render () {
    return (
      <SensorHealth 
      error={(val) => val > 10}
      warning={(val) => val > 5}>
        Sensor Name
      </SensorHealth>
    )
  }
}
