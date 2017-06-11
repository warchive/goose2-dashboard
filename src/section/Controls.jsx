import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import { sendCommand } from '../api/api';

/** Components */
import ButtonGroup from './controls/ButtonGroup';
import SliderGroup from './controls/SliderGroup';

class Control extends React.Component {

  render() {
    return (
      <Row>
        <Col sm={4}>
          <SliderGroup />
        </Col>
        <Col sm={4}>
          <ButtonGroup />
        </Col>
      </Row>
    );
  }
}

export default Control;
