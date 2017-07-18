import * as Broadcasts from '../../events/broadcasts'
import * as Commands from '../../events/commands'
import * as Actions from '../store/Actions'

export const SensorListener = (dispatch) => {
  return (broadcast) => {
    broadcast = JSON.parse(broadcast)

    let {time, sensor, data} = broadcast

    switch (sensor) {
      case Broadcasts.SPEED:
        return dispatch({type: Actions.UPDATE_SPEED, data: [time, data]})
      case Broadcasts.ACCELERATION:
        return dispatch({type: Actions.UPDATE_ACCELERATION, data: [time, data]})
      case Broadcasts.AIR_TANK_LEVEL:
        return dispatch({type: Actions.UPDATE_AIR_TANK_LEVEL, data: [time, data]})
      case Broadcasts.BATTERY:
        return dispatch({type: Actions.UPDATE_BATTERY, data: [time, data]})
      case Broadcasts.TEMPERATURE:
        return dispatch({type: Actions.UPDATE_TEMP, data: [time, data]})
      case Broadcasts.DISTANCE:
        return dispatch({type: Actions.UPDATE_DISTANCE, data: [time, data]})
      case Broadcasts.IMU:
        return dispatch({type: Actions.UPDATE_IMU, data: [time, data]})
      case Broadcasts.GYRO:
        return dispatch({type: Actions.UPDATE_GYRO, data: [time, data]})
      default: console.error(`Unrecognized name: ${sensor}, data: ${data}`)
    }
  }
}

export const CommandRecievedListener = (dispatch) => {
  return (broadcast) => {
    broadcast = JSON.stringify(broadcast)

    let time = broadcast.time
    let cmd = broadcast.recieved.cmd
    let val = broadcast.recieved.val

    switch(cmd){
      case Commands.EMERGENCY_STOP:
        return dispatch({type: Actions.UPDATE_CONTROL_EMERGENCY_STOP, data: val[0]})
      case Commands.START:
        return dispatch({type: Actions.UPDATE_CONTROL_POD_START, data: val[0]})
      case Commands.BRAKE:
        return dispatch({type: Actions.UPDATE_CONTROL_BRAKE, data: val[0]})
      case Commands.BALL_VALVE:
        return dispatch({type: Actions.UPDATE_CONTROL_BALL_VALVE, data: val[0]})
      case Commands.DPR:
        return dispatch({type: Actions.UPDATE_CONTROL_DPR, data: val[0]})
      case Commands.SPEED:
        return dispatch({type: Actions.UPDATE_CONTROL_SPEED, data: val[0]})
      case Commands.ACCELERATION:
        return dispatch({type: Actions.UPDATE_CONTROL_ACCELERATION, data: val[0]})
      case Commands.SPEED:
        return dispatch({type: Actions.UPDATE_CONTROL_SPEED, data: val[0]})
      default: console.error(`Unrecognized cmd: ${cmd}`)
    }
  }
}

export const MessageListener = (dispatch) => {
  return (broadcast) => {
    broadcast = JSON.stringify(broadcast)

    let {time, message} = broadcast
    
    dispatch({
      type: Actions.UPDATE_MESSAGE_LOG,
      data: {
        time,
        message
      }
    })
  }
}
