import React from 'react'
import LiveChart from './LiveChart'
import Gauge from './Gauge'
import '../scss/GaugeChart.scss'

export default class GaugeChart extends React.Component{

  shouldComponentUpdate(nextProps){
    return this.props.data[0] <= nextProps.data[0]
  }

  render(){
    return (
      <div className='gauge-chart'>
        <Gauge
          width={200}
          height={this.props.height}
          min={this.props.min}
          max={this.props.max}
          data={this.props.data[1]}
          default={0}
          unit={this.props.unit}
          title={this.props.title}
        />
        <LiveChart
          tile={this.props.title}
          unit={this.props.unit}
          min={this.props.min}
          max={this.props.max}
          value={this.props.data}
          bufferSize={this.props.bufferSize}
          default={0}
          height={this.props.height}
          width={this.props.width} />
      </div>
    )
  }
}
