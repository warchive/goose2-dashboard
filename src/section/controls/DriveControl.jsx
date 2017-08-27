import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as Commands from '../../../events/commands'
import * as Actions from '../../store/Actions'
import { sendCommand } from '../../api/api'
import HorizontalSlider from '../../components/HorizonalSlider'

const DriveControl = ({
  style, manual,
  drive, drop,
  changeDriveTrain, changeDrop, changeSafety,
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
        active={drop}
        onClick={() => changeDrop(!drop)}> Drop </Button>
      <HorizontalSlider
        min={0}
        max={100}
        defaultVal={50}
        actual={drive}
        disabled={!manual}
        onChange={changeDriveTrain}
        title='RPM' />
    </div>
  )
}

export default connect(state => Object({
  drive: state.podState.drive,
  drop: state.podState.brake,
  manual: true
}), (dispatch) => Object({
  changeDriveTrain: (val) => {
    sendCommand(Commands.DRIVE_TRAIN_SPEED, [Number(val)])
    dispatch({
      type: Actions.CHANGE_DRIVE_TRAIN_SPEED,
      data: val
    })
  },
  changeDrop: (val) => {
    sendCommand(Commands.DROP, [Number(val)])
    dispatch({
      type: Actions.CHANGE_DRIVE_DROP,
      data: val
    })
  }
}))(DriveControl)
