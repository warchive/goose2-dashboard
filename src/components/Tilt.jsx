import React from 'react'
import { roundValue } from '../../config'

const Tilt = ({ min, max, value, label }) => {
  let roundedValue = roundValue(value)

  return (
    <div style={{ padding: 20 }}>
      <h6 style={{ textAlign: 'center' }}>{`${label}: ${roundedValue} deg`} </h6>
      <div style={{ width: 100, height: 100, backgroundColor: 'black', borderRadius: 50, margin: 'auto' }}>
        <div style={{ margin: '1px 0px 0px 1px', width: 98, height: 49, backgroundColor: 'white', borderRadius: '50px 50px 0px 0px', transform: `rotate(${(roundedValue / (max - min)) * 180}deg)`, transformOrigin: '50% 100%' }} />
      </div>
    </div>
  )
}

export default Tilt
