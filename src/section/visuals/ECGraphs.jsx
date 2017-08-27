import React from 'react'
import { TabView, Tab } from '../../components/Tabs'
import { connect } from 'react-redux'
import LiveChart from '../../components/LiveChartMulti'
import { LARGE_GRAPH_POINTS } from '../../../config.js'

const ECGraph = ({ style, photo }) => {
  let latData = []
  let levData = []

  photo.slice(-LARGE_GRAPH_POINTS).forEach(v => {
    levData.push([v[0], [v[1][0], v[1][1]]])
    latData.push([v[0], [v[1][2]]])
  })

  return (
    <TabView tabNames={['']} style={style}>
      <Tab>
        <LiveChart
          progressive
          height={80}
          title='Photo-lat'
          min={-15}
          max={15}
          columnNames={['LAT']}
          data={latData}
        />
        <LiveChart
          progressive
          height={80}
          title='Photo-lev'
          min={0}
          max={100}
          columnNames={['F_L', 'F_R']}
          data={levData}
        />
      </Tab>
    </TabView >
  )
}

export default connect(
  state => ({
    photo: state.podData.photo
  })
)(ECGraph)
