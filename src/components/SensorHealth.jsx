import React from 'react'

export default class SensorHealth extends React.Component {
  constructor (props) {
    super(props)
  }

  getColor() {
    if (this.props.error(this.props.val)) {
      return 'red'
    } else if (this.props.warning(this.props.val)) {
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
