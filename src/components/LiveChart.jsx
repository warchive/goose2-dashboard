import React from 'react'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from 'react-timeseries-charts'
import { TimeEvent, TimeSeries, TimeRange } from 'pondjs'
import CircularBuffer from 'circular-buffer'

export default class LiveChart extends React.Component {
  constructor (props) {
    super()
    this.state = {
      data: [new TimeEvent(0, 0)]
    }
    this.buff = new CircularBuffer(props.bufferSize)
  }

  componentWillReceiveProps (nextProps) {
    let value = nextProps.value
    if (value[0] === 0) {
      return
    }
    let lastEventTime = this.state.data[this.state.data.length - 1].toPoint()[0]
    if (value[0] <= lastEventTime) {
      return
    }

    this.buff.push(new TimeEvent(value[0], value[1]))

    this.setState(Object.assign({},
      this.state, {data: this.buff.toarray()}))
  }

  render () {
    const name = this.props.title
    const events = this.state.data
    const series = new TimeSeries({ name, events })
    let timeRange
    if (events.length > 0) {
      timeRange = new TimeRange(events[0].toPoint()[0], events[events.length - 1].toPoint()[0])
    } else {
      timeRange = new TimeRange(0, 0)
    }
    return (

      <ChartContainer timeRange={timeRange}>
        <ChartRow height={this.props.height}>
          <YAxis
            id='y'
            label='Value'
            min={this.props.min} max={this.props.max}
            type='linear' />
          <Charts>
            <LineChart
              axis='y'
              series={series}
              columns={['value']} />
          </Charts>
        </ChartRow>
      </ChartContainer>
    )
  }
}
