import React from 'react'
import '../lib/pixi.min.js'

const settings = {
  gaugeWidth: 10,
  backgroundColor: 0xf0f0f0
}


export default class CentralCluster extends React.Component {
  constructor(props){
    super()

    this.state = {}
  }

  renderGauges(){
    let data = this.props.data
    console.log(data)
    console.log(this.props.settings)
    let gauges = data.map((v, i) => {
      let gaugeSettings = this.props.settings[i]
      let currGauge = new PIXI.Graphics()
      currGauge.beginFill(gaugeSettings.color)
      currGauge.arc(
        0,
        0,
        this.state.height - (i * settings.gaugeWidth),
        0,
        Math.PI//this.calculateAngle(gaugeSettings.min, gaugeSettings.max, v)
      )
      // currGauge.pivot.x = currGauge.width/2
      // currGauge.pivot.y = currGauge.height
      currGauge.position.x = this.state.center.x
      currGauge.position.y = this.state.height

      window.gauge = currGauge

      currGauge.endFill()

      let that = this;

      currGauge.update = function(val){
        this.rotation = that.calculateAngle(
          gaugeSettings.min,
          gaugeSettings.max,
          val
        )
      }
      this.app.stage.addChild(currGauge)

      // let spacer = new PIXI.Graphics()
      // spacer.beginFill(settings.backgroundColor)
      // spacer.arc(
      //   this.state.center.x,
      //   this.state.height,
      //   this.state.height - ((i + 1) * settings.gaugeWidth),
      //   Math.PI,
      //   Math.PI * 2
      // )
      // this.app.stage.addChild(spacer)

      return currGauge
    })
    this.gauges = gauges

    // let gauge = new PIXI.Graphics()
    // gauge.beginFill(0xFFFFff)
    // gauge.arc(
    //   this.state.center.x,
    //   this.state.height,
    //   this.state.height,
    //   Math.PI,
    //   Math.PI * 1.8)
    
    // this.app.stage.addChild(gauge)
    
  }

  shouldComponentUpdate(nextProps){
    nextProps.data.forEach((v,i) => 
      this.gauges[i].update(v)
    )

    return false;
  }

  componentDidMount(){
    let width = this.container.offsetWidth
    let height = this.container.offsetHeight

    this.app = new PIXI.Application(width, height, {
      backgroundColor: settings.backgroundColor
    })

    this.container.appendChild(this.app.view)

    this.setState({
      width,
      height,
      center: {
        x: width / 2,
        y: height / 2
      }
    }, () => this.renderGauges())
  }

  calculateAngle(min, max, val){
    return Math.PI * (val / (max - min))
  }

  render(){
    return (
      <div
        ref={container => this.container = container}
        style={{height: this.props.height}}>
      </div>
    )
  }
}
