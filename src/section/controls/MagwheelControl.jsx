import React from 'react'
import { connect } from 'react-redux'
import * as Commands from '../../../events/commands'
import * as Actions from '../../store/Actions'
import { sendCommand } from '../../api/api'
import HorizontalSlider from '../../components/HorizonalSlider'

const MagwheelControl = ({
  style, manual,
  magwheel,
  changeMagwheel  // Commands
}) => {
  return (
    <div className='control-group' style={style}>
      <h6> Magwheel </h6>
      <HorizontalSlider
        min={0}
        max={7500}
        defaultVal={0}
        actual={magwheel}
        disabled={!manual}
        onChange={changeMagwheel}
        title='Magwheel' />
    </div>
  )
}

export default connect(state => Object({
  magwheel: state.podState.magWheel,
  manual: true
}), (dispatch) => Object({
  changeMagwheel: (val) => {
    sendCommand(Commands.MAGWHEEL_SPEED, [Number(val)])
    dispatch({
      type: Actions.CHANGE_MAGWHEEL_SPEED,
      data: val
    })
  }
}))(MagwheelControl)
