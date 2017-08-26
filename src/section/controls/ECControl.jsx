import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as Commands from '../../../events/commands'
import * as Actions from '../../store/Actions'
import { sendCommand } from '../../api/api'

const ECControl = ({
  style, manual,
  solenoid, battery24, battery48,
  changeSolenoid, changeBattery24, changeBattery48
}) => {
  return (
    <div className='control-group' style={style}>
      <h6> EC </h6>
      <Button
        bsStyle='info'
        bsSize='sm'
        active={solenoid}
        disabled={!manual}
        onClick={() => changeSolenoid(!solenoid)}>
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
  solenoid: state.controls.ECSolenoidActual,
  battery24: state.controls.battery24Actual,
  battery48: state.controls.battery48Actual
}), (dispatch) => ({
  changeSolenoid: (val) => {
    dispatch({ type: Actions.CHANGE_EC_SOLENOID, data: val })
    sendCommand(Commands.EC_SOLENOID, [Number(val)])
  },
  changeBattery24: (val) => {
    sendCommand(Commands.BATTERY_24, [Number(val)])
  },
  changeBattery48: (val) => {
    sendCommand(Commands.BATTERY_48, [Number(val)])
  }
}
))(ECControl)
