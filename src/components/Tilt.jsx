import React from 'react'
import {connect} from 'react-redux'

class Tilt extends React.Component {
  constructor (props) {
    super(props)
    this.value = props.default || 0
    let hash = Math.random().toString(26).substring(0, 5)
    this.id = `tilt-${props.title}-${hash}`
  }

  render () {
    return (
      <div style={{width: 100, height: 100, backgroundColor: 'black', borderRadius: 50}}>
        <div style={{margin: '1px 0px 0px 1px', width: 98, height: 49, backgroundColor: 'white', borderRadius: '49px 49px 0px 0px', transform: `rotate(${this.props.tilt * 1.8 - 90}deg)`, transformOrigin: '50% 100%'}} />
      </div>
    )
  }
}

let connected = connect(
  (state) => {
    return {
      tilt: state.controls.acceleration
    }
  }
)(Tilt)

export default connected
