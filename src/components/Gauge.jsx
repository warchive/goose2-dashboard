import React from 'react'
import {RadialGauge} from 'canvas-gauges'

class Gauge extends React.Component {
  constructor (props) {
    super(props)
    this.gauge = null
    this.value = props.default || 0
    let hash = Math.random().toString(26).substring(0, 5)
    this.id = `gauge-${props.title}-${hash}`
  }

  componentWillReceiveProps (nextProps) {
    this.value = nextProps.value
    this.gauge.value = this.value
  }

  shouldComponentUpdate () {
    return false
  }

  componentDidMount () {
    this.gauge = new RadialGauge({
      renderTo: this.id,
      width: this.props.width,
      height: this.props.height,
      minValue: this.props.min,
      maxValue: this.props.max,
      title: this.props.title,
      value: this.value,
      units: this.props.unit,
      animation: true,
      animationRule: 'linear',
      animationDuration: 100,
      animationTarget: 'needle',
      intermediateValue: true,
      colorValueBoxShadow: true
    }).draw()
  }

  render () {
    return (
      <canvas id={this.id} />
    )
  }
}

// Gauge.prototype = {
//   width: PropTypes.number.isRequired,
//   height: PropTypes.number.isRequired,
//   min: PropTypes.number.isRequired,
//   max: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
//   units: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired
// }

export default Gauge
