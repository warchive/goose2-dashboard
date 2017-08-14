import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import Switch from 'react-toggle-switch'
import { sendCommand } from '../../api/api'
import React from 'react'
import * as Actions from '../../store/Actions'
import * as Commands from '../../../events/commands'

const LabelSwitch = ({ label, checked, onToggle }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      margin: 10
    }}>
      <Switch
        on={checked}
        onClick={() => onToggle(!checked)} />
      <p style={{ marginBottom: 0, marginLeft: 10 }}>{label}</p>
    </div>
  )
}

const Settings = ({
  style,
  manualControlMode, scriptControlMode, autoControlMode,
  instantChange, keepLastData,
  switchToManualControl, switchToScriptControl, switchToAutoControl,
  changeInstantControl, changeKeepLastData
}) => {
  return (
    <div style={style}>
      <Row>
        <LabelSwitch
          label='Manual control'
          checked={manualControlMode}
          onToggle={switchToManualControl} />
      </Row>
      <Row>
        <LabelSwitch
          label='Script Mode'
          checked={scriptControlMode}
          onToggle={switchToScriptControl} />
      </Row>
      <Row>
        <LabelSwitch
          label='Auto Mode'
          checked={autoControlMode}
          onToggle={switchToAutoControl} />
      </Row>
      <hr />
      <Row>
        <LabelSwitch
          label='Instant Change'
          checked={instantChange}
          onToggle={changeInstantControl} />
      </Row>
      <Row>
        <LabelSwitch
          label='Only Cache Last Data'
          checked={keepLastData}
          onToggle={(evt) => changeKeepLastData(evt)} />
      </Row>

    </div>
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
      },
      changeInstantControl: (val) => {
        dispatch({ type: Actions.CHANGE_CONTROL_INSTANT, data: val })
      },
      changeKeepLastData: (val) => {
        dispatch({ type: Actions.CHANGE_KEEP_LAST_DATA, data: val })
      }
    }
  }
)(Settings)

export default SettingsConnected
