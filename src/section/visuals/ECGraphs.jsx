import React from 'react'
import { TabView, Tab } from '../../components/Tabs'
import { connect } from 'react-redux'
import LiveChart from '../../components/LiveChartMulti'
import { LARGE_GRAPH_POINTS } from '../../../config.js'

const ECGraph = ({ style, photo }) => {
  return (
    <TabView tabNames={['']} style={style}>
      <Tab>
        <LiveChart
          progressive
          height={130}
          title='Photoelectric'
          min={0}
          max={100}
          columnNames={['F_L', 'F_R', 'LAT']}
          data={photo.slice(-LARGE_GRAPH_POINTS)}
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
