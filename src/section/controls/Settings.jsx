import { connect } from 'react-redux'
import { sendCommand } from '../../api/api'
import React from 'react'
import { Button } from 'react-bootstrap'
import * as Actions from '../../store/Actions'
import * as Commands from '../../../events/commands'
import { STATES } from '../../../config'

const Style = {
  settings: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    alignContent: 'center'
  }
}

const Settings = ({
  style,
  state, changeState
}) => {
  return (
    <div style={Object.assign({}, Style.settings, style)} >
      {
        STATES.map((v, i) =>
          <Button
            onClick={() => changeState(i)}
            bsSize='sm'
            bsStyle='info'
            active={i === state}
            key={i}
            style={{ margin: '0 5px 0 5px' }}>
            {v}</Button>
        )
      }
    </div >
  )
}

const SettingsConnected = connect(
  (state) => {
    return {
      state: state.podData.state
    }
  },
  (dispatch) => ({
    changeState: (val) => {
      sendCommand(Commands.STATE, [Number(val)])
    }
  })
)(Settings)

export default SettingsConnected
