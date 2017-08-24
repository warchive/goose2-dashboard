import React from 'react'
import { TabView } from '../../components/Tabs'
import { connect } from 'react-redux'
import LiveChart from '../../components/LiveChartMulti'

const MagwheelGraph = ({ style, controllerTemp, motorTemp, RPM }) => {
  return (
    <TabView tabNames={['C', 'M', 'R']} style={style}>
      <LiveChart
        height={130}
        title='Cont. Temp'
        min={0}
        max={100}
        columnNames={['1', '2', '3', '4']}
        data={controllerTemp}
      />
      <LiveChart
        height={130}
        title='Motor Temp'
        min={0}
        max={100}
        columnNames={['1', '2', '3', '4']}
        data={motorTemp}
      />
      <LiveChart
        height={130}
        title='RPM'
        min={0}
        max={100}
        columnNames={['1', '2', '3', '4']}
        data={RPM}
      />
    </TabView >
  )
}

export default connect(
  state => ({
    controllerTemp: state.MWData.controllerTemp,
    motorTemp: state.MWData.motorTemp,
    RPM: state.MWData.RPM
  })
)(MagwheelGraph)
