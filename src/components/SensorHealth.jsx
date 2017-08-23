import React from 'react'

export default class SensorHealth extends React.Component {
  getColor () {
    if (Array.isArray(this.props.val) && this.props.val.length === 0) {
      return '#cccccc'
    } else if (this.props.error(this.props.val)) {
      return '#ff7777'
    } else if (this.props.warning(this.props.val)) {
      return '#ffed72'
    } else {
      return '#88ff8a'
    }
  }

  getStyle () {
    return {
      backgroundColor: this.getColor(),
      width: 'auto',
      padding: '0 30px',
      textAlign: 'center',
      height: '50px',
      lineHeight: '50px'
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
