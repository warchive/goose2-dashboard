import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as Commands from '../../../events/commands'
import * as Actions from '../../store/Actions'
import { sendCommand } from '../../api/api'
import HorizontalSlider from '../../components/HorizonalSlider'

const MagwheelControl = ({
  style, manual,
  magwheel,
  changeMagwheel, stop  // Commands
}) => {
  return (
    <div className='control-group' style={style}>
      <h6> Magwheel </h6>
      <HorizontalSlider
        min={0}
        max={100}
        defaultVal={0}
        actual={magwheel}
        disabled={!manual}
        onChange={changeMagwheel}
        title='Magwheel' />
      <Button
        block
        bsStyle='danger'
        bsSize='normal'
        disabled={!manual}
        onClick={() => stop()}> Stop </Button>
    </div>
  )
}

export default connect(state => Object({
  magwheel: state.controls.magwheelActual,
  manual: state.controlSettings.manualControlMode
}), (dispatch) => Object({
  changeMagwheel: (val) => {
    sendCommand(Commands.MAGWHEEL_SPEED, val)
    dispatch({
      type: Actions.CHANGE_MAGWHEEL_SPEED,
      data: val
    })
  },
  stop: (val) => {
  }
}))(MagwheelControl)
