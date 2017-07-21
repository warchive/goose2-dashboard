import React from 'react'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Legend, styler } from 'react-timeseries-charts'
import { TimeEvent, TimeSeries, TimeRange } from 'pondjs'
import CircularBuffer from 'circular-buffer'

const lineColors = [
  'orange',
  'green',
  'blue',
  'yellow',
  'teal',
  'indigo'
]

export default class LiveChartMulti extends React.Component {
  constructor(props) {
    super()
    this.state = {
      width: props.width,
      data: []
    }

    this.styles = styler(props.columnNames.map((v, i) => {
      return {
        key: v,
        color: lineColors[i]
      }
    }))
    
    this.legend = 
      <Legend
        type='swatch'
        style={this.styles}
        categories={
          props.columnNames.map(v => {
            return {
              key: v,
              label: v
            }
          })
        }/>

    this.buff = new CircularBuffer(props.bufferSize)    
  }

  componentWillReceiveProps(nextProps){
    let nextData = nextProps.data;
    let currData = this.state.data;

    if(!nextData) return
    if(nextData[0] <= currData[0]) return

    let [time, data] = nextData;

    this.buff.push([time].concat(data))
    
    this.setState({
      data: this.buff.toarray()
    })
  }

  componentDidMount(){
    let newWidth = this.container.offsetWidth
    this.setState({width: newWidth})


    window.addEventListener('resize', () => {
      this.setState({
        width: this.container.offsetWidth
      })
    })
  }
  
  render() {
    let timeSeries = new TimeSeries({
      name: this.props.title,
      columns: ['time', ...this.props.columnNames],
      points: this.state.data
    })
    let timeRange

    if(this.state.data.length){
      timeRange = new TimeRange(
        this.state.data[0][0],
        this.state.data[this.state.data.length - 1][0]
      )
    } else timeRange = new TimeRange(0,0)
    
    return (
      <div
        ref={(ele) => this.container = ele}
        style={{overflow: 'hidden', width: '100%'}}>
        <ChartContainer
          timeRange={timeRange}
          width={this.state.width}>
          <ChartRow
            height={this.props.height}>
               <YAxis
                id={'y'}
                label={this.props.title}
                min={this.props.min}
                max={this.props.max}
                type={'linear'}/>
            <Charts>
              <LineChart
                style={this.styles}
                axis={'y'}
                series={timeSeries}
                columns={this.props.columnNames}/>
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
