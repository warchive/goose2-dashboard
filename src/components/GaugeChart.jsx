import React from 'react'
import LiveChart from './LiveChart'
import Gauge from './Gauge'

const styles = {
  gaugeChart: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center'
  }
}

const GaugeChart = ({value, height, min, max, title, unit, bufferSize}) => {
  return (
    <div className='gauge-chart' style={styles.gaugeChart}>
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
        min={0}
        max={100}
        value={value}
        bufferSize={bufferSize}
        height={height}
        default={0} />
    </div>
  )
}

export default GaugeChart
