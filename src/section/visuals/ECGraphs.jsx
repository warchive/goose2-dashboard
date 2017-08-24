import React from 'react'
import { TabView, Tab } from '../../components/Tabs'
import { connect } from 'react-redux'
import LiveChart from '../../components/LiveChartMulti'

const ECGraph = ({ style, photo, temp }) => {
  return (
    <TabView tabNames={['T', 'P']} style={style}>
      <Tab>
        <LiveChart
          progressive
          height={130}
          title='temperature'
          min={0}
          max={100}
          columnNames={['1', '2']}
          data={temp}
        />
      </Tab>
      <Tab>
        <LiveChart
          progressive
          height={130}
          title='Photoelectric'
          min={0}
          max={100}
          columnNames={['1', '2']}
          data={photo}
        />
      </Tab>
    </TabView >
  )
}

export default connect(
  state => Object({
    photo: state.ECData.photo,
    temp: state.ECData.temp
  })
)(ECGraph)
