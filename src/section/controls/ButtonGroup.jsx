import { connect } from 'react-redux'
import { Button, Row, Col } from 'react-bootstrap'
import { sendCommand } from '../../api/api'
import * as Commands from '../../../events/commands'
import * as Actions from '../../store/Actions'
import React from 'react'

const GROUP_ONE_HEIGHT = 100
const GROUP_TWO_HEIGHT = 70

const ButtonGroup = ({
  manual,
  emergencyStop, start, brake, levitation,
  changeEmergencyStop, changeStart, changeBrake, changeLevitation }) => {
  console.log('start: ' + start)
  console.log(typeof start)
  return (
    <div>
      <Row>
        <Col sm={4}>
          <Button bsStyle='success' bsSize='large' block
            style={{minHeight: GROUP_ONE_HEIGHT}}
            active={start}
            onClick={() => changeStart(!start)}>
            Start
      </Button>
        </Col>
        <Col sm={8}>
          <Button bsStyle='danger' bsSize='large' block
            style={{minHeight: GROUP_ONE_HEIGHT}}
            active={emergencyStop}
            onClick={() => changeEmergencyStop(!emergencyStop)}>
            Emergency Stop
      </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col sm={6}>
          <Button bsStyle='info' bsSize='large' block
            style={{minHeight: GROUP_TWO_HEIGHT}}
            active={levitation}
            onClick={() => changeLevitation(!levitation)}
            disabled={!manual} >
            Engage Levitation
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle='info' bsSize='large' block
            style={{minHeight: GROUP_TWO_HEIGHT}}
            active={brake}
            onClick={() => changeBrake(!brake)}
            disabled={!manual} >
            Engage Brakes
      </Button>
        </Col>
      </Row>
    </div>
  )
}

const ButtonGroupConnected = connect(
  (state) => {
    return {
      emergencyStop: state.controls.emergencyStopActual,
      start: state.controls.startActual,
      levitation: state.controls.levitationActual,
      brake: state.controls.brakeActual,
      manual: state.controlSettings.manualControl
    }
  },
  (dispatch) => {
    return {
      changeEmergencyStop: (val) => {
        sendCommand(Commands.EMERGENCY_STOP, val)
        dispatch({type: Actions.CHANGE_EMERGENCY_STOP, data: val})
      },
      changeStart: (val) => {
        sendCommand(Commands.START, val)
        dispatch({type: Actions.CHANGE_POD_START, data: val})
      },
      changeBrake: (val) => {
        sendCommand(Commands.BRAKE, val)
        dispatch({type: Actions.CHANGE_BRAKE, data: val})
      },
      changeLevitation: (val) => {
        sendCommand(Commands.LEVITATION, val)
        dispatch({type: Actions.CHANGE_LEVITATION, data: val})
      }
    }
  }
)(ButtonGroup)

export default ButtonGroupConnected
