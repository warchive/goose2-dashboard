/**
 * Configuration file for the control panel, we should
 * try to move as much definitions as possible here
 */

// Default URL for the server
export const URL = 'ws://localhost:8000/'

// If we need to prompt for URL every time
export const PROMPT_FOR_URL = false

// If we want to cache all recieved data in the redux store
export const CACHE_LAST_DATA = true

// Expected time delay between heart beats
export const HEART_BEAT_POLLING_DELAY = 200

// How many data points big graphs should show
export const LARGE_GRAPH_POINTS = 50

// How many data points small graphs hould show
export const SMALL_GRAPH_POINTS = 20

// How many decimal places values should be rounded to
export const ROUNDING = 1

export const roundValue = (val) => Math.round(val * (10 ** ROUNDING)) / 10 ** ROUNDING

export const STATES = [
  'Man',
  'Standby',
  'Rdy',
  'Accel',
  'Coast',
  'Brk_Hi',
  'Brk_lo'
]

/**
 * If true, BatchedListener Will accumulate redux dispatches in an array
 * for BATCH_UPDATE_INTEVERAL milliseconds and then dispatch them all at the
 * same time.
 *
 * This saves a lot of rendering cycles and optimizes the front end
 */
export const BATCH_UPDATES = false
export const BATCH_UPDATE_INTERVAL = 500
