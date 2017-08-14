import React from 'react'
import { Row } from 'react-bootstrap'

/** Components */
import Settings from './controls/Settings'

import LevControl from './controls/LevControl'
import MagwheelControl from './controls/MagwheelControl'

class Control extends React.Component {
  render () {
    return (

      <Row id='control-container'>
        <Settings style={{ gridArea: 'settings', padding: 10 }} />
        <LevControl style={{ gridArea: 'lev-control' }} />
        <LevControl style={{ gridArea: 'ec-control' }} />
        <MagwheelControl style={{ gridArea: 'mw-control' }} />
        <LevControl style={{ gridArea: 'drive-control' }} />
      </Row>
    )
  }
}

export default Control
