# Explanation

## The Redux Store

Redux is library that forces _unidirection data flows_. What this means is that data can only flow one way. Looking at the diagram, you can clearly see that in any of the different situations, data only flows one way. This allows for cleaner code and less head aches.

The store itself is just a javascript object and looks something like this:

```js
{
  controls: {
    startActual: false,
    emergencyStopActual: false,
    speedActual: 0,
    accelerationActual: 0,
    brakeActual: false
  },
  controlSettings: {
    manualControl: false,
    instantChange: false,
    keepLastData: false
  },
  data: {
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
  },
  connection: {
    connected: false,
    strength: 0,
    latency: 0
  }
}
```

If you have access to the store object, you can **dispatch** actions to the store. An action is a javascript object with two fields:

```js
store.dispatch({
  type: ACTIONS.CHANGE_SPEED,
  data: 5
})
```

Actions can be found in [store/Actions.js](https://github.com/teamwaterloop/control-front/blob/master/src/store/Actions.js)

Dispatching an action is how you change the state in react. A dispatched action will be recieved by the reducer

Reducer can be found in [store/Reducers.js](https://github.com/teamwaterloop/control-front/blob/master/src/store/Reducers.js)

The reducer takes the current state, and the dispatched action and creates a new state. The reducer must be a true fuction, meaning that given the same inputs, it will produce the same out put every single time. This means that you cannot make api calls or anything indeterministic in the reducer.

Finally, when the reducer updates the state, any component listening to the redux state will be updated.

In react-redux, we get a pretty awesome function called connect. Connect allows us to easily integrate react components with the redux state. It works as so:

```jsx
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'

const MyButton = ({buttonOn, onclick}) => {
  return (
    <Button
      active={buttonOn}
      onClick={onclick} />
  )
}

const ConnectMyButton = connect(
  (state) => {
    return {
      buttonOn: state.buttonOn
    }
  }, (dispatch) => {
    return {
      onclick: (val) => dispatch({
        type: 'CHANGE_BUTTON_ON',
        data: val
      })
    }
  }
)(MyButton)
```

The connect function provided by react-redux creates a _wrapper component_ that lets you pass in fields from the redux store as properties. It also lets you pass you pass in functions that use the store's dispatch function as props. These two things allow components to be completely integrated with the redux store.

Connect returns a wrapper function. You call it with the component that you want to wrap. In the above example, it is MyButton.

Now, whenever someone updates the buttonOn field or the redux store, redux will automatically update the MyButton component

You will see that most of components in this project follow something along those lines.

## Example

As an example, let's look at how the Buttons in [section/controls/ButtonGroup](https://github.com/teamwaterloop/control-front/blob/master/src/section/controls/ButtonGroup.js)
work.

We'll just be looking at a simplified example of one button.

```jsx
const ButtonGroup = ({ start, changeStart }) => {
  return (
    <div>
      <Row>
        <Col sm={4}>
          <Button
            bsStyle='success'
            bsSize='large'
            block
            // Everything above here is just bootstrap styling
            style={{minHeight: GROUP_ONE_HEIGHT}} // Css styling
            active={start /*= false */} // start is passed into this component as a prop
            onClick={() => changeStart(!start)}// changeStart is also passed in as a prop
            >
            Start
          </Button>
        </Col>
      </Row>
    </div>
  )
}

const ButtonGroupConnected = connect(
  (state) => {
    return {
      start: state.controls.startActual
    }
  },
  (dispatch) => {
    return {
      changeStart: (val) => {
        sendCommand(Commands.START, val)
        dispatch({type: Actions.CHANGE_POD_START, data: val})
      }
    }
  }
)(ButtonGroup)
```

As you can see, the implementation looks exactly like the one above.

The state starts out looking like this (_shortened for simplicity_)

```js
{
  controls: {
    startActual: false
  }
}
```

It's false because that's what the default value is. Defaults can be found in [store/Defaults.js](https://github.com/teamwaterloop/control-front/blob/master/src/store/Defaults.js)

When you press the Button, 2 things happen:

1. Calls sendCommand which uses webSockets to send a message to the pod, in this case "start the pod"
1. Dispatches an event to update state. Note this update updates controls.start not controls.startActual. This dispatch will not affect this component as its properties does not rely on controls.start. _I only implemented this just in case we need to track difference in the button have being pressed and when the pod recieves the command_
1. The pod (_hopefull_) responds with a "pod started command", this message will be passed to the listener [api/Listener.js](https://github.com/teamwaterloop/control-front/blob/master/src/store/Defaults.js). The listener acts as a translater. It translates broacasts from the pod into dispatches for our redux store
1. The Listener dispatches a command
1. The redux store updates
1. Button component is automatically updated

Now the redux store looks like 

```js
{
  controls: {
    startActual: true
  }
}
```

We could technically implement the react-redux connect function ourselves, but it would be a pain in the ass. Additionally, the function makes simple but helpful performance improvements.
