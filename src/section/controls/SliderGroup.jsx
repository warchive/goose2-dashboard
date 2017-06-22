import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { sendCommand } from '../../api/api'
import Slider from '../../components/Slider'
import { SliderDefinitions } from '../../../config'

export default class SliderGroup extends React.Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    let connectedSliders = SliderDefinitions.map(v => {
      let comp = ({ val, instantChange, manual, changeControl }) =>
        <Slider
          instantChange={instantChange}
          onChange={val => changeControl(val)}
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
      }, (dispatch) => {
        return {
          changeControl: (val) => {
            sendCommand(v.command, val)
            dispatch({ type: v.action, data: val })
          }
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
}
