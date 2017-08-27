import React from 'react'
import { TabView, Tab } from '../../components/Tabs'
import { connect } from 'react-redux'
import LiveChart from '../../components/LiveChartMulti'
import { LARGE_GRAPH_POINTS } from '../../../config'

const LevGraphs = ({ style, pressure }) => {
  let highPressure = []
  let lowPressure = []

  pressure.slice(-LARGE_GRAPH_POINTS).forEach(v => {
    highPressure.push([v[0], [v[1][2]]])
    lowPressure.push([v[0], [v[1][0], v[1][1]]])
  })

  return (
    <TabView tabNames={['']} style={style}>
      <Tab>
        <LiveChart
          progressive
          height={80}
          title='HI_Press'
          min={0}
          max={5000}
          columnNames={['Main']}
          data={highPressure}
        />
        <LiveChart
          progressive100
          height={80}
          title='LO_Press'
          min={0}
          max={180}
          columnNames={['DPR', 'MED']}
          data={lowPressure}
        />
      </Tab>
    </TabView >
  )
}

export default connect(
  state => ({
    pressure: state.podData.pressure
  })
)(LevGraphs)
