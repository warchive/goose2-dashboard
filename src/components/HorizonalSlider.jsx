import React from 'react'
import { Button } from 'react-bootstrap'
import Slider from 'rc-slider/lib/Slider'
import { roundValue } from '../../config'

import 'rc-slider/assets/index.css'

const styles = {
  handleStyle: {
    width: '20px',
    transform: 'translateX(-10px) translateY(-20px)',
    height: '40px',
    borderRadius: '0',
    margin: 0
  }
}

class Slide extends React.Component {
  constructor (props) {
    super()
    this.state = {
      val: props.defaultVal
    }
  }

  onChange (evt) {
    this.setState({ val: evt })

    if (this.props.instantChange) {
      this.props.onChange(this.state.val)
    }
  }

  onSetValue () {
    this.props.onChange(this.state.val)
  }

  onButtonChange (up) {
    let newVal = this.state.val + (up ? 1 : -1)

    if (newVal > this.props.max || newVal < this.props.min) {
      return
    }

    this.setState({ val: newVal })
    this.props.onChange(newVal)
  }

  onKeyDown (evt) {
    if (this.props.disabled) return

    if (evt.key === 'ArrowUp') {
      this.onButtonChange(true)
    } else if (evt.key === 'ArrowDown') {
      this.onButtonChange(false)
    }
  }

  render () {
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            bsSize='sm'
            bsStyle='info'
            disabled={this.props.disabled}
            onClick={() => this.onButtonChange(true)}>↑</Button>
          <Button
            bsSize='sm'
            bsStyle='info'
            disabled={this.props.disabled}
            onClick={() => this.onButtonChange(false)}>↓</Button>
          <p>{this.props.title}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', padding: '5 0 5 0' }}>
          <div style={{ padding: 15, flex: 1 }}>
            <Slider
              value={this.state.val}
              min={this.props.min}
              max={this.props.max}
              disabled={this.props.disabled}
              onChange={this.onChange.bind(this)}
              handleStyle={styles.handleStyle}
              style={styles.sliderStyle} />
          </div>
          <Button
            bsSize='sm'
            bsStyle='success'
            disabled={this.props.disabled}
            onClick={this.onSetValue.bind(this)}
          >✔</Button>
        </div>
        <p style={{ fontSize: 12 }}>
          Act: {roundValue(this.props.actual)}|
          Cur: {roundValue(this.state.val)} |
          ±: {roundValue(this.state.val - this.props.actual)}
        </p>
      </div>
    )
  }
}

export default Slide
