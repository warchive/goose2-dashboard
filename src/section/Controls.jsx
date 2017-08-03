import React from 'react'
import { Row, Col } from 'react-bootstrap'

/** Components */
import ButtonGroup from './controls/ButtonGroup'
import SliderGroup from './controls/SliderGroup'
import MessageDisplay from '../components/MessageDisplay'
import Settings from './controls/Settings'

class Control extends React.Component {
  render () {
    return (
      <Row style={{display: 'flex'}}>
        <Col sm={2}>
          <Settings />
        </Col>
        <Col sm={3} style={{display: 'flex'}}>
          <SliderGroup />
        </Col>
        <Col sm={4}>
          <ButtonGroup />
        </Col>
        <Col sm={3} style={{flex: 1}}>
          <MessageDisplay />
        </Col>
      </Row>
    )
  }
}

export default Control
