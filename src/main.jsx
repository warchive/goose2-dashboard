/** React */
import React from 'react'
import ReactDom from 'react-dom'

/** Redux */
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Reducer from './store/Reducer'
import * as Actions from './store/Actions'

/** Bootstrap */
import { Grid } from 'react-bootstrap'

/** Other components */
import Control from './section/Controls'

import { connect as WSConnect } from './api/api'

class App extends React.Component {
  render () {
    return (
      <Grid fluid>
        <Control />
      </Grid>
    )
  }
}

const store = createStore(Reducer, DEBUG ?  //eslint-disable-line
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__() : null)

WSConnect(() => {
  store.dispatch({
    type: Actions.UPDATE_CONNECTION_STATE,
    data: true
  })
  console.log('connected')
},
  (message) => {
    console.log(message)
  }, (error) => {
    console.error(error)
  }, () => {
    store.dispatch({
      type: Actions.UPDATE_CONNECTION_STATE,
      data: false
    })
    console.log('disconnected')
  })

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
