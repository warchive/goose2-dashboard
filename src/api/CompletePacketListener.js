import * as Actions from '../store/Actions'

import {
  BATCH_UPDATES,
  BATCH_UPDATE_INTERVAL
} from '../../config'

export const SensorListener = (dispatch) => {
  let dispatchBatch = []
  let lastDispatch = Date.now()
  let backupTimerId = -1
  return (broadcast) => {
    try {
      broadcast = JSON.parse(broadcast)
      let {
        time,
        data
      } = broadcast

      let dispatchAction = {
        type: Actions.UPDATE_DATA_POD_DATA,
        data: {
          time,
          data
        }
      }

      if (!BATCH_UPDATES) return dispatch(dispatchAction)

      dispatchBatch.push(dispatchAction)
      if (Date.now() - lastDispatch >= BATCH_UPDATE_INTERVAL) {
        dispatch(dispatchBatch)
        lastDispatch = Date.now()
        dispatchBatch = []
        if (backupTimerId !== -1) {
          clearTimeout(backupTimerId)
          backupTimerId = -1
        }
      } else {
        if (backupTimerId !== -1) return
        backupTimerId = setTimeout(() => {
          dispatch(dispatchBatch)
          lastDispatch = Date.now()
          dispatchBatch = []
        }, BATCH_UPDATE_INTERVAL)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const StateListener = (dispatch) => {
  return (broadcast) => {
    try {
      broadcast = JSON.parse(broadcast)

      let data = broadcast.data

      dispatch({
        type: Actions.UPDATE_STATE,
        data
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export const MessageListener = (dispatch) => {
  return (broadcast) => {
    broadcast = JSON.parse(broadcast)
    let {
      time,
      message
    } = broadcast
    let hash = Math.random().toString(36).substring(8)
    dispatch({
      type: Actions.UPDATE_DATA_POD_MESSAGES,
      data: [hash, time, message]
    })
  }
}
