import { connect } from 'react-redux'
import { sendCommand } from '../../api/api'
import React from 'react'
import { Button } from 'react-bootstrap'
import * as Actions from '../../store/Actions'
import * as Commands from '../../../events/commands'

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
  manualControlMode, scriptControlMode, autoControlMode,
  switchToManualControl, switchToScriptControl, switchToAutoControl
}) => {
  return (
    <div style={Object.assign({}, Style.settings, style)} >
      <Button
        bsStyle='info'
        style={{ margin: '0 5px 0 5px' }}
        bsSize='sm'
        active={manualControlMode}
        onClick={switchToManualControl}>
        Manual </Button>
      <Button
        bsStyle='info'
        style={{ margin: '0 5px 0 5px' }}
        bsSize='sm'
        active={scriptControlMode}
        onClick={switchToScriptControl}>
        Script </Button>
      <Button
        bsStyle='info'
        style={{ margin: '0 5px 0 5px' }}
        bsSize='sm'
        active={autoControlMode}
        onClick={switchToAutoControl}>
        Auto </Button>
    </div >
  )
}

const SettingsConnected = connect(
  (state) => {
    return {
      manualControlMode: state.controlSettings.manualControlMode,
      scriptControlMode: state.controlSettings.scriptControlMode,
      autoControlMode: state.controlSettings.autoControlMode,
      instantChange: state.controlSettings.instantChange,
      keepLastData: state.controlSettings.keepLastData
    }
  },
  (dispatch) => {
    return {
      switchToManualControl: () => {
        dispatch({ type: Actions.CHANGE_CONTROL_MANUAL })
        sendCommand(Commands.MANUAL_CONTROL, [1])
      },
      switchToScriptControl: () => {
        dispatch({ type: Actions.CHANGE_CONTROL_SCRIPT })
        sendCommand(Commands.SCRIPT_CONTROL, [1])
      },
      switchToAutoControl: () => {
        dispatch({ type: Actions.CHANGE_CONTROL_AUTO })
        sendCommand(Commands.AUTO_CONTROL, [1])
      }
    }
  }
)(Settings)

export default SettingsConnected
