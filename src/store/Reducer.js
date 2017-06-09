import Defaults from './Defaults';
import * as Actions from './Actions';

/**
 * The reducer for the redux store
 * @param {StoreState} state 
 * @param {Object} param1
 * @param {String}  param1.type
 * @param {*}  param1.data
 */
let Reducer = (state = Defaults, { type, data }) => {
  console.log(state);
  switch (type) {
    /** Basic control data */
    case Actions.POD_START: {
      return Object.assign({}, state, { controls: { start: data } });
    }
    case Actions.EMERGENCY_STOP: {
      return Object.assign({}, state, { controls: { emergencyStop: data } });
    }
    case Actions.CHANGE_SPEED: {
      return Object.assign({}, state, { controls: { speed: data } });
    }
    case Actions.CHANGE_ACCELERATION: {
      return Object.assign({}, state, { controls: { acceleration: data } });
    }
    case Actions.CHANGE_SPEED: {
      return Object.assign({}, state, { controls: { brake: data } });
    }

    /** Data update settings */
    case Actions.UPDATE_SPEED: {
      let newSpeedData = state.data.speed.concat(data);
      return Object.assign({}, state, { data: { speed: newSpeedData } });
    }
    case Actions.UPDATE_ACCELERATION: {
      let newAccelerationData = state.data.acceleration.concat(data);
      return Object.assign({}, state,
        { data: { acceleration: newAccelerationData } });
    }
    case Actions.UPDATE_AIR_TANK_LEVEL: {
      let newAirTankData = state.data.airTankLevel.concat(data);
      return Object.assign({}, state,
        { data: { airTankLevel: newAirTankData } });
    }
    case Actions.UPDATE_BATTERY: {
      let newBatteryData = state.data.battery.concat(data);
      return Object.assign({}, state,
        { data: { battery: newBatteryData } });
    }
    case Actions.UPDATE_TEMP: {
      let newTempData = state.data.temp.concat(data);
      return Object.assign({}, state,
        { data: { temp: newTempData } });
    }
    case Actions.UPDATE_AIR_TANK_PRESSURE: {
      let newAirTankPressureData = state.data.airTankPressure.concat(data);
      return Object.assign({}, state,
        { data: { airTankPressure: newAirTankPressureData } });
    }
    case Actions.UPDATE_DISTANCE: {
      let newDistanceData = state.data.distance.concat(data);
      return Object.assign({}, state,
        { data: { distance: newDistanceData } });
    }
    case Actions.UPDATE_IMU: {
      let newIMUData = state.data.imu.concat(data);
      return Object.assign({}, state,
        { data: { imu: newIMUData } });
    }
    case Actions.UPDATE_IMU_ROTATION: {
      let newIMURotationData = state.data.imuRotation.concat(data);
      return Object.assign({}, state,
        { data: { imuRotation: newIMURotationData } });
    }

    default: return state;
  }
}

export default Reducer;
