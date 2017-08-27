/** React */
import React from 'react'
import ReactDom from 'react-dom'

/** Redux */
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Reducer from './store/Reducer'
import { reduxBatch } from '@manaflair/redux-batch'
import * as Actions from './store/Actions'

/** Bootstrap */
import { Grid, Row, Col } from 'react-bootstrap'

/** Other components */
import Control from './section/Controls'
import TopBar from './section/TopBar'
import Dashboard from './section/Dashboard'

import { connect as WSConnect } from './api/api'
import * as Listeners from './api/CompletePacketListener.js'

class App extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return (
      <Grid fluid>
        <TopBar />
        <Dashboard />
        <Row>
          <Col md={12}>
            <Control />
          </Col>
        </Row>
      </Grid>
    )
  }
}

let store

if (DEBUG) {   // eslint-disable-line
  store = createStore(
    Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
    reduxBatch)
} else {
  store = createStore(Reducer, reduxBatch)
}

let ConnectedListeners = {
  sensor: Listeners.SensorListener(store.dispatch),
  state: Listeners.StateListener(store.dispatch),
  message: Listeners.MessageListener(store.dispatch)
}

WSConnect(
  ConnectedListeners,
  () => {
    store.dispatch({
      type: Actions.UPDATE_CONNECTION_STATE,
      data: true
    })
  },
  (error) => {
    console.error(error)
  },
  () => {
    store.dispatch({
      type: Actions.UPDATE_CONNECTION_STATE,
      data: false
    })
  }
)

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
