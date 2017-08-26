import React from 'react'
import { TabView } from '../../components/Tabs'
import { connect } from 'react-redux'
import LiveChart from '../../components/LiveChartMulti'
import { LARGE_GRAPH_POINTS } from '../../../config'

const LevGraphs = ({ style, pressure }) => {
  return (
    <TabView tabNames={['']} style={style}>
      <LiveChart
        progressive
        height={130}
        title='Pressure'
        min={0}
        max={100}
        columnNames={['dpr', 'med', 'hi']}
        data={pressure.slice(-LARGE_GRAPH_POINTS)}
      />
    </TabView >
  )
}

export default connect(
  state => ({
    pressure: state.podData.pressure
  })
)(LevGraphs)
