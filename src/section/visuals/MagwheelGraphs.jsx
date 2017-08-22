import React from 'react'
import { TabView } from '../../components/Tabs'
import { connect } from 'react-redux'
import LiveChart from '../../components/LiveChartMulti'

const MagwheelGraph = ({ style, temp, RPM }) => {
  return (
    <TabView tabNames={['T', 'R']} style={style}>
      <LiveChart
        height={130}
        title='Temperature'
        min={0}
        max={100}
        columnNames={['1', '2', '3', '4']}
        data={temp}
      />
      <LiveChart
        height={130}
        title='RPM'
        min={0}
        max={100}
        columnNames={['1', '2', '3', '4']}
        data={RPM}
      />
    </TabView >
  )
}

export default connect(
  state => ({
    temp: state.MWData.temp,
    RPM: state.MWData.RPM
  })
)(MagwheelGraph)
