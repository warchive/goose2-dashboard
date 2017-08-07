import { connect } from 'react-redux'
import { Button, Row, Col } from 'react-bootstrap'
import { sendCommand } from '../../api/api'
import * as Commands from '../../../events/commands'
import * as Actions from '../../store/Actions'
import React from 'react'

const GROUP_ONE_HEIGHT = 100
const GROUP_TWO_HEIGHT = 70

const ButtonGroup = ({
  manual, connect,
  emergencyStop, drop, brake, levitation, ballValve, DPR,
  changeEmergencyStop, changeDrop, changeBrake, changeLevitation,
  changeBallValve, changeDPR, changeConnect }) => {
  return (
    <div>
      <Row>
        <Col sm={4}>
          <Button bsStyle='success' bsSize='large' block
            style={{ minHeight: GROUP_ONE_HEIGHT }}
            active={drop}
            onClick={() => changeDrop(!drop)}>
            Drop
          </Button>
        </Col>
        <Col sm={8}>
          <Button bsStyle='danger' bsSize='large' block
            style={{ minHeight: GROUP_ONE_HEIGHT }}
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
            style={{ minHeight: GROUP_TWO_HEIGHT }}
            active={brake}
            onClick={() => changeBrake(!brake)}
            disabled={!manual} >
            Engage Brakes
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle='info' bsSize='large' block
            style={{ minHeight: GROUP_TWO_HEIGHT }}
            active={connect}
            onClick={() => changeConnect(!connect)}
            disabled={false} >
            Connect Arduino
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col sm={6}>
          <Button bsStyle='info' bsSize='large' block
            style={{ minHeight: GROUP_TWO_HEIGHT }}
            active={ballValve}
            onClick={() => changeBallValve(!ballValve)}
            disabled={!manual} >
            Ball Valve
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle='info' bsSize='large' block
            style={{ minHeight: GROUP_TWO_HEIGHT }}
            active={DPR}
            onClick={() => changeDPR(!DPR)}
            disabled={!manual} >
            DPR
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
      drop: state.controls.dropActual,
      levitation: state.controls.levitationActual,
      brake: state.controls.brakeActual,
      ballValve: state.controls.ballValveActual,
      DPR: state.controls.DPRActual,
      manual: state.controlSettings.manualControlMode,
      connect: state.controls.connectActual
    }
  },
  (dispatch) => {
    return {
      changeEmergencyStop: (val) => {
        sendCommand(Commands.EMERGENCY_STOP, [Number(val)])
        dispatch({ type: Actions.CHANGE_EMERGENCY_STOP, data: val })
      },
      changeDrop: (val) => {
        sendCommand(Commands.DROP, [Number(val)])
        dispatch({ type: Actions.CHANGE_DROP, data: val })
      },
      changeBrake: (val) => {
        sendCommand(Commands.BRAKE, [Number(val)])
        dispatch({ type: Actions.CHANGE_BRAKE, data: val })
      },
      changeBallValve: (val) => {
        sendCommand(Commands.BALL_VALVE, [Number(val)])
        dispatch({ type: Actions.CHANGE_BALL_VALVE, data: val })
      },
      changeDPR: (val) => {
        sendCommand(Commands.DPR, [Number(val)])
        dispatch({ type: Actions.CHANGE_DPR, data: val })
      },
      changeConnect: (val) => {
        sendCommand(Commands.CONNECT_ARDUINO, [Number(val)])
        dispatch({type: Actions.CHANGE_CONNECT_ARDUINO, data: val})
      }
    }
  }
)(ButtonGroup)

export default ButtonGroupConnected
