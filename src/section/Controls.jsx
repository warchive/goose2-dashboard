import React from 'react'
import { Row, Col } from 'react-bootstrap'

/** Components */
import ButtonGroup from './controls/ButtonGroup'
import SliderGroup from './controls/SliderGroup'
import Settings from './controls/Settings'

class Control extends React.Component {
  render () {
    return (
      <Row>
        <Col sm={2}>
          <Settings />
        </Col>
        <Col sm={6} style={{display: 'flex'}}>
          <SliderGroup />
        </Col>
        <Col sm={4}>
          <ButtonGroup />
        </Col>
      </Row>
    )
  }
}

export default Control
