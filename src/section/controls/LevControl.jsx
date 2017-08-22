import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as Commands from '../../../events/commands'
import * as Actions from '../../store/Actions'
import { sendCommand } from '../../api/api'
const LevControl = ({
  style, manual,
  DPR, MTV, // Input States
  changeDPR, changeMTV, stop  // Commands
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
        active={MTV}
        disabled={!manual}
        onClick={(evt) => changeMTV(!MTV)}>
        MTV </Button>
    </div>
  )
}

export default connect(state => Object({
  DPR: state.controls.DPRActual,
  MTV: state.controls.MTVActual,
  manual: state.controlSettings.manualControlMode
}), (dispatch) => Object({
  changeDPR: (val) => {
    sendCommand(Commands.DPR, [Number(val)])
    dispatch({ type: Actions.CHANGE_DPR, data: val })
  },
  changeMTV: (val) => {
    sendCommand(Commands.MTV, [Number(val)])
    dispatch({ type: Actions.CHANGE_MTV, data: val })
  }
}))(LevControl)
