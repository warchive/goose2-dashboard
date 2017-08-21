import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as Commands from '../../../events/commands'
import * as Actions from '../../store/Actions'
import { sendCommand } from '../../api/api'
import HorizontalSlider from '../../components/HorizonalSlider'

const MagwheelControl = ({
  style, manual, launch,
  magwheel, brake,
  changeMagwheel, changeBrake, changeLaunch  // Commands
}) => {
  return (
    <div className='control-group' style={style}>
      <h6> Magwheel </h6>
      <Button
        block
        bsStyle='success'
        bsSize='sm'
        disabled={!manual}
        active={launch}
        onClick={() => changeLaunch(!launch)}> Launch </Button>
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
        active={brake}
        onClick={() => changeBrake(!brake)}> Brake </Button>
    </div>
  )
}

export default connect(state => Object({
  magwheel: state.controls.magwheelActual,
  launch: state.controls.launchActual,
  brake: state.controls.brakeActual,
  manual: state.controlSettings.manualControlMode
}), (dispatch) => Object({
  changeMagwheel: (val) => {
    sendCommand(Commands.MAGWHEEL_SPEED, [val])
    dispatch({
      type: Actions.CHANGE_MAGWHEEL_SPEED,
      data: val
    })
  },
  changeLaunch: (val) => {
    sendCommand(Commands.LAUNCH, [Number(val)])
    dispatch({
      type: Actions.CHANGE_LAUNCH,
      data: val
    })
  },
  changeBrake: (val) => {
    sendCommand(Commands.BRAKE, [Number(val)])
    dispatch({
      type: Actions.CHANGE_BRAKE,
      data: val
    })
  }
}))(MagwheelControl)
