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
  constructor () {
    super()
    this.state = {
      val: 0
    }
  }

  onChange (evt) {
    this.setState(Object.assign({},
      this.state, { val: evt }))

    if (this.props.instantChange) {
      this.props.onChange(this.state.val)
    }
  }

  onAfterChange (evt) {
    this.props.onChange(this.state.val)
  }

  onButtonChange (up) {
    let newVal = this.state.val + (up ? 1 : -1)

    if (newVal > this.props.max || newVal < this.props.min) {
      return
    }

    this.setState(Object.assign({}, this.state, { val: newVal }))

    this.props.onChange(newVal)
  }

  // componentWillRecieveProps (nextProps) {
  //   if (nextProps.val !== this.state.val) {
  //     this.setState(Object.assign({}, this.state,
  //       {val: nextProps.val}))
  //   }
  // }

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
                value={this.state.val}
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

              <p> {this.state.val} </p>

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
