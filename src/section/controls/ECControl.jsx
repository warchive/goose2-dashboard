import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as Commands from '../../../events/commands'
import * as Actions from '../../store/Actions'
import { sendCommand } from '../../api/api'

const ECControl = ({
  style, manual,
  solenoid,
  changeSolenoid, connectArduino
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
        onClick={connectArduino}>
        Connect Arduino </Button>
    </div>
  )
}

export default connect(state => ({
  manual: state.controlSettings.manualControlMode,
  solenoid: state.controls.ECSolenoidActual
}), (dispatch) => ({
  changeSolenoid: (val) => {
    dispatch({ type: Actions.CHANGE_EC_SOLENOID, data: val })
    sendCommand(Commands.EC_SOLENOID, [Number(val)])
  },
  connectArduino: () => {
    sendCommand(Commands.CONNECT_ARDUINO)
  }
}
))(ECControl)
