import React from 'react'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from 'react-timeseries-charts'
import { TimeEvent, TimeSeries, TimeRange } from 'pondjs'
import CircularBuffer from 'circular-buffer'

export default class LiveChart extends React.Component {
  constructor (props) {
    super()
    this.state = {
      data: [],
      width: props.width
    }
    this.buff = new CircularBuffer(props.bufferSize)
  }

  componentWillReceiveProps (nextProps) {
    let nextVal = nextProps.value
    let currData = this.state.data
    if (nextVal[0] < 0) return  // If time is less than 0 return

    // Don't want new data if it has already been recorded
    if (currData.length > 0 &&
      currData[currData.length - 1].toPoint[0] >= nextVal[0]) {
      return
    }

    this.buff.push(new TimeEvent(nextVal[0], nextVal[1]))

    this.setState({ data: this.buff.toarray() })
  }

  componentDidMount () {
    let newWidth = this.container.offsetWidth
    this.setState({width: newWidth})

    window.addEventListener('resize', () => {
      this.setState({
        width: this.container.offsetWidth
      })
    })
  }

  render () {
    const name = this.props.title
    const events = this.state.data
    const series = new TimeSeries({ name, events })
    let timeRange
    if (events.length > 0) {
      timeRange = new TimeRange(
        events[0].toPoint()[0],
        events[events.length - 1].toPoint()[0]
      )
    } else {
      timeRange = new TimeRange(0, 0)
    }
    return (
      <div
        ref={(ele) => { this.container = ele }}
        style={{overflow: 'hidden', width: '100%'}}>
        <ChartContainer
          timeRange={timeRange}
          width={this.state.width}>
          <ChartRow
            height={this.props.height}>
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
      </div>
    )
  }
}
