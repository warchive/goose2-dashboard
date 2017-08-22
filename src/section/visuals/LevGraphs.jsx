import React from 'react'
import { TabView } from '../../components/Tabs'
import { connect } from 'react-redux'
import LiveChart from '../../components/LiveChartMulti'

const LevGraphs = ({ style, photo }) => {
  return (
    <TabView tabNames={['1']} style={style}>
      <LiveChart
        height={130}
        title='Pressure'
        min={0}
        max={100}
        columnNames={['1', '2', '3', '4']}
        data={photo}
      />
    </TabView >
  )
}

export default connect(
  state => ({
    photo: state.levData.photo
  })
)(LevGraphs)
