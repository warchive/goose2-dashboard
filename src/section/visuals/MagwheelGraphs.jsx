import React from 'react'
import { TabView } from '../../components/Tabs'
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
    <TabView tabNames={['T', 'R']} style={style}>
      <LiveChart
        progressivepressure
        height={130}
        title='Motor Temp'
        min={0}
        max={100}
        columnNames={['1', '2']}
        data={motorTemp}
      />
      <LiveChart
        progressive
        height={130}
        title='RPM'
        min={0}
        max={100}
        columnNames={['FL', 'FR', 'RL', 'RR']}
        data={motorRPM}
      />
    </TabView >
  )
}

export default connect(
  state => ({
    mag: state.podData.mag
  })
)(MagwheelGraph)
