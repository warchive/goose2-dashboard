import React from 'react'
import { connect } from 'react-redux'
// import { Button } from 'react-bootstrap'
// import * as Commands from '../../../events/commands'
// import * as Actions from '../../store/Actions'
// import { sendCommand } from '../../api/api'
// import HorizontalSlider from '../../components/HorizonalSlider'

const ECControl = ({
  style, manual,
  stop  // Commands
}) => {
  return (
    <div className='control-group' style={style}>
      <h6> EC </h6>
    </div>
  )
}

export default connect(state => Object({
  manual: state.controlSettings.manualControlMode
}), (dispatch) => Object({
}
))(ECControl)
