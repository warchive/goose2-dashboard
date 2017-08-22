import React from 'react'
import { Row } from 'react-bootstrap'

/** Components */
import Settings from './controls/Settings'

import LevControl from './controls/LevControl'
import MagwheelControl from './controls/MagwheelControl'
import DriveControl from './controls/DriveControl'
import ECControl from './controls/ECControl'

import ECGraphs from './visuals/ECGraphs'
import LevGraphs from './visuals/LevGraphs'
import MWGraphs from './visuals/MagwheelGraphs'
import DriveGraphs from './visuals/DriveGraphs'

class Control extends React.Component {
  render () {
    return (

      <Row id='control-container'>
        <Settings style={{ gridArea: 'settings', padding: 10 }} />
        <LevControl style={{ gridArea: 'lev-control' }} />
        <LevGraphs style={{ gridArea: 'lev-graph' }} />
        <ECControl style={{ gridArea: 'ec-control' }} />
        <ECGraphs style={{ gridArea: 'ec-graph' }} />
        <MagwheelControl style={{ gridArea: 'mw-control' }} />
        <MWGraphs style={{ gridArea: 'mw-graph' }} />
        <DriveControl style={{ gridArea: 'drive-control' }} />
        <DriveGraphs style={{ gridArea: 'drive-graph' }} />
      </Row>
    )
  }
}

export default Control
