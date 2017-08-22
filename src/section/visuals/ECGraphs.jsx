import React from 'react'
import { TabView } from '../../components/Tabs'
import { connect } from 'react-redux'
import LiveChart from '../../components/LiveChartMulti'

const ECGraph = ({ style, photo, temp }) => {
  return (
    <TabView tabNames={['1', '2', '3']} style={style}>
      <LiveChart
        height={130}
        title='Pressure'
        min={0}
        max={100}
        columnNames={['1', '2']}
        data={photo}
      />
      <LiveChart
        height={130}
        title='temperature'
        min={0}
        max={100}
        columnNames={['1', '2']}
        data={temp}
      />
    </TabView >
  )
}

export default connect(
  state => Object({
    photo: state.ECData.photo,
    temp: state.ECData.temp
  })
)(ECGraph)
