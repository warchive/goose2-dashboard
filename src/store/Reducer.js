import Defaults from './Defaults'
import * as Actions from './Actions'

/**
 * The reducer for the redux store
 * @param {StoreState} state
 * @param {Object} param1
 * @param {String}  param1.type
 * @param {*}  param1.data
 */
let Reducer = (state = Defaults, { type, data }) => {
  switch (type) {
    /** Basic control data */
    case Actions.POD_START: {
      return changeControl(state, data, 'start')
    }
    case Actions.EMERGENCY_STOP: {
      return changeControl(state, data, 'emergencyStop')
    }
    case Actions.CHANGE_SPEED: {
      return changeControl(state, data, 'speed')
    }
    case Actions.CHANGE_ACCELERATION: {
      return changeControl(state, data, 'acceleration')
    }
    case Actions.CHANGE_BRAKE: {
      return changeControl(state, data, 'brake')
    }
    case Actions.CHANGE_CONTROL_INSTANT: {
      return changeSetting(state, data, 'instantChange')
    }
    case Actions.CHANGE_CONTROL_MANUAL: {
      return changeSetting(state, data, 'manualControl')
    }

    /** Data updates */
    case Actions.UPDATE_SPEED: {
      return addToData(state, data, 'speed')
    }
    case Actions.UPDATE_ACCELERATION: {
      return addToData(state, data, 'acceleration')
    }
    case Actions.UPDATE_BATTERY: {
      return addToData(state, data, 'battery')
    }
    case Actions.UPDATE_TEMP: {
      return addToData(state, data, 'battery')
    }
    case Actions.UPDATE_AIR_TANK_LEVEL: {
      return addToData(state, data, 'airTankLevel')
    }
    case Actions.UPDATE_AIR_TANK_PRESSURE: {
      return addToData(state, data, 'airTankPressure')
    }
    case Actions.UPDATE_DISTANCE: {
      return addToData(state, data, 'distance')
    }
    case Actions.UPDATE_IMU: {
      return addToData(state, data, 'imu')
    }
    case Actions.UPDATE_IMU_ROTATION: {
      return addToData(state, data, 'imuRotation')
    }

    /** Network */
    case Actions.UPDATE_CONNECTION_STATE: {
      return changeConnection(state, data, 'connected')
    }
    default:
      return state
  }
}

function changeControl (state, data, field) {
  let newControl = Object.assign({}, state.controls, {
    [field]: data
  })

  return Object.assign({}, state, {control: newControl})
}

function changeSetting (state, data, field) {
  let newSetting = Object.assign({}, state.controlSettings, {
    [field]: data
  })

  console.log(newSetting)

  return Object.assign({}, state, {controlSettings: newSetting})
}

function changeConnection (state, data, field) {
  let newConnection = Object.assign({}, state.connection, {
    [field]: data
  })

  return Object.assign({}, state, {connection: newConnection})
}

function addToData (state, data, field) {
  let newData = state.data[field].concat(data)

  return Object.assign({}, state, {
    data: Object.assign({}, state.data, {
      [field]: newData
    })})
}

export default Reducer
