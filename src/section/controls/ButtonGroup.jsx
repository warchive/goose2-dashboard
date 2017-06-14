import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { sendCommand } from '../../api/api'
import Commands from '../../../events/commands.js'
import React from 'react'

const ButtonGroup = ({
  manual,
  emergencyStop, start, brake, levitation,
  changeEmergencyStop, changeStart, changeBrake, changeLevitation }) => {
  return (
    <div>
      <Button bsStyle='success' bsSize='large' block
        active={start}
        onClick={() => changeStart(!start)}>
        Start
      </Button>
      <Button bsStyle='danger' bsSize='large' block
        active={emergencyStop}
        onClick={() => changeEmergencyStop(!emergencyStop)}>
        Emergency Stop
      </Button>
      <hr />
      <Button bsStyle='info' bsSize='large' block
        active={levitation}
        onClick={() => changeLevitation(!levitation)}
        disabled={!manual} >
        Engage Levitation
      </Button>
      <Button bsStyle='info' bsSize='large' block
        active={brake}
        onClick={() => changeBrake(!brake)}
        disabled={!manual} >
        Engage Brakes
      </Button>
    </div>
  )
}

const ButtonGroupConnected = connect(
  (state) => {
    return {
      emergencyStop: state.controls.emergencyStop,
      start: state.controls.start,
      levitation: state.controls.levitation,
      brake: state.controls.brake,
      manual: state.controlSettings.manualControl
    }
  },
  (dispatch) => {
    return {
      changeEmergencyStop: (val) =>
        sendCommand(Commands.EMERGENCY_STOP, val),
      changeStart: (val) => sendCommand(Commands.START, val),
      changeBrake: (val) => sendCommand(Commands.BRAKE, val),
      changeLevitation: (val) => sendCommand(Commands.LEVITATION, val)
    }
  }
)(ButtonGroup)

export default ButtonGroupConnected
