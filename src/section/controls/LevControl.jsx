import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as Commands from '../../../events/commands'
import * as Actions from '../../store/Actions'
import { sendCommand } from '../../api/api'
const LevControl = ({
  style, manual,
  DPR, BallValve, // Input States
  changeDPR, changeBallValve, stop  // Commands
}) => {
  return (
    <div className='control-group' style={style}>
      <h6> Lev </h6>
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
        active={BallValve}
        disabled={!manual}
        onClick={(evt) => changeBallValve(!BallValve)}>
        BallValve </Button>
    </div>
  )
}

export default connect(state => Object({
  DPR: state.podState.dpr,
  BallValve: state.podState.ballValve,
  manual: true
}), (dispatch) => Object({
  changeDPR: (val) => {
    sendCommand(Commands.DPR, [Number(val)])
    dispatch({ type: Actions.CHANGE_DPR, data: val })
  },
  changeBallValve: (val) => {
    sendCommand(Commands.BALL_VALVE, [Number(val)])
    dispatch({ type: Actions.CHANGE_BALL_VALVE, data: val })
  }
}))(LevControl)
