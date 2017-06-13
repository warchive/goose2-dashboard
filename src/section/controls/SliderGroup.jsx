import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import { sendCommand } from '../../api/api';
import * as Actions from '../../store/Actions.js';
import Slider from 'rc-slider/lib/Slider';
import createSliderWithTooltip from 'rc-slider/lib/createSliderWithTooltip';
import 'rc-slider/assets/index.css';

import { SPEED_CONF, ACCELERATION_CONF } from '../../../config';

const SliderWithTooltip = createSliderWithTooltip(Slider);

const styles = {
  handleStyle: {
    width: '80px',
    transform: 'translateX(-40px)',
    height: '20px',
    borderRadius: '0',
    margin: 0
  }
};

const Slide = ({ instantChange, onChange, title, min, max, defaultVal }) => {
  return (
    <div className="slider-container">
      <p className="text-center" >{title}</p>
      <SliderWithTooltip vertical included
        onChange={instantChange ? onChange : () => null}
        onAfterChange={instantChange ? () => null : onChange}
        min={min} max={max} default={defaultVal}
        handleStyle={[styles.handleStyle]} />
    </div>
  );
};

class SliderGroup extends React.Component {

  handleSliderChange(type, val) {
    if (type == 'Acceleration') {
      this.props.changeAcceleration(val);
    } else if (type == 'Speed') {
      this.props.changeSpeed(val);
    }
  }

  render() {
    return (
      <Row className="slider-group">
        <Slide
          instantChange={this.props.instantChange}
          onChange={(val) => this.handleSliderChange('Acceleration', val)}
          title="Acceleration"
          min={ACCELERATION_CONF.min}
          max={ACCELERATION_CONF.max}
          defaultVal={ACCELERATION_CONF.default} />
        <Slide
          instantChange={this.props.instantChange}
          onChange={(val) => this.handleSliderChange('Speed', val)}
          title="Speed"
          min={SPEED_CONF.min}
          max={SPEED_CONF.max}
          defaultVal={SPEED_CONF.default} />
      </Row>
    );
  }
}


const SliderGroupConnected = connect(
  (state) => {
    return {
      instantChange: state.controlSettings.instantChange,
      manual: state.controlSettings.manualControl
    };
  },
  (dispatch) => {
    return {
      changeSpeed: (val) => {
        sendCommand('Speed', val);
        dispatch({ type: Actions.CHANGE_SPEED, data: val });
      },
      changeAcceleration: (val) => {
        sendCommand('Acceleration', val);
        dispatch({ type: Actions.CHANGE_ACCELERATION, data: val });
      }
    };
  }
)(SliderGroup);

export default SliderGroupConnected;
