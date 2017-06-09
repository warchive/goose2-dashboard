import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import { sendMessage, sendJSON } from '../api/api';

const ButtonGroup = ({ 
  emergencyStop, start, brake,
  changeEmergencyStop, changeStart, changeBrake }) => {
  return (
    <div>
      <Row>
        <Button bsStyle="success" bsSize="large" block
          active={start}
          onClick={() => changeStart(!start)}>
          Start
        </Button>
      </Row>
      <Row>
        <Button bsStyle="danger" bsSize="large" block
          active={emergencyStop}
          onClick={() => changeEmergencyStop(!emergencyStop)}>
          Emergency Stop
        </Button>
      </Row>
      <hr/>
      <Row>
        <Button bsStyle="info" bsSize="large" block
          active={brake}
          onClick={() => changeBrake(!brake)}>
          Engage Brakes
        </Button>
      </Row>
    </div>
  )
}

const ButtonGroupConnected = connect(
  (state) => {
    return {
      emergencyStop: state.controls.emergencyStop,
      start: state.controls.start,
      brake: state.controls.brake
    }
  },
  (dispatch) => {
    return {
      changeEmergencyStop: (val) => sendJSON({
        command: 'Emergency Stop',
        value: val
      }),
      changeStart: (val) => sendJSON({
        command: 'Start',
        value: val
      }),
      changeBrake: (val) => sendJSON({
        command: 'Brake',
        value: val
      })
    }
  }
)(ButtonGroup);

class Control extends React.Component {

  render() {
    return (
      <Row>
        <Col>
        </Col>
        <Col md={2} >
          <ButtonGroupConnected />
        </Col>
      </Row >
    )
  }
}

export default Control;
