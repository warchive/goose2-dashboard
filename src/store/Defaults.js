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

let controlSettings = {
  instantChange: false,
  keepLastData: false
}

let podData = {
  /**
   * IMU is a big one that contains 9 whole data points,
   * [
   *  gyro_x, gyro_y, gyro_z,
   *  accel_x, accel_y, accel_z,
   *  roll, pitch, yaw
   * ]
   */
  imu: [],
  /**
   * This single array stores the Voltage, Current, and Temperature for
   * all three batteries onboard in the following order:
   * [
   *  battery5_temp, battery5_voltage, battery5_current,
   *  battery24_temp, battery24_voltage, battery24_current,
   *  battery48_temp, battery48_voltage, battery48_current
   * ]
   */
  battery: [],
  /**
   * This single array stores all the information for magwheels
   * [
   *  front_left_motor_temp, rear_right_motor_temp,
   *  front_left_rpm, front_right_rpm,
   *  rear_left_rpm, rear_right_rpm
   * ]
   */
  mag: [],
  /**
   * This holds data from photoelectric distance and lateral sensors
   * [
   *  front_left_dist,
   *  front_right_dist,
   *  lateral_dist
   * ]
   */
  photo: [],
  /**
   * This holds the data from the levitation systems
   * [
   *  dpr (low pressure sensor)
   *  medium_pressure
   *  high_pressure
   * ]
   */
  pressure: [],
  /**
   * The distance from the start of the track in meters determined
   * by the color sensor
   * [
   *  distance
   * ]
   */
  color: [], // 1
  /**
   * Reed sensor value for the drive train position
   */
  reed: [],
  pusher: false, // boolean
  state: 0, // int
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
  podData,
  controls,
  controlSettings,
  connection
}
