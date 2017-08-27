import React from 'react'
import { TabView, Tab } from '../../components/Tabs'
import { connect } from 'react-redux'
import LiveChart from '../../components/LiveChartMulti'
import { LARGE_GRAPH_POINTS } from '../../../config'

const MagwheelGraph = ({ style, mag }) => {
  let motorTemp = []
  let motorRPM = []

  mag.slice(-LARGE_GRAPH_POINTS).map(v => {
    motorTemp.push([v[0], [v[1][0], v[1][1]]])
    motorRPM.push([v[0], [v[1][2], v[1][3], v[1][4], v[1][5]]])
  })

  return (
    <TabView tabNames={['']} style={style}>
      <Tab>
        <LiveChart
          progressivepressure
          height={80}
          title='Motor Temp'
          min={0}
          max={100}
          columnNames={['1', '2']}
          data={motorTemp}
        />
        <LiveChart
          progressive
          height={80}
          title='RPM'
          min={0}
          max={8000}
          columnNames={['FL', 'FR', 'RL', 'RR']}
          data={motorRPM}
        />
      </Tab>
    </TabView >
  )
}

export default connect(
  state => ({
    mag: state.podData.mag
  })
)(MagwheelGraph)
