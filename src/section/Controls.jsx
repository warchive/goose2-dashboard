import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import { sendCommand } from '../api/api';

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
      changeEmergencyStop: (val) => sendCommand('Emergency Stop', val),
      changeStart: (val) => sendCommand('Start', val),
      changeBrake: (val) => sendCommand('Brake', val)
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
