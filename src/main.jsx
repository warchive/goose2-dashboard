/** React */
import React from 'react'
import ReactDom from 'react-dom'

/** Redux */
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Reducer from './store/Reducer'
import * as Actions from './store/Actions'

/** Bootstrap */
import { Grid, Row, Col } from 'react-bootstrap'

/** Other components */
import Control from './section/Controls'
import Network from './section/Network'
import Dashboard from './section/Dashboard'

import { connect as WSConnect } from './api/api'
import {BroadcastListener} from './api/Listener.js'

class App extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  
  render () {
    return (
      <Grid fluid>
        <Network />
        <Dashboard />
        <hr />
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
    window.__REDUX_DEVTOOLS_EXTENSION__())
} else {
  store = createStore(Reducer)
}

const broadcastListener = BroadcastListener(store.dispatch)

WSConnect(() => {
  console.log('connected')
  store.dispatch({
    type: Actions.UPDATE_CONNECTION_STATE,
    data: true
  })
},
  broadcastListener
  , (error) => {
    console.error(error)
  }, () => {
    store.dispatch({
      type: Actions.UPDATE_CONNECTION_STATE,
      data: false
    })
  })

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
