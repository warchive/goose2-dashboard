import React from 'react'
import LiveChart from './LiveChart'
import Gauge from './Gauge'
import '../scss/GaugeChart.scss'

const GaugeChart = ({value, height, width, min, max, title, unit, bufferSize}) => {
  console.log(title)
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

export default GaugeChart
