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
    case Actions.CHANGE_CONNECT_ARDUINO: {
      return changeControl(state, data, 'connect')
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
    case Actions.CHANGE_BALL_VALVE: {
      return changeControl(state, data, 'ballValve')
    }
    case Actions.CHANGE_DPR: {
      return changeControl(state, data, 'DPR')
    }
    case Actions.CHANGE_MAGWHEEL_SPEED: {
      return changeControl(state, data, 'magwheel')
    }
    case Actions.CHANGE_DRIVETRAIN_SPEED: {
      return changeControl(state, data, 'driveTrain')
    }
    case Actions.CHANGE_CONTROL_INSTANT: {
      return changeSetting(state, data, 'instantChange')
    }
    case Actions.CHANGE_CONTROL_MANUAL: {
      let newSetting = Object.assign({}, state.controlSettings, {
        manualControlMode: true,
        scriptControlMode: false,
        autoControlMode: false
      })

      return Object.assign({}, state, {controlSettings: newSetting})
    }

    case Actions.CHANGE_CONTROL_AUTO: {
      let newSetting = Object.assign({}, state.controlSettings, {
        manualControlMode: false,
        scriptControlMode: false,
        autoControlMode: true
      })

      return Object.assign({}, state, {controlSettings: newSetting})
    }

    case Actions.CHANGE_CONTROL_SCRIPT: {
      let newSetting = Object.assign({}, state.controlSettings, {
        manualControlMode: false,
        scriptControlMode: true,
        autoControlMode: false
      })

      return Object.assign({}, state, {controlSettings: newSetting})
    }
    case Actions.CHANGE_KEEP_LAST_DATA: {
      return changeSetting(state, data, 'keepLastData')
    }


    /** Pod reported 'actual' values */
    case Actions.UPDATE_CONTROL_EMERGENCY_STOP: {
      return changeControl(state, data, 'emergencyStopActual')
    }
    case Actions.UPDATE_CONTROL_CONNECT_ARDUINO: {
      return changeControl(state, data, 'connectActual')
    }
    case Actions.UPDATE_CONTROL_POD_START: {
      return changeControl(state, data, 'startActual')
    }
    case Actions.UPDATE_CONTROL_DROP: {
      return changeControl(state, data, 'dropActual')
    }
    case Actions.UPDATE_CONTROL_LEVITATION: {
      return changeControl(state, data, 'levitationActual')
    }
    case Actions.UPDATE_CONTROL_BRAKE: {
      return changeControl(state, data, 'brakeActual')
    }
    case Actions.UPDATE_CONTROL_BALL_VALVE: {
      return changeControl(state, data, 'ballValveActual')
    }
    case Actions.UPDATE_CONTROL_DPR: {
      return changeControl(state, data, 'DPRActual')
    }

    /** Data updates */
    case Actions.UPDATE_SPEED: {
      // Add the heart beat from the speed data
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          speed: state.data.speed.concat([data]),
          heartBeat: state.data.heartBeat.concat([data[0]])
        })})
    }
    case Actions.UPDATE_ACCELERATION: {
      return addToData(state, data, 'acceleration')
    }
    case Actions.UPDATE_BATTERY: {
      return addToData(state, data, 'battery')
    }
    case Actions.UPDATE_TEMP: {
      return addToData(state, data, 'temp')
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
    case Actions.UPDATE_ACCELERATION: {
      return addToData(state, data, 'acceleration')
    }
    case Actions.UPDATE_GYRO: {
      return addToData(state, data, 'gyro')
    }
    case Actions.UPDATE_ROLL_PITCH_YAW: {
      return addToData(state, data, 'rollPitchYaw')
    }
    case Actions.UPDATE_LINEAR_VELOCITY: {
      return addToData(state, data, 'linearVelocity')
    }
    case Actions.UPDATE_LINEAR_DISPLACEMENT: {
      return addToData(state, data, 'linearDisplacement')
    }
    case Actions.UPDATE_MAGNETOMER: {
      return addToData(state, data, 'magnetometer')
    }

    case Actions.UPDATE_MESSAGE_LOG: {
      return addToData(state, data, 'messages')
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

  return Object.assign({}, state, {controls: newControl})
}

function changeSetting (state, data, field) {
  let newSetting = Object.assign({}, state.controlSettings, {
    [field]: data
  })

  return Object.assign({}, state, {controlSettings: newSetting})
}

function changeConnection (state, data, field) {
  let newConnection = Object.assign({}, state.connection, {
    [field]: data
  })

  return Object.assign({}, state, {connection: newConnection})
}

function addToData (state, data, field) {
  let newData
  if (state.controlSettings.keepLastData) {
    newData = [data]
  } else {
    newData = state.data[field].concat([data])
  }

  return Object.assign({}, state, {
    data: Object.assign({}, state.data, {
      [field]: newData
    })})
}

export default Reducer
