const tolerance = 0.15
const multiplier = 0.8
const refreshRate = 30
let dispatch

export default function init (dis) {
  dispatch = dis

  setInterval(() => pollController(dispatch), refreshRate)
}

function pollController (dispatch) {
  let controller = navigator.getGamepads()[0]
  if (!controller) return
  let acceleration = controller.axes[1]

  if (Math.abs(acceleration) > tolerance) {
    dispatch({
      type: 'CHANGE_ACCELERATION_REL',
      data: acceleration * multiplier * -1
    })
  }

  let speed = controller.axes[3]

  if (Math.abs(speed) > tolerance) {
    dispatch({
      type: 'CHANGE_SPEED_REL',
      data: speed * multiplier * -1
    })
  }
}
