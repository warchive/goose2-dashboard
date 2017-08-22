import React from 'react'
import { TabView } from '../../components/Tabs'
import { connect } from 'react-redux'
import LiveChart from '../../components/LiveChartMulti'

const LevGraphs = ({ style, data }) => {
  return (
    <TabView tabNames={['1', '2', '3']} style={style}>
      <LiveChart
        height={130}
        title='Pressure'
        min={0}
        max={100}
        columnNames={['1', '2', '3', '4']}
        data={data}
      />
    </TabView >
  )
}

export default connect(
  state => Object({
    data: state.data.distance
  })
)(LevGraphs)
