import React from 'react'
import '../lib/pixi.min.js'

const settings = {
  gaugeWidth: 15,
  textSize: 12,
  backgroundColor: 0xf0f0f0
}

export default class CentralCluster extends React.Component {
  constructor (props) {
    super()

    this.state = {}
    this.gauges = []
  }

  initiateGauges () {
    console.log(this.state.radius)
    let data = this.props.data
    let gauges = data.map((v, i) => {
      let gaugeSettings = this.props.settings[i]
      let currGauge = new PIXI.Graphics()   //eslint-disable-line
      currGauge.beginFill(gaugeSettings.color)
      /**
       * For some reason the (x,y) coordinates (which are the first two arguments in the call below)
       * needs to be specified after. This should be looked into
       * @todo: research why we need this work around
       */
      currGauge.arc(
        0,
        0,
        this.state.radius - (i * settings.gaugeWidth),
        0,
        Math.PI
      )
      currGauge.position.x = this.state.center.x
      currGauge.position.y = this.state.height
      currGauge.endFill()

      /**
       * Give an easy method to call to update the gauge as a property
       */
      let that = this
      currGauge.update = function (val) {
        this.rotation = that.calculateAngle(
          gaugeSettings.min,
          gaugeSettings.max,
          val
        )
      }
      this.app.stage.addChild(currGauge)

      // So that only the border of each gauge is shown
      let spacer = new PIXI.Graphics() //eslint-disable-line
      spacer.beginFill(settings.backgroundColor)
      spacer.arc(
        this.state.center.x,
        this.state.height,
        this.state.radius - ((i + 1) * settings.gaugeWidth),
        Math.PI,
        Math.PI * 2
      )
      this.app.stage.addChild(spacer)

      let currLabel = new PIXI.Text('', {  //eslint-disable-line
        align: 'center',
        fontSize: settings.textSize
      })

      currLabel.x = this.state.center.x
      currLabel.y = this.state.height - this.state.radius + i * settings.gaugeWidth + (settings.gaugeWidth - settings.textSize)
      this.app.stage.addChild(currLabel)

      currLabel.update = function (val) {
        this.text = `${gaugeSettings.label}: ${val} ${gaugeSettings.unit}`
      }

      currGauge.update(v)
      currLabel.update(v)

      return {
        gauge: currGauge,
        label: currLabel
      }
    })

    this.gauges = gauges
  }

  shouldComponentUpdate (nextProps) {
    if (this.gauges.length === 0) return true

    nextProps.data.forEach((v, i) => {
      this.gauges[i].label.update(v)
      this.gauges[i].gauge.update(v)
    })

    return false
  }

  componentDidMount () {
    let width = this.container.offsetWidth
    let height = this.container.offsetHeight

    this.app = new PIXI.Application(width, height, { //eslint-disable-line
      backgroundColor: settings.backgroundColor,
      antialias: true
    })

    this.container.appendChild(this.app.view)

    this.setState({
      width,
      height,
      radius: Math.min(width / 2, height),
      center: {
        x: width / 2,
        y: height / 2
      }
    }, () => this.initiateGauges())
  }

  calculateAngle (min, max, val) {
    return Math.PI * (val / (max - min))
  }

  render () {
    let innerRadius = this.state.radius -
      (this.props.settings.length * settings.gaugeWidth)

    let getY = (x) => Math.sqrt(innerRadius ** 2 - x ** 2)

    let x = innerRadius / 2
    let y = getY(x)

    return (
      <div
        style={{ height: this.props.height }}>
        <div
          ref={container => { this.container = container }}
          style={{ height: this.props.height }} />
        {
          !this.state.center ? ''
            : <div style={{
              border: '1px solid black',
              position: 'absolute',
              bottom: 0,
              left: this.state.center.x - innerRadius + x + settings.gaugeWidth,
              height: y,
              width: (innerRadius - x) * 2
            }}>
              {this.props.children}
            </div>
        }
      </div>
    )
  }
}
