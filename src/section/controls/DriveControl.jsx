import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as Commands from '../../../events/commands'
import * as Actions from '../../store/Actions'
import { sendCommand } from '../../api/api'
import HorizontalSlider from '../../components/HorizonalSlider'

const DriveControl = ({
  style, manual,
  drive, solenoid, safety,
  changeDriveTrain, changeSolenoid, changeSafety,
  stop  // Commands
}) => {
  return (
    <div className='control-group' style={style}>
      <h6> Drive </h6>
      <Button
        block
        bsStyle='info'
        bsSize='sm'
        disabled={!manual}
        active={solenoid}
        onClick={() => changeSolenoid(!solenoid)}> Solenoid </Button>
      <Button
        block
        bsStyle='info'
        bsSize='sm'
        disabled={!manual}
        active={safety}
        onClick={() => changeSafety(!safety)}> Safety </Button>
      <HorizontalSlider
        min={0}
        max={100}
        defaultVal={50}
        actual={drive}
        disabled={!manual}
        onChange={changeDriveTrain}
        title='Magwheel' />
    </div>
  )
}

export default connect(state => Object({
  drive: state.controls.driveTrainActual,
  solenoid: state.controls.driveSolenoidActual,
  safety: state.controls.driveSafetyActual,
  manual: state.controlSettings.manualControlMode
}), (dispatch) => Object({
  changeDriveTrain: (val) => {
    sendCommand(Commands.DRIVE_TRAIN_SPEED, val)
    dispatch({
      type: Actions.CHANGE_DRIVETRAIN_SPEED,
      data: [val]
    })
  },
  changeSolenoid: (val) => {
    sendCommand(Commands.DRIVE_SOLENOID, [Number(val)])
    dispatch({
      type: Actions.CHANGE_DRIVE_SOLENOID,
      data: val
    })
  },
  changeSafety: (val) => {
    sendCommand(Commands.DRIVE_SAFETY, [Number(val)])
    dispatch({
      type: Actions.CHANGE_DRIVE_SAFETY,
      data: val
    })
  }
}))(DriveControl)
