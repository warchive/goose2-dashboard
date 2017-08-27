import React from 'react'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, styler } from 'react-timeseries-charts'
import { TimeSeries, TimeRange } from 'pondjs'

const lineColors = [
  'orange',
  'green',
  'blue',
  'purple',
  'indigo'
]

const Style = {
  containerStyle: { flex: 1, display: 'flex', flexDirection: 'row' },
  innerContainerStyle: { flex: 1 },
  legendStyle: { display: 'flex', flexDirection: 'column', marginLeft: 5, marginRight: 5 }
}

export default class LiveChartMulti extends React.Component {
  constructor (props) {
    super()
    this.state = { width: 300, loaded: false }

    this.lineChartStyle = styler(props.columnNames.map((v, i) => {
      return {
        key: v,
        color: lineColors[i]
      }
    }))

    this.legend = <div style={Style.legendStyle}>
      {props.columnNames.map((v, i) => {
        return (
          <p style={{ color: lineColors[i], fontSize: 12 }} key={i}> {v} </p>
        )
      })}
    </div>
  }

  shouldComponentUpdate (nextProps) {
    if (!this.props.progressive) return true

    if (this.props.data.length && nextProps.data.length) {
      let prevDataEndTime, nextDataEndTime
      prevDataEndTime = this.props.data.slice(-1)[0][0]
      nextDataEndTime = nextProps.data.slice(-1)[0][0]

      let shouldUpdate = nextDataEndTime > prevDataEndTime
      return shouldUpdate
    }

    return true
  }

  adjustSize () {
    let newWidth = this.container.offsetWidth
    this.setState({ width: newWidth, loaded: true })
  }

  componentDidMount () {
    requestAnimationFrame(this.adjustSize.bind(this)) //eslint-disable-line
    this.eventListener = this.adjustSize.bind(this)
    window.addEventListener('resize', this.eventListener)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.eventListener)
  }

  render () {
    let data = this.props.data.map(v => [v[0]].concat(v[1]))

    let timeSeries = new TimeSeries({
      name: this.props.title,
      columns: ['time', ...this.props.columnNames],
      points: data
    })
    let timeRange

    if (data.length) {
      timeRange = new TimeRange(
        data[0][0],
        data[data.length - 1][0]
      )
    } else timeRange = new TimeRange(0, 0)

    return (
      <div style={Style.containerStyle}>
        <div
          ref={(ele) => { this.container = ele }}
          style={Style.innerContainerStyle}>
          {
            !this.state.loaded ? ''
              : <ChartContainer
                timeRange={timeRange}
                width={this.state.width}
                height={this.props.height} >
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
                      style={this.lineChartStyle}
                      axis={'y'}
                      series={timeSeries}
                      columns={this.props.columnNames} />
                  </Charts>
                </ChartRow>
              </ChartContainer>
          }
        </div >
        {
          this.legend
        }
      </div>
    )
  }
}
