import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import { sendCommand } from '../../api/api';
import React from 'react';

const ButtonGroup = ({ 
  emergencyStop, start, brake,
  changeEmergencyStop, changeStart, changeBrake }) => {
  return (
    <div>
        <Button bsStyle="success" bsSize="large" block
          active={start}
          onClick={() => changeStart(!start)}>
          Start
        </Button>
        <Button bsStyle="danger" bsSize="large" block
          active={emergencyStop}
          onClick={() => changeEmergencyStop(!emergencyStop)}>
          Emergency Stop
        </Button>
      <hr/>
        <Button bsStyle="info" bsSize="large" block
          active={brake}
          onClick={() => changeBrake(!brake)}>
          Engage Brakes
        </Button>
    </div>
  );
};

const ButtonGroupConnected = connect(
  (state) => {
    return {
      emergencyStop: state.controls.emergencyStop,
      start: state.controls.start,
      brake: state.controls.brake
    };
  },
  (dispatch) => {
    return {
      changeEmergencyStop: (val) => sendCommand('Emergency Stop', val),
      changeStart: (val) => sendCommand('Start', val),
      changeBrake: (val) => sendCommand('Brake', val)
    };
  }
)(ButtonGroup);

export default ButtonGroupConnected;
