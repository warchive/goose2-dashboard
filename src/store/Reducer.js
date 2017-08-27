import Defaults from './Defaults'
import * as Actions from './Actions'

function changeFrontState(state, field, data) {
  return {
    ...state,
    frontState: {
      ...state.frontState,
      [field]: data
    }
  }
}

/**
 * The reducer for the redux store
 * @param {StoreState} state
 * @param {Object} param1
 * @param {String}  param1.type
 * @param {*}  param1.data
 */
let Reducer = (state = Defaults, {
  type,
  data
}) => {
  switch (type) {
    /** Basic control data */
    case Actions.CHANGE_BRAKE:
      return changeFrontState(state, 'brake', data)
    case Actions.CHANGE_BATTERY_24:
      return changeFrontState(state, 'batt24', data)
    case Actions.CHANGE_BATTERY_48:
      return changeFrontState(state, 'batt48', data)
    case Actions.CHANGE_DRIVE_TRAIN_SPEED:
      return changeFrontState(state, 'drive', data)
    case Actions.CHANGE_DRIVE_DROP:
      return changeFrontState(state, 'drop', data)
    case Actions.CHANGE_BALL_VALVE:
      return changeFrontState(state, 'ballValve', data)
    case Actions.CHANGE_MAGWHEEL_SPEED:
      return changeFrontState(state, 'magWheel', data)
    case Actions.CHANGE_DPR:
      return changeFrontState(state, 'dpr', data)
    case Actions.CHANGE_STATE:
      return changeFrontState(state, 'state', data)

    case Actions.UPDATE_STATE:
      {
        let {
          mag,
          drive,
          drop,
          dpr,
          bv,
          brake,
          batt48,
          batt24,
          state: podState
        } = data

        return {
          ...state,
          podState: {
            ...state.podState,
            magWheel: mag[0],
            drive: drive[0],
            drop: Boolean(drop[0]),
            dpr: Boolean(dpr[0]),
            ballValve: Boolean(bv[0]),
            brake: Boolean(brake[0]),
            batt48: Boolean(batt48[0]),
            batt24: Boolean(batt24[0]),
            state: parseInt(podState[0])
          },
          frontState: {
            ...state.frontState,
            state: parseInt(podState[0])
          }
        }
      }

      /*
       * Data updates received from the pod
       *
       * This section handles hen the pod sends repeated polled data which
       * needs to be added to an array
       *
       * A lot of cases here uses addToData(), it is just a helper
       * function to concat the data into the correct field
       *
       */

    case Actions.UPDATE_DATA_POD_DATA:
      {
        let time = data.time
        let {
          imu,
          battery,
          mag,
          photo,
          pressure,
          color,
          reed
        } = data.data

        return {
          ...state,
          podData: {
            ...state.podData,
            imu: state.podData.imu.concat([
              [time, imu]
            ]),
            battery: state.podData.battery.concat([
              [time, battery]
            ]),
            mag: state.podData.mag.concat([
              [time, mag]
            ]),
            photo: state.podData.photo.concat([
              [time, photo]
            ]),
            pressure: state.podData.pressure.concat([
              [time, pressure]
            ]),
            color: state.podData.color.concat([
              [time, color]
            ]),
            reed: state.podData.reed.concat([
              [time, reed]
            ])

          }
        }
      }
    case Actions.UPDATE_DATA_POD_STATE:
      {
        return {
          ...state,
          podData: {
            ...state.podData,
            state: data
          }
        }
      }
    case Actions.UPDATE_DATA_POD_MESSAGES:
      {
        return {
          ...state,
          podData: {
            ...state.podData,
            messages: state.podData.messages.concat([data])
          }
        }
      }

      /** Network */
    case Actions.UPDATE_CONNECTION_STATE:
      {
        return {
          ...state,
          connection: {
            ...state.connection,
            connected: data
          }
        }
      }

    default:
      return state
  }
}
export default Reducer
