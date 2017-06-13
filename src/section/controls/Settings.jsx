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
      margin: 10}}>
      <Switch
        checked={checked}
        onClick={() => onToggle(!checked)} />
      <p style={{marginBottom: 0, marginLeft: 10}}>{label}</p>
    </div>
  )
}

const Settings = ({ manualControl, instantChange,
  changeManualControl, changeInstantControl }) => {
  return (
    <div>
      <Row>
        <LabelSwitch
          label='Manual control'
          checked={manualControl}
          onToggle={(evt) => changeManualControl(evt)} />
      </Row>
      <Row>
        <LabelSwitch
          label='Instant Change'
          checked={instantChange}
          onToggle={(evt) => changeInstantControl(evt)} />
      </Row>
    </div>
  )
}

const SettingsConnected = connect(
  (state) => {
    return {
      manualControl: state.manualControl,
      instantChange: state.instantChange
    }
  },
  (dispatch) => {
    return {
      changeManualControl: (val) => {
        console.log(val)
        dispatch({ type: Actions.CHANGE_CONTROL_MANUAL, val })
        sendCommand(Commands.MANUAL_CONTROLl)
      },
      changeInstantControl: (val) => {
        dispatch({ type: Actions.CHANGE_CONTROL_INSTANT, val })
      }
    }
  }
)(Settings)

export default SettingsConnected
