import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Slider from 'rc-slider/lib/Slider'

import 'rc-slider/assets/index.css'

const styles = {
  handleStyle: {
    width: '100px',
    transform: 'translateX(-50px) translateY(20px)',
    height: '40px',
    borderRadius: '0',
    margin: 0
  },
  sliderStyle: {
    marginTop: 20,
    marginBottom: 20,
    marginRight: 50,
    marginleft: 50,
    minHeight: 200
  }
}

class Slide extends React.Component {
  onChange (evt) {
    if (this.props.instantChange) {
      this.props.onChange(evt)
    } else {
      this.props.updateControlState(evt)
    }
  }

  onAfterChange (evt) {
    this.props.onChange(evt)
  }

  onButtonChange (up) {
    let newVal = this.props.val + (up ? 1 : -1)

    if (newVal > this.props.max || newVal < this.props.min) {
      return
    }

    this.props.onChange(newVal)
  }

  shouldComponentUpdate (nextProps) {
    return (
      nextProps.val !== this.props.val ||
      nextProps.disabled !== this.props.disabled
    )
  }

  render () {
    return (
      <div>
        <Row><p className='text-center' >{this.props.title}</p></Row>
        <Row>
          <Col sm={5}>
            <div className='slider-container'>

              <Slider vertical included
                style={styles.sliderStyle}
                onChange={(evt) => this.onChange(evt)}
                onAfterChange={(evt) => this.onAfterChange(evt)}
                min={this.props.min}
                max={this.props.max}
                default={this.props.defaultVal}
                value={this.props.val}
                handleStyle={[styles.handleStyle]}
                disabled={this.props.disabled} />
            </div>
          </Col>
          <Col style={{ alignItems: 'center', display: 'flex' }}>
            <div className='slider-container'>
              <Button bsStyle='info' bsSize='small' block
                onClick={() => this.onButtonChange(true)}
                disabled={this.props.disabled}>
                Up</Button>

              <p> {Math.round(this.props.val * 10) / 10} </p>

              <Button bsStyle='info' bsSize='small' block
                onClick={() => this.onButtonChange(false)}
                disabled={this.props.disabled}>
                Down</Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Slide
