import * as Commands from '../../events/commands'
import * as Actions from '../store/Actions'

export const SensorListener = (dispatch) => {
  return (broadcast) => {
    broadcast = JSON.parse(broadcast)
    let {
      time,
      sensor,
      data
    } = broadcast

    time *= 1000 // Convert from seconds to milliseconds

    switch (sensor) {
      case 'tank':
        return dispatch({
          type: Actions.UPDATE_DATA_LEV_TANK_PRESSURE,
          data: [time, data]
        })
      case 'regulator':
        return dispatch({
          type: Actions.UPDATE_DATA_LEV_REGULATOR_OUTPUT,
          data: [time, data]
        })
      case 'photo':
        return dispatch({
          type: Actions.UPDATE_DATA_LEV_PHOTO,
          data: [time, data]
        })
      case 'latphoto':
        return dispatch({
          type: Actions.UPDATE_DATA_EC_PHOTO,
          data: [time, data]
        })
      case 'ectemp':
        return dispatch({
          type: Actions.UPDATE_DATA_EC_TEMP,
          data: [time, data]
        })
      case 'rpm':
        return dispatch({
          type: Actions.UPDATE_DATA_MW_RPM,
          data: [time, data]
        })
      case 'mwtemp':
        return dispatch({
          type: Actions.UPDATE_DATA_MW_TEMP,
          data: [time, data]
        })
      case 'drivetemp':
        return dispatch({
          type: Actions.UPDATE_DATA_DRIVE_TEMP,
          data: [time, data]
        })
      case 'reed':
        return dispatch({
          type: Actions.UPDATE_DATA_DRIVE_REED,
          data: [time, data]
        })
      case 'current':
        return dispatch({
          type: Actions.UPDATE_DATA_DRIVE_CURRENT,
          data: [time, data]
        })
      case 'batterytemp':
        return dispatch({
          type: Actions.UPDATE_DATA_POD_BATTERY_TEMP,
          data: [time, data]
        })
      case 'batteryvolt':
        return dispatch({
          type: Actions.UPDATE_DATA_POD_BATTERY_VOLT,
          data: [time, data]
        })
      case 'batteryamp':
        return dispatch({
          type: Actions.UPDATE_DATA_POD_BATTERY_AMP,
          data: [time, data]
        })
      case 'regulatoroutput':
        return dispatch({
          type: Actions.UPDATE_DATA_POD_REGULATOR,
          data: [time, data]
        })
      case 'imu':
        return dispatch({
          type: Actions.UPDATE_DATA_POD_IMU,
          data: [time, data]
        })
      case 'color':
        return dispatch({
          type: Actions.UPDATE_DATA_POD_COLOR,
          data: [time, data]
        })
      case 'pusher':
        return dispatch({
          type: Actions.UPDATE_DATA_POD_PUSHER,
          data: data
        })
      case 'state':
        return dispatch({
          type: Actions.UPDATE_DATA_POD_STATE,
          data: [time, data]
        })
      case 'message':
        return dispatch({
          type: Actions.UPDATE_DATA_POD_MESSAGES,
          data: [time, data]
        })
      default:
        console.error(`Unrecognized name: ${sensor}, data: ${data}`)
    }
  }
}

export const CommandRecievedListener = (dispatch) => {
  return (broadcast) => {
    broadcast = JSON.parse(broadcast)

    let cmd = broadcast.received.cmd
    let val = broadcast.received.val

    switch (cmd) {
      case Commands.EMERGENCY_STOP:
        return dispatch({
          type: Actions.UPDATE_CONTROL_EMERGENCY_STOP,
          data: Boolean(val[0])
        })
      case Commands.DROP:
        return dispatch({
          type: Actions.UPDATE_CONTROL_DROP,
          data: Boolean(val[0])
        })
      case Commands.BRAKE:
        return dispatch({
          type: Actions.UPDATE_CONTROL_BRAKE,
          data: Boolean(val[0])
        })
      case Commands.BALL_VALVE:
        return dispatch({
          type: Actions.UPDATE_CONTROL_BALL_VALVE,
          data: Boolean(val[0])
        })
      case Commands.DPR:
        return dispatch({
          type: Actions.UPDATE_CONTROL_DPR,
          data: Boolean(val[0])
        })
      case Commands.ACCELERATION:
        return dispatch({
          type: Actions.UPDATE_CONTROL_ACCELERATION,
          data: Boolean(val[0])
        })
      case Commands.SPEED:
        return dispatch({
          type: Actions.UPDATE_CONTROL_SPEED,
          data: Boolean(val[0])
        })
      case Commands.MTV:
        return dispatch({
          type: Actions.UPDATE_CONTROL_MTV,
          data: Boolean(val[0])
        })
      case Commands.EC_SOLENOID:
        return dispatch({
          type: Actions.UPDATE_CONTROL_EC_SOLENOID,
          data: Boolean(val[0])
        })
      case Commands.DRIVE_SOLENOID:
        return dispatch({
          type: Actions.UPDATE_CONTROL_DRIVE_SOLENOID,
          data: Boolean(val[0])
        })
      case Commands.DRIVE_SAFETY:
        return dispatch({
          type: Actions.UPDATE_CONTROL_DRIVE_SAFETY,
          data: Boolean(val[0])
        })
      case Commands.LAUNCH:
        return dispatch({
          type: Actions.UPDATE_CONTROL_LAUNCH,
          data: Boolean(val[0])
        })
      default:
        console.error(`Unrecognized cmd: ${cmd}`)
    }
  }
}

export const MessageListener = (dispatch) => {
  return (broadcast) => {
    broadcast = JSON.parse(broadcast)
    let {
      time,
      message
    } = broadcast
    let hash = Math.random().toString(36).substring(8)
    dispatch({
      type: Actions.UPDATE_DATA_POD_MESSAGES,
      data: [hash, time, message]
    })
  }
}
