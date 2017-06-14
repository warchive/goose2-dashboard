import * as Broadcasts from '../../events/broadcasts'
import * as Actions from '../store/Actions'

const BroadcastListener = (dispatch) => {
  return (broadcast) => {
    let name, val
    try {
      const data = JSON.parse(broadcast.data)
      name = data.name
      val = data.value
    } catch (e) {
      console.error(e)
    }

    switch (name) {
      case Broadcasts.ACCELERATION:
        return dispatch({type: Actions.UPDATE_ACCELERATION, data: val})
      case Broadcasts.AIR_TANK_LEVEL:
        return dispatch({type: Actions.UPDATE_AIR_TANK_LEVEL, data: val})
      case Broadcasts.BATTERY_LEVEL:
        return dispatch({type: Actions.UPDATE_BATTERY, data: val})
      case Broadcasts.DISTANCE:
        return dispatch({type: Actions.UPDATE_DISTANCE, data: val})
      case Broadcasts.EMERGENCY_STOP:
        return dispatch({type: Actions.UPDATE_EMERGENCY_STOP, data: val})
      case Broadcasts.LEVITATION:
        return dispatch({type: Actions.UPDATE_LEVITATION, data: val})
      case Broadcasts.IMU:
        return dispatch({type: Actions.UPDATE_IMU, data: val})
      case Broadcasts.SPEED:
        return dispatch({type: Actions.UPDATE_SPEED, data: val})
      case Broadcasts.START:
        return dispatch({type: Actions.UPDATE_POD_START, data: val})
      case Broadcasts.TEMPERATURE:
        return dispatch({type: Actions.UPDATE_TEMP, data: val})
      default: console.error(`Unrecognized name: ${name}, val: ${val}`)
    }
  }
}

export default BroadcastListener
