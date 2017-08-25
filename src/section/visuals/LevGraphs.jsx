import React from 'react'
import { TabView } from '../../components/Tabs'
import { connect } from 'react-redux'
import LiveChart from '../../components/LiveChartMulti'

const LevGraphs = ({ style, photo, DPR }) => {
  return (
    <TabView tabNames={['D', 'P']} style={style}>
      <LiveChart
        progressive
        height={130}
        title='Pressure'
        min={0}
        max={100}
        columnNames={['1']}
        data={DPR}
      />
      <LiveChart
        progressive
        height={130}
        title='Photo'
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
    DPR: state.levData.DPR,
    photo: state.levData.photo
  })
)(LevGraphs)
