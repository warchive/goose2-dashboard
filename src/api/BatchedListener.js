import * as Commands from '../../events/commands'
import * as Actions from '../store/Actions'
import {
  BATCH_UPDATES,
  BATCH_UPDATE_INTERVAL
} from '../../config'

export const SensorListener = (dispatch) => {
  let lastDispatch = Date.now()
  let dispatchBatch = []
  let backupTimerId
  return (broadcast) => {
    broadcast = JSON.parse(broadcast)
    let {
      time,
      sensor,
      data
    } = broadcast

    time *= 1000 // Convert from seconds to milliseconds

    /**
     * This case and switch statement links up each incoming broadcast data name
     * indicated by the condition of the switch statement, the the redux action
     * that should be dispatche
     */
    switch (sensor) {
      // Lev Data

      case 'highpres':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_LEV_HIGH_PRESSURE,
          data: [time, data]
        })
        break
      case 'medpres':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_LEV_MEDIUM_PRESSURE,
          data: [time, data]
        })
        break
      case 'dpr':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_LEV_DPR,
          data: [time, data]
        })
        break
      case 'photo':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_LEV_PHOTO,
          data: [time, data]
        })
        break

        // Ec section
      case 'latphoto':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_EC_PHOTO,
          data: [time, data]
        })
        break
      case 'ectemp':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_EC_TEMP,
          data: [time, data]
        })
        break

        // Magwheel Section
      case 'rpm':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_MW_RPM,
          data: [time, data]
        })
        break
      case 'mwControllerTemp':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_MW_CONTROLLER_TEMP,
          data: [time, data]
        })
        break
      case 'mwMotorTemp':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_MW_MOTOR_TEMP,
          data: [time, data]
        })
        break

        // Drive section
      case 'drivetemp':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_DRIVE_TEMP,
          data: [time, data]
        })
        break
      case 'reed':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_DRIVE_REED,
          data: data[0]
        })
        break
      case 'current':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_DRIVE_CURRENT,
          data: [time, data]
        })
        break

        // Pod (misc) section
      case 'battery':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_POD_BATTERY,
          data: [time, data]
        })
        break
      case 'imu':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_POD_IMU,
          data: [time, data]
        })
        break
      case 'color':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_POD_COLOR,
          data: [time, data]
        })
        break
      case 'pusher':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_POD_PUSHER,
          data: data[0]
        })
        break
      case 'state':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_POD_STATE,
          data: data[0]
        })
        break
      case 'message':
        dispatchBatch.push({
          type: Actions.UPDATE_DATA_POD_MESSAGES,
          data: [time, data]
        })
        break
      default:
        console.error(`Unrecognized name: ${sensor}, data: ${data}`)
    }

    if (BATCH_UPDATES) {
      if (Date.now() - lastDispatch >= BATCH_UPDATE_INTERVAL) {
        dispatch(dispatchBatch)
        lastDispatch = Date.now()
        dispatchBatch = []
        if (backupTimerId !== -1) {
          clearTimeout(backupTimerId)
          backupTimerId = -1
        }
      } else {
        if (backupTimerId !== -1) return
        backupTimerId = setTimeout(() => {
          dispatch(dispatchBatch)
          lastDispatch = Date.now()
          dispatchBatch = []
        }, BATCH_UPDATE_INTERVAL)
      }
    } else {
      dispatch(dispatchBatch[0])
      dispatchBatch = []
    }
  }
}

export const CommandRecievedListener = (dispatch) => {
  return (broadcast) => {
    broadcast = JSON.parse(broadcast)

    let cmd = broadcast.received.cmd
    let val = broadcast.received.val

    console.log(cmd)
    console.log(val)

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
      case Commands.BATTERY_24:
        return dispatch({
          type: Actions.UPDATE_CONTROL_BATTERY_24,
          data: Boolean(val[0])
        })
      case Commands.BATTERY_48:
        return dispatch({
          type: Actions.UPDATE_CONTROL_BATTERY_48,
          data: Boolean(val[0])
        })
      case Commands.MAGWHEEL_SPEED:
        return dispatch({
          type: Actions.UPDATE_CONTROL_MAGWHEEL,
          data: val[0]
        })
      case Commands.DRIVE_TRAIN_SPEED:
        return dispatch({
          type: Actions.UPDATE_CONTROL_DRIVETRAIN_SPEED,
          data: val[0]
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
