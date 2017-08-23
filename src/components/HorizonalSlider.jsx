import React from 'react'
import { Button } from 'react-bootstrap'
import Slider from 'rc-slider/lib/Slider'
import { roundValue } from '../../config'

import 'rc-slider/assets/index.css'

const Style = {
  handleStyle: {
    width: '20px',
    transform: 'translateX(-10px) translateY(-20px)',
    height: '40px',
    borderRadius: '0',
    margin: 0
  },
  bottomLabel: { fontSize: 12 },
  topRow: { display: 'flex', flexDirection: 'row' },
  mainRow: { display: 'flex', flexDirection: 'row', padding: '5 0 5 0' },
  sliderContainer: { padding: 15, flex: 1 }
}

class InputBox extends React.Component {
  constructor (props) {
    super()

    this.state = {
      val: props.value
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.val && nextProps.value !== this.props.value) {
      this.setState({ val: nextProps.value, error: false })
    }
  }

  onChange (evt) {
    let newVal = evt.target.value
    let error = false

    if (isNaN(parseFloat(newVal))) error = true
    else if (this.props.strict && (newVal < this.props.min || newVal > this.props.max)) {
      error = true
    }

    this.setState({ val: newVal, error })
    if (!error) {
      this.props.onChange(parseFloat(newVal))
    }
  }

  onFocus () {
    this.setState({ val: '' })
  }

  onBlur () {
    if (this.state.val === '') {
      return this.setState({ val: this.props.value })
    }
    if (isNaN(parseFloat(this.state.val))) return
    if (this.props.strict && (this.state.val < this.props.min || this.state.val > this.props.max)) return

    if (this.props.onBlur && !isNaN(parseFloat(this.state.val))) {
      this.props.onBlur(parseFloat(this.state.val))
    }
  }

  onKeyUp (evt) {
    if (evt.key === 'Enter' && !isNaN(parseFloat(this.state.val)) && this.props.onEnter) {
      if (this.props.strict && (this.state.val < this.props.min || this.state.val > this.props.max)) return
      this.props.onEnter(parseFloat(this.state.val))
    }
  }

  render () {
    return (
      <input
        type='text'
        size={7}
        value={this.state.val}
        onKeyUp={this.onKeyUp.bind(this)}
        onChange={this.onChange.bind(this)}
        onFocus={this.onFocus.bind(this)}
        onBlur={this.onBlur.bind(this)}
        style={{ backgroundColor: this.state.error ? '#FF7575' : '' }} />
    )
  }
}

class HorizontalSlider extends React.Component {
  constructor (props) {
    super()
    this.state = {
      val: props.defaultVal,
      inputVal: props.defaultVal,
      lastChangeFromInput: false
    }
  }

  onChange (evt) {
    this.setState({ val: evt, lastChangeFromInput: false })

    if (this.props.instantChange) {
      this.props.onChange(this.state.val)
    }
  }

  onSetValue () {
    if (this.state.lastChangeFromInput) {
      this.props.onChange(this.state.inputVal)
      this.setState({ val: this.state.inputVal, lastChangeFromInput: false })
    } else {
      this.props.onChange(this.state.val)
    }
  }

  onButtonChange (up) {
    let newVal = this.state.val + (up ? 1 : -1)

    if (newVal > this.props.max || newVal < this.props.min) {
      return
    }

    this.setState({ val: newVal, lastChangeFromInput: false })
    this.props.onChange(newVal)
  }

  render () {
    return (
      <div>
        <div style={Style.topRow}>
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
        <div style={Style.mainRow}>
          <div style={Style.sliderContainer}>
            <Slider
              value={this.state.val}
              min={this.props.min}
              max={this.props.max}
              disabled={this.props.disabled}
              onChange={this.onChange.bind(this)}
              handleStyle={Style.handleStyle}
              style={Style.sliderStyle} />
          </div>
          <Button
            bsSize='sm'
            bsStyle='success'
            disabled={this.props.disabled}
            onClick={this.onSetValue.bind(this)}
          >✔</Button>
        </div>
        <p style={Style.bottomLabel}>
          Cur:
          <InputBox
            value={this.state.val}
            min={this.props.min}
            max={this.props.max}
            strict
            onChange={(val) => this.setState({ inputVal: val, lastChangeFromInput: true })}
            onBlur={(val) => this.setState({ inputVal: val, val, lastChangeFromInput: true })}
            onEnter={(val) => {
              this.setState({ inputVal: val, val, lastChangeFromInput: false })
              this.onSetValue()
            }} />
          Act: {roundValue(this.props.actual)}|
          ±: {roundValue(this.state.val - this.props.actual)}
        </p>
      </div>
    )
  }
}

export default HorizontalSlider
