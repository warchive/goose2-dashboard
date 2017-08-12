import React from 'react'
import { SemiCircle } from 'react-progressbar.js'

const options = {
  strokeWidth: 6,
  color: '#ED6A5A',
  trailColor: '#eee',
  trailWidth: 1,
  duration: 10,
  from: { color: '#ED6A5A' },
  to: { color: '#FFEA82' }
}

export default ({ min, max, label, unit, value, width }) => {
  return (
    <SemiCircle
      progress={value / (max - min)}
      text={`${label}:<br/> ${value} ${unit}`}
      options={options}
      containerStyle={{
        width,
        height: width / 2
      }} />
  )
}
