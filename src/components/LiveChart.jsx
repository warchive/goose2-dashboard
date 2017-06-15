import React from 'react'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from 'react-timeseries-charts'
import { TimeEvent, TimeSeries, TimeRange } from 'pondjs'
import CircularBuffer from 'circular-buffer'

export default class LiveChart extends React.Component {
  constructor (props) {
    super()

    this.state = {
      data: [],
      timeStart: Date.now()
    }
    this.buff = new CircularBuffer(props.bufferSize)
  }

  componentWillReceiveProps (nextProps) {
    let value = nextProps.value
    this.buff.push(new TimeEvent(value[0], value[1]))

    this.setState(Object.assign({}, this.state, {data: this.buff.toarray()}))
  }

  render () {
    const name = this.props.title
    const events = this.state.data
    const series = new TimeSeries({ name, events })
    let timeRange = new TimeRange(events.length > 0 ? events[0].toPoint()[0] : 0, Date.now())
    return (

      <ChartContainer timeRange={timeRange}>
        <ChartRow height='150'>
          <YAxis
            id='y'
            label='Value'
            min={0} max={100}
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
