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
  connect: false,
  speed: 0,
  acceleration: 0,
  brake: false,
  ballValve: false,
  DPR: false,
  MTV: false,
  ECSolenoid: false,
  magwheel: 0,
  driveTrain: 0,
  driveSolenoid: false,
  driveSafety: false,
  launch: false,
  /** Actual values reported from the pod */
  dropActual: false,
  startActual: false,
  emergencyStopActual: false,
  connectActual: false,
  speedActual: 0,
  accelerationActual: 0,
  brakeActual: false,
  ballValveActual: false,
  DPRActual: false,
  MTVActual: false,
  ECSolenoidActual: false,
  magwheelActual: 0,
  driveTrainActual: 0,
  driveSolenoidActual: false,
  driveSafetyActual: false,
  launchActual: false,
  battery24Actual: true,
  battery48Actual: true
}

/**
 * @typedef {Object} ControlSettings
 * @property {boolean} manualControl If the controls are manual
 * @property {boolean} instantChange If controls should be changed immediately
 */
let controlSettings = {
  manualControlMode: true,
  instantChange: false,
  keepLastData: false
}

/**
 * Array of 2 Tuples where the first index is the time in milliseconds
 * reported by the pod and the second is a k tuple depending on the
 * amount of dimensions of information
 */
let levData = {
  highPressure: [], // 1
  mediumPressure: [], // 1
  DPR: [], // 1
  photo: [] // 4
}

let ECData = {
  photo: [], // 2
  temp: [] // 2
}

let MWData = {
  RPM: [], // 4
  controllerTemp: [], // 4
  motorTemp: [] // 4
}

let driveData = {
  temp: [], // 1
  reed: false,
  current: [] // 1
}

let podData = {
  /**
   * This single array stores the Voltage, Current, and Temperature for
   * all three batteries onboard in the following order:
   * [
   *  battery5_current, battery5_voltage, battery5_temp,
   *  battery24_current, battery24_voltage, battery24_temp,
   *  battery48_current, battery48_voltage, battery48_temp
   * ]
   */
  battery: [],
  /**
   * IMU is a big one that contains 9 whole data points,
   * [
   *   gyro_x, gyro_y, gyro_z,
   *   accel_x, accel_y, accel_z,
   *   roll, pitch, yaw
   * ]
   */
  IMU: [], // 9
  color: [], // 1
  pusher: false, // boolean
  state: -1, // int
  messages: [] // array of strings
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
  levData,
  ECData,
  MWData,
  driveData,
  podData,
  controls,
  controlSettings,
  connection
}
