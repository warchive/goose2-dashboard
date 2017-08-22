import React from 'react'
import { TabView } from '../../components/Tabs'
import { connect } from 'react-redux'
import LiveChart from '../../components/LiveChartMulti'

const DriveGraph = ({ style, temp, reed, current }) => {
  return (
    <TabView tabNames={['P', 'R', 'C']} style={style}>
      <LiveChart
        height={130}
        title='Temperature'
        min={0}
        max={100}
        columnNames={['1', '2']}
        data={temp}
      />
      <LiveChart
        height={130}
        title='Reed'
        min={0}
        max={100}
        columnNames={['1']}
        data={reed}
      />
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
