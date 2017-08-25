import React from 'react'
import { roundValue } from '../../config'

const STYLE = {
  nameStyle: {
    fontSize: 12
  },
  valueStyle: {
    fontSize: 12
  }
}

export default class SensorHealth extends React.Component {
  getColor () {
    if (this.props.value === null) {
      return '#cccccc'
    } else if (this.props.error(this.props.value)) {
      if (this.props.errorAction) this.props.errorAction()
      return '#ff7777'
    } else {
      return '#88ff8a'
    }
  }

  getStyle () {
    return {
      backgroundColor: this.getColor(),
      textAlign: 'center'
    }
  }

  render () {
    return (
      <div style={this.getStyle()}>
        <p style={STYLE.nameStyle}>{this.props.name}</p>
        <p style={STYLE.valueStyle}>{roundValue(this.props.value)}</p>
      </div>
    )
  }
}
