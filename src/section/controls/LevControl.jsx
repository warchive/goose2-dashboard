import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import HorizontalSlider from '../../components/HorizonalSlider'

const LevControl = ({
  style, manual,
  DPR, ballValve, // Input States
  changeDPR, changeBallValve, stop  // Commands
}) => {
  return (
    <div className='control-group' style={style}>
      <h6> Lev </h6>
      <div className='r'>
        <Button
          bsStyle='info'
          bsSize='sm'
          active={DPR}
          disabled={!manual}
          onClick={() => changeDPR(!DPR)}>
          DPR </Button>

        <Button
          bsStyle='info'
          bsSize='sm'
          active={ballValve}
          disabled={!manual}
          onClick={() => changeBallValve(!DPR)}>
          Ball Valve </Button>
      </div>
      <Button
        block
        bsStyle='danger'
        bsSize='normal'
        disabled={!manual}
        onClick={() => stop()}> Stop </Button>

      <HorizontalSlider
        min={0}
        max={100}
        defaultVal={50}
        actual={5}
        disabled={!manual}
        onChange={console.log}
        onAfterChange={console.log}
        title='Levitation' />
    </div>
  )
}

export default connect(state => Object({
  DPR: state.controls.DPRActual,
  ballValve: state.controls.ballValveActual,
  manual: state.controlSettings.manualControlMode

}))(LevControl)
