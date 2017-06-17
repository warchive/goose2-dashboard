import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { sendCommand } from '../../api/api'
import Slider from '../../components/Slider'
import { SliderDefinitions } from '../../../config'

const SliderGroup = ({ manual, changeControl }) => {
  let connectedSliders = SliderDefinitions.map(v => {
    let comp = ({ val, instantChange, manual }) =>
      <Slider
        instantChange={instantChange}
        onChange={val => changeControl(v.action, v.command, val)}
        title={v.title}
        min={v.min}
        max={v.max}
        defaultVal={v.default}
        disabled={!manual}
        val={val} />

    let Connected = connect((state) => {
      return {
        val: v.getValFromState(state),
        instantChange: state.controlSettings.instantChange,
        manual: state.controlSettings.manualControl
      }
    })(comp)

    return <Connected
      key={v.title} />
  })
  return (
    <Row className='slider-group'>
      {connectedSliders}
    </Row>
  )
}

const SliderGroupConnected = connect(
  (state) => {
    return {
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
