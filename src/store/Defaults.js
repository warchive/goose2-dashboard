/**
 * @typedef {Object} Controls
 * @property {boolean} start If the pod has been started
 * @property {boolean} emergencyStop If the emergency stop has been engaged
 * @property {float} speed The set speed for the pod
 * @property {float} acceleration The set acceleration
 */
let controls = {
  start: false,
  emergencyStop: false,
  speed: 0,
  acceleration: 0,
  brake: false
}

/**
 * @typedef {Object} ControlSettings
 * @property {boolean} manualControl If the controls are manual
 * @property {boolean} instantChange If controls should be changed immediately
 */
let controlSettings = {
  manualControl: false,
  instantChange: false
}

/**
 * @typedef {Object} Data
 * @property {Array<Array<float>>} speed Speed history of the pod
 * @property {Array<Array<float>>} acceleration acceleration history of the pod
 * @property {Array<Array<float>>} battery battery history of the pod
 * @property {Array<Array<float>>} temp temp history of the pod
 * @property {Array<Array<float>>} airTankLevel airTankLevel history of the pod
 * @property {Array<Array<float>>} airTankPressure airTankPressure history of the pod
 * @property {Array<Array<float>>} distance distance history of the pod
 * @property {Array<Array<float>[3]>} imu Inertial history
 * @property {Array<Array<float>[3]>} imuRotation Inertial rotation history
 */
let data = {
  speed: [],
  acceleration: [],
  battery: [],
  temp: [],
  airTankLevel: [],
  airTankPressure: [],
  distance: [],
  imu: [],
  imuRotation: []
}

/**
 * @typedef {Object} Connection
 * @property {Boolean} connected
 * @property {Float} strength
 * @property {Float} latency
 */
let connection = {
  connected: false,
  strength: 0,
  latency: 0
}

/**
 * @typedef {Object} StoreState
 * @property {Controls}
 * @property {ControlSettings}
 * @property {Data}
 * @property {Connection}
 */
export default {
  data,
  controls,
  controlSettings,
  connection
}
