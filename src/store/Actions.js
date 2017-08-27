/**
 * Dashboard control actions, these actions will change the
 * frontState which is what the dashboard "believes" to be
 * true
 */
export const CHANGE_BRAKE = 'CHANGE_BRAKE'
export const CHANGE_BATTERY_24 = 'CHANGE_BATTERY_24'
export const CHANGE_BATTERY_48 = 'CHANGE_BATTERY_48'
export const CHANGE_DRIVE_TRAIN_SPEED = 'CHANGE_DRIVETRAIN_SPEED'
export const CHANGE_DRIVE_DROP = 'CHANGE_DRIVE_DROP'
export const CHANGE_BALL_VALVE = 'CHANGE_BALL_VALVE'
export const CHANGE_MAGWHEEL_SPEED = 'CHANGE_MAGWHEEL_SPEED'
export const CHANGE_DPR = 'CHANGE_DPR'
export const CHANGE_STATE = 'CHANGE_STATE'

/** Setting controls */
export const CHANGE_CONTROL_INSTANT = 'CHANGE_CONTROL_INSTANT'
export const CHANGE_KEEP_LAST_DATA = 'CHANGE_KEEP_LAST_DATA'

/**
 * This action is responsible for updating all of the pod's state
 * at once
 */
export const UPDATE_STATE = 'UPDATE_STATE'

/**
 * This action is responsible for updating all of the data
 * recorded by the front end all at once
 */
export const UPDATE_DATA_POD_DATA = 'UPDATE_DATA_POD_DATA'

/**
 * Used to update the messages that appear in the message log
 */
export const UPDATE_DATA_POD_MESSAGES = 'UPDATE_DATA_POD_MESSAGES'

/** Change connection details */
export const UPDATE_CONNECTION_STATE = 'UPDATE_CONNECTION_STATE'
export const UPDATE_CONNECTION_LATENCY = 'UPDATE_CONNECTION_LATENCY'
export const UPDATE_CONNECTION_STRENGTH = 'UPDATE_CONNECTION_STRENGTH'
