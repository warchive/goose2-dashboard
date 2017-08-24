import React from 'react'
import { TabView, Tab } from '../../components/Tabs'
import { connect } from 'react-redux'
import LiveChart from '../../components/LiveChartMulti'

const DriveGraph = ({ style, temp, reed, current }) => {
  return (
    <TabView tabNames={['P', 'C']} style={style}>
      <Tab>
        <LiveChart
          height={130}
          title='Temperature'
          min={0}
          max={100}
          columnNames={['1', '2']}
          data={temp}
        />
        <p> ReedSensor: {reed ? 'On' : 'Off'}</p>
      </Tab>
      <LiveChart
        height={130}
        title='Current'
        min={0}
        max={100}
        columnNames={['1']}
        data={current}
      />
    </TabView >
  )
}

export default connect(
  state => ({
    temp: state.driveData.temp,
    reed: state.driveData.reed,
    current: state.driveData.current
  })
)(DriveGraph)
