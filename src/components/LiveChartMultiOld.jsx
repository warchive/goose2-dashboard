import React from 'react'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from 'react-timeseries-charts'
import { TimeEvent, TimeSeries, TimeRange } from 'pondjs'
import CircularBuffer from 'circular-buffer'

export default class LiveChartMulti extends React.Component {
  constructor(props) {
    super()
    this.state = {
      width: props.width,
      data: Array(props.dimension)
    }

    this.yAxis = props.columns.map(v => {
      return (
        <YAxis
          id={v.name}
          key={v.name}
          label={v.name}
          min={v.min}
          max={v.max}
          type={v.type}/>
      )
    })

    this.buffs = Array(props.dimension).fill(0).map(() => new CircularBuffer(props.bufferSize))
    
    this.columnNames = props.columns.map(v => v.name)
  }

  componentWillReceiveProps(nextProps){
    let nextData = nextProps.data;
    let currData = this.state.data;

    if(!nextData) return

    for(let x = 1; x < this.props.dimension; x ++){
      this.buffs[x - 1].push([nextData[0], nextData[x]])
    }

    this.setState({
      data: this.buffs.map(v => v.toarray())
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
    let timeRange
    if(this.state.data.length[0] && this.state.data[0].length){
      timeRange = new TimeRange(
        this.state.data[0][0][0],
        this.state.data[0][0][this.state.data[0][0].length]
      );
    } else {
      timeRange = new TimeRange(0, 0)
    }
    return (
      <div
        ref={(ele) => this.container = ele}
        style={{overflow: 'hidden', width: '100%'}}>
        <ChartContainer
          timeRange={timeRange}
          width={this.state.width}>
          <ChartRow
            height={this.props.height}>
            {
              this.yAxis
            }
            <Charts>
              {
                this.state.data.map((v, i) => {
                  let settings = this.props.columns[i]
                  let series = new TimeSeries({
                    name: settings.name,
                    columns: ['time', settings.name],
                    points: this.state.data[i]
                  })

                  return (
                    <LineChart
                      axis={settings.name}
                      series={series}
                      columns={settings.name}/>
                  )
                })
              }
            </Charts>
          </ChartRow>
        </ChartContainer>
      </div>
    )
  }
}
