import * as Commands from '../../events/commands'
import * as Actions from '../store/Actions'

export const SensorListener = (dispatch) => {
  return (broadcast) => {
    try {
      broadcast = JSON.parse(broadcast)
      let {
        time,
        data
      } = broadcast

      time *= 1000 // Convert from seconds to milliseconds

      dispatch({
        type: Actions.UPDATE_DATA_POD_DATA,
        data: {
          time,
          data
        }
      })
    } catch (e) {
      let hash = Math.random().toString(36).substring(8)
      dispatch({
        type: Actions.UPDATE_DATA_POD_MESSAGES,
        data: [hash, Date.now(), `Couldn't parse message from pod`]
      })
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
