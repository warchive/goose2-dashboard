/** React */
import React from 'react';
import ReactDom from 'react-dom';

/** Redux */
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducer from './store/Reducer';

/** Bootstrap */
import { Grid, Row, Col } from 'react-bootstrap';

/** Other components */
import Control from './section/Controls';

class App extends React.Component {
  constructor(props) {
    super();

    console.log(props);
  }

  render() {
    return (
      <Grid fluid>
        <Control />
      </Grid>
    )
  }
}

const store = createStore(Reducer, DEBUG ?
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__() : null);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
