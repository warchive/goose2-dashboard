import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { sendCommand } from '../../api/api'
import Slider from 'rc-slider/lib/Slider'
import createSliderWithTooltip from 'rc-slider/lib/createSliderWithTooltip'

import { SliderDefinitions } from '../../../config'

import 'rc-slider/assets/index.css'

const SliderWithTooltip = createSliderWithTooltip(Slider)

const styles = {
  handleStyle: {
    width: '80px',
    transform: 'translateX(-40px)',
    height: '20px',
    borderRadius: '0',
    margin: 0
  }
}

const Slide = ({ instantChange, onChange, title, min, max,
  defaultVal, disabled }) => {
  return (
    <div className='slider-container'>
      <p className='text-center' >{title}</p>
      <SliderWithTooltip vertical included
        onChange={instantChange ? onChange : () => null}
        onAfterChange={instantChange ? () => null : onChange}
        min={min}
        max={max}
        default={defaultVal}
        handleStyle={[styles.handleStyle]}
        disabled={disabled} />
    </div>
  )
}

const SliderGroup = ({ instantChange, manual, changeControl }) => {
  return (
    <Row className='slider-group'>
      {
        SliderDefinitions.map(v =>
          <Slide
            instantChange={instantChange}
            onChange={val => changeControl(v.action, v.command, val)}
            title={v.name}
            min={v.min}
            max={v.max}
            defaultVal={v.default}
            disabled={!manual} />
        )
      }
    </Row>
  )
}

const SliderGroupConnected = connect(
  (state) => {
    return {
      instantChange: state.controlSettings.instantChange,
      manual: state.controlSettings.manualControl
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
