import React from 'react'
import { LARGE_GRAPH_POINTS } from '../../config'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Legend, styler } from 'react-timeseries-charts'
import { TimeSeries, TimeRange } from 'pondjs'

const lineColors = [
  'orange',
  'green',
  'blue',
  'yellow',
  'teal',
  'indigo'
]

export default class LiveChartMulti extends React.Component {
  constructor (props) {
    super()
    this.state = { width: 300 }

    this.styles = styler(props.columnNames.map((v, i) => {
      return {
        key: v,
        color: lineColors[i]
      }
    }))

    this.legend = ''
    // <Legend
    //   type='swatch'
    //   style={this.styles}
    //   categories={
    //     props.columnNames.map(v => {
    //       return {
    //         key: v,
    //         label: v
    //       }
    //     })
    //   } />
  }

  adjustSize () {
    let newWidth = this.container.offsetWidth
    this.setState({ width: newWidth })
  }

  componentDidMount () {
    requestAnimationFrame(this.adjustSize.bind(this)) //eslint-disable-line
    // this.adjustSize()
    window.addEventListener('resize', this.adjustSize.bind(this))
  }

  render () {
    console.log(this.props)

    let data = this.props.data.slice(LARGE_GRAPH_POINTS)
      .map(v => [v[0]].concat(v[1]))

    let timeSeries = new TimeSeries({
      name: this.props.title,
      columns: ['time', ...this.props.columnNames],
      points: data
    })
    let timeRange

    if (data.length) {
      timeRange = new TimeRange(
        this.state.data[0][0],
        this.state.data[this.state.data.length - 1][0]
      )
    } else timeRange = new TimeRange(0, 0)

    return (
      <div
        ref={(ele) => { this.container = ele }}
        style={{ flex: 1 }}>
        <ChartContainer
          timeRange={timeRange}
          width={this.state.width}
          height={this.props.height}>
          <ChartRow
            height={this.props.height}>
            <YAxis
              id={'y'}
              label={this.props.title}
              min={this.props.min}
              max={this.props.max}
              type={'linear'} />
            <Charts>
              <LineChart
                style={this.styles}
                axis={'y'}
                series={timeSeries}
                columns={this.props.columnNames} />
            </Charts>
          </ChartRow>
        </ChartContainer>
        {
          this.legend
        }
      </div>
    )
  }
}
