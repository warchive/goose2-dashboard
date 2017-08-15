import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as Commands from '../../../events/commands'
import * as Actions from '../../store/Actions'
import { sendCommand } from '../../api/api'
import HorizontalSlider from '../../components/HorizonalSlider'

const DriveControl = ({
  style, manual,
  drive,
  changeDriveTrain, stop  // Commands
}) => {
  return (
    <div className='control-group' style={style}>
      <h6> Drive </h6>
      <HorizontalSlider
        min={0}
        max={100}
        defaultVal={50}
        actual={drive}
        disabled={!manual}
        onChange={changeDriveTrain}
        title='Magwheel' />
      <Button
        block
        bsStyle='danger'
        bsSize='normal'
        disabled={!manual}
        onClick={() => stop()}> Stop </Button>
    </div>
  )
}

export default connect(state => Object({
  drive: state.controls.driveTrainActual,
  manual: state.controlSettings.manualControlMode
}), (dispatch) => Object({
  changeDriveTrain: (val) => {
    sendCommand(Commands.DRIVE_TRAIN_SPEED, val)
    dispatch({
      type: Actions.CHANGE_DRIVETRAIN_SPEED,
      data: val
    })
  },
  stop: (val) => {
  }
}))(DriveControl)
