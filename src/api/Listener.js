import * as Broadcasts from '../../events/broadcasts'
import * as Commands from '../../events/commands'
import * as Actions from '../store/Actions'

export const SensorListener = (dispatch) => {
  return (broadcast) => {
    broadcast = JSON.parse(broadcast)
    console.log(broadcast)
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
      case Broadcasts.GYRO:
        return dispatch({type: Actions.UPDATE_GYRO, data: [time, data]})
      case Broadcasts.ACCELEROMETER:
        return dispatch({type: Actions.UPDATE_ACCELEROMETER, data: [time, data]})
      case Broadcasts.MAGNETOMETER:
        return dispatch({type: Actions.UPDATE_MAGNETOMER, data: [time, data]})
      case Broadcasts.ROLL_PITCH_YAW:
        return dispatch({type: Actions.UPDATE_ROLL_PITCH_YAW, data: [time, data]})
      case Broadcasts.ANGULAR_VELOCITY:
        return dispatch({type: Actions.UPDATE_ANGULAR_VELOCITY, data: [time, data]})
      case Broadcasts.LINEAR_DISPLACEMENT:
        return dispatch({type: Actions.UPDATE_LINEAR_DISPLACEMENT, data: [time, data]})
      case Broadcasts.LINEAR_ACCELERATION:
        return dispatch({type: Actions.UPDATE_LINEAR_ACCELERATION, data: [time, data]})
      default: console.error(`Unrecognized name: ${sensor}, data: ${data}`)
    }
  }
}

export const CommandRecievedListener = (dispatch) => {
  return (broadcast) => {
    console.log(broadcast)
    broadcast = JSON.parse(broadcast)

    console.log(broadcast)

    let time = broadcast.time
    let cmd = broadcast.received.cmd
    let val = broadcast.received.val

    switch(cmd){
      case Commands.EMERGENCY_STOP:
        return dispatch({type: Actions.UPDATE_CONTROL_EMERGENCY_STOP, data: Boolean(val[0])})
      case Commands.DROP:
        return dispatch({type: Actions.UPDATE_CONTROL_DROP, data: Boolean(val[0])})
      case Commands.BRAKE:
        return dispatch({type: Actions.UPDATE_CONTROL_BRAKE, data: Boolean(val[0])})
      case Commands.BALL_VALVE:
        return dispatch({type: Actions.UPDATE_CONTROL_BALL_VALVE, data: Boolean(val[0])})
      case Commands.DPR:
        return dispatch({type: Actions.UPDATE_CONTROL_DPR, data: Boolean(val[0])})
      case Commands.SPEED:
        return dispatch({type: Actions.UPDATE_CONTROL_SPEED, data: Boolean(val[0])})
      case Commands.ACCELERATION:
        return dispatch({type: Actions.UPDATE_CONTROL_ACCELERATION, data: Boolean(val[0])})
      case Commands.SPEED:
        return dispatch({type: Actions.UPDATE_CONTROL_SPEED, data: Boolean(val[0])})
      case Commands.CONNECT_ARDUINO: 
        return dispatch({type: Actions.UPDATE_CONTROL_CONNECT_ARDUINO, data: Boolean(val[0])})
      default: console.error(`Unrecognized cmd: ${cmd}`)
    }
  }
}

export const MessageListener = (dispatch) => {
  return (broadcast) => {
    broadcast = JSON.parse(broadcast)
    console.log(broadcast)
    let {time, message} = broadcast
    
    dispatch({
      type: Actions.UPDATE_MESSAGE_LOG,
      data: [time, message]
    })
  }
}
