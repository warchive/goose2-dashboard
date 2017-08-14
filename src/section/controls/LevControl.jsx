import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as Commands from '../../../events/commands'
import * as Actions from '../../store/Actions'
import { sendCommand } from '../../api/api'
const LevControl = ({
  style, manual,
  DPR, ballValve, // Input States
  changeDPR, changeBallValve, stop  // Commands
}) => {
  return (
    <div className='control-group' style={style}>
      <h6> Lev </h6>
      <div className='r'>
        <Button
          bsStyle='info'
          bsSize='sm'
          active={DPR}
          disabled={!manual}
          onClick={() => changeDPR(!DPR)}>
          DPR </Button>

        <Button
          bsStyle='info'
          bsSize='sm'
          active={ballValve}
          disabled={!manual}
          onClick={() => changeBallValve(!DPR)}>
          Ball Valve </Button>
      </div>
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
  DPR: state.controls.DPRActual,
  ballValve: state.controls.ballValveActual,
  manual: state.controlSettings.manualControlMode
}), (dispatch) => Object({
  changeBallValve: (val) => {
    sendCommand(Commands.BALL_VALVE, [Number(val)])
    dispatch({ type: Actions.CHANGE_BALL_VALVE, data: val })
  },
  changeDPR: (val) => {
    sendCommand(Commands.DPR, [Number(val)])
    dispatch({ type: Actions.CHANGE_DPR, data: val })
  },
  stop: (val) => {
  }
}))(LevControl)
