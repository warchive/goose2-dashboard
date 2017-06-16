import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import Switch from 'react-toggle-switch'
import { sendCommand } from '../../api/api'
import React from 'react'
import * as Actions from '../../store/Actions'
import * as Commands from '../../../events/commands'

const LabelSwitch = ({ label, checked, onToggle }) => {
  console.log('checked: ' + checked)
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      margin: 10}}>
      <Switch
        on={checked}
        onClick={() => onToggle(!checked)} />
      <p style={{marginBottom: 0, marginLeft: 10}}>{label}</p>
    </div>
  )
}

const Settings = ({ manualControl, instantChange,
  onlyKeepLastData,
  changeManualControl, changeInstantControl,
  changeKeepLastData }) => {
  return (
    <div>
      <Row>
        <LabelSwitch
          label='Manual control'
          checked={manualControl}
          onToggle={(evt) => changeManualControl(evt)} />
      </Row>
      <hr />
      <Row>
        <LabelSwitch
          label='Instant Change'
          checked={instantChange}
          onToggle={(evt) => changeInstantControl(evt)} />
      </Row>
      <Row>
        <LabelSwitch
          label='Only Cache Last Data'
          checked={onlyKeepLastData}
          onToggle={(evt) => changeKeepLastData(evt)} />
      </Row>

    </div>
  )
}

const SettingsConnected = connect(
  (state) => {
    return {
      manualControl: state.controlSettings.manualControl,
      instantChange: state.controlSettings.instantChange,
      onlyKeepLastData: state.controlSettings.onlyKeepLastData
    }
  },
  (dispatch) => {
    return {
      changeManualControl: (val) => {
        console.log('val ' + val)
        dispatch({ type: Actions.CHANGE_CONTROL_MANUAL, data: val })
        sendCommand(Commands.MANUAL_CONTROL)
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
