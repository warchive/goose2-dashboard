import React from 'react'
import { TabView } from '../../components/Tabs'
import { connect } from 'react-redux'

const DriveGraph = ({ style, temp, reed, current }) => {
  return (
    <TabView tabNames={['']} style={style}>
      <p> ReedSensor: {reed ? 'On' : 'Off'}</p>
    </TabView >
  )
}

export default connect(
  state => ({
    reed: state.podData.reed.length ? state.podData.reed.slice(-1)[0][1][0] : null
  })
)(DriveGraph)
