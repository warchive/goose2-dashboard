/**
 * @typedef {Object} Controls
 * @property {boolean} start If the pod has been started
 * @property {boolean} emergencyStop If the emergency stop has been engaged
 * @property {float} speed The set speed for the pod
 * @property {float} acceleration The set acceleration
 *
 * Actual referes to what the pod reports (pod's state)
 * @property {boolean} startActual
 * @property {boolean} emergencyStopActual
 * @property {float} speedActual
 * @property {float} accelerationActual
 */
let controls = {
  start: false,
  emergencyStop: false,
  speed: 0,
  acceleration: 0,
  brake: false,
  ballValve: false,
  DPR: false,
  /** Actual values reported from the pod */
  startActual: false,
  emergencyStopActual: false,
  speedActual: 0,
  accelerationActual: 0,
  brakeActual: false,
  ballValveActual: false,
  DPRActual: false
}

/**
 * @typedef {Object} ControlSettings
 * @property {boolean} manualControl If the controls are manual
 * @property {boolean} instantChange If controls should be changed immediately
 */
let controlSettings = {
  manualControl: false,
  instantChange: false,
  keepLastData: false
}

/**
 * @typedef {Object} Data
 * @property {Array} speed Speed history of the pod
 * @property {Array} acceleration acceleration history of the pod
 * @property {Array} battery battery history of the pod
 * @property {Array} temp temp history of the pod
 * @property {Array} airTankLevel airTankLevel history of the pod
 * @property {Array} airTankPressure airTankPressure history of the pod
 * @property {Array} distance distance history of the pod
 * @property {Array} imu Inertial history
 * @property {Array} imuRotation Inertial rotation history
 *
 * Array of 2 Tuples where the first index is the time in milliseconds
 * reported by the pod and the second is a k tuple depending on the
 * amount of dimensions of information
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
  imuRotation: [],
  gyro: [],
  photo: [],
  heartBeat: []
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
