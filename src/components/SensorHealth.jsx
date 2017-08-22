import React from 'react'

export default class SensorHealth extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      val: 0
    }
  }

  getColor() {
    if (this.props.error(this.state.val)) {
      return 'red'
    } else if (this.props.warning(this.state.val)) {
      return 'yellow'
    } else {
      return 'green'
    }
  }

  getStyle() {
    return {
      backgroundColor: this.getColor()
    }
  }

  render () {
    return (
      <div style={this.getStyle()}>
        {this.props.children}
      </div>
    )
  }
}
