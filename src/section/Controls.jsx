import React from 'react'
import { Row } from 'react-bootstrap'

/** Components */
import Settings from './controls/Settings'

import LevControl from './controls/LevControl'
import MagwheelControl from './controls/MagwheelControl'
import DriveControl from './controls/DriveControl'
import ECControl from './controls/ECControl'

import ECGraphs from './visuals/ECGraphs'

class Control extends React.Component {
  render () {
    return (

      <Row id='control-container'>
        <Settings style={{ gridArea: 'settings', padding: 10 }} />
        <LevControl style={{ gridArea: 'lev-control' }} />
        <ECControl style={{ gridArea: 'ec-control' }} />
        <ECGraphs style={{ gridArea: 'ec-graph' }} />
        <MagwheelControl style={{ gridArea: 'mw-control' }} />
        <DriveControl style={{ gridArea: 'drive-control' }} />
      </Row>
    )
  }
}

export default Control
