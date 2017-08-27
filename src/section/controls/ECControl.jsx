import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as Commands from '../../../events/commands'
import * as Actions from '../../store/Actions'
import { sendCommand } from '../../api/api'

const ECControl = ({
  style, manual,
  brakeSolenoid, battery24, battery48,
  changeBrake, changeBattery24, changeBattery48
}) => {
  return (
    <div className='control-group' style={style}>
      <h6> EC </h6>
      <Button
        bsStyle='info'
        bsSize='sm'
        active={brakeSolenoid}
        disabled={!manual}
        onClick={() => changeBrake(!brakeSolenoid)}>
        Solenoid </Button>
      <Button
        bsStyle='info'
        bsSize='sm'
        active={battery24}
        disabled={!manual}
        onClick={() => changeBattery24(!battery24)}>
        Battery24 </Button>
      <Button
        bsStyle='info'
        bsSize='sm'
        active={battery48}
        disabled={!manual}
        onClick={() => changeBattery48(!battery48)}>
        Battery48 </Button>
    </div>
  )
}

export default connect(state => ({
  manual: true,
  brakeSolenoid: state.podState.brake,
  battery24: state.podState.batt24,
  battery48: state.podState.batt48
}), (dispatch) => ({
  changeBrake: (val) => {
    dispatch({ type: Actions.CHANGE_BRAKE, data: val })
    sendCommand(Commands.BRAKE, [Number(val)])
  },
  changeBattery24: (val) => {
    dispatch({ type: Actions.CHANGE_BATTERY_24, data: val })
    sendCommand(Commands.BATTERY_24, [Number(val)])
  },
  changeBattery48: (val) => {
    dispatch({ type: Actions.CHANGE_BATTERY_48, data: val })
    sendCommand(Commands.BATTERY_48, [Number(val)])
  }
}
))(ECControl)
