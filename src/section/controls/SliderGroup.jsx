import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { sendCommand } from '../../api/api'
import Slide from '../../components/Slider'
import { SliderDefinitions } from '../../../config'

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
