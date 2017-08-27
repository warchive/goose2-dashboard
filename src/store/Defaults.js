/**
 * Not being used right now
 */
let controlSettings = {
  instantChange: false,
  keepLastData: false
}

/**
 * This object is responsible for keeping track of the
 * state of the pod
 *
 * The dashboard should display this state to match the pod's
 */
let podState = {
  magWheel: 0,
  drive: 0,
  drop: false,
  dpr: false,
  ballValve: false,
  brake: false,
  batt48: false,
  batt24: false,
  state: 0
}

/**
 * This object represents the state of the frontend
 * It is the exact copy of the pod state, but keep tracks of
 * what the front end thinks is "true", this way we can tell
 * if there is a state mismatch
 */
let frontState = {
  magWheel: 0,
  drive: 0,
  drop: false,
  dpr: false,
  ballValve: false,
  brake: false,
  batt48: false,
  batt24: false,
  state: 0
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
  podState,
  frontState,
  controlSettings,
  connection
}
