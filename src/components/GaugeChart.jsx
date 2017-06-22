import React from 'react'
import LiveChart from './LiveChart'
import Gauge from './Gauge'
import '../scss/GaugeChart.scss'

class GaugeChart extends React.Component {
  shouldComponentUpdate (nextProps) {
    return this.props.value[0] < nextProps.value[0]
  }

  render () {
    const { value, height, width, min, max,
      title, unit, bufferSize } = this.props

    return (
      <div className='gauge-chart'>
        <Gauge
          width={200}
          height={height}
          min={min}
          max={max}
          value={value[1]}
          default={0}
          unit={unit}
          title={title}
        />
        <LiveChart
          tile={title}
          unit={unit}
          min={min}
          max={max}
          value={value}
          bufferSize={bufferSize}
          default={0}
          height={height}
          width={width} />
      </div>
    )
  }
}

export default GaugeChart
