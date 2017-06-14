import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { sendCommand } from '../../api/api'
import Slider from 'rc-slider/lib/Slider'

import { SliderDefinitions } from '../../../config'

import 'rc-slider/assets/index.css'

const styles = {
  handleStyle: {
    width: '100px',
    transform: 'translateX(-50px) translateY(20px)',
    height: '40px',
    borderRadius: '0',
    margin: 0
  },
  sliderStyle: {
    marginTop: 20,
    marginBottom: 20,
    minHeight: 200
  }
}

class Slide extends React.Component {
  constructor () {
    super()
    this.state = {
      val: 0
    }
  }

  onChange (evt) {
    this.setState(Object.assign({},
    this.state, {val: evt}))

    if (this.props.instantChange) {
      this.props.onChange(this.state.val)
    }
  }

  onAfterChange (evt) {
    if (!this.props.instantChange) {
      this.props.onChange(this.state.val)
    }
  }

  // componentWillRecieveProps (nextProps) {
  //   if (nextProps.val !== this.state.val) {
  //     this.setState(Object.assign({}, this.state,
  //       {val: nextProps.val}))
  //   }
  // }

  render () {
    return (
      <div className='slider-container'>
        <p className='text-center' >{this.props.title}</p>
        <p className='text-center' >{this.state.val}</p>
        <Slider vertical included
          style={styles.sliderStyle}
          onChange={(evt) => this.onChange(evt)}
          onAfterChange={(evt) => this.onAfterChange(evt)}
          min={this.props.min}
          max={this.props.max}
          default={this.props.defaultVal}
          value={this.state.val}
          handleStyle={[styles.handleStyle]}
          disabled={this.props.disabled} />
      </div>
    )
  }
}

const SliderGroup = ({ instantChange, manual, controls, changeControl }) => {
  return (
    <Row className='slider-group'>
      {
        SliderDefinitions.map(v =>
          <Slide
            key={v.name}
            instantChange={instantChange}
            onChange={val => changeControl(v.action, v.command, val)}
            title={v.name}
            min={v.min}
            max={v.max}
            defaultVal={v.default}
            disabled={!manual}
            val={v.valueFromControl(controls)} />
        )
      }
    </Row>
  )
}

const SliderGroupConnected = connect(
  (state) => {
    return {
      instantChange: state.controlSettings.instantChange,
      manual: state.controlSettings.manualControl,
      controls: state.controls
    }
  },
  (dispatch) => {
    return {
      changeControl: (action, command, val) => {
        sendCommand(command, val)
        dispatch({ type: action, data: val })
      }
    }
  }
)(SliderGroup)

export default SliderGroupConnected
