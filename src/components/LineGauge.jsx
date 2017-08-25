import React from 'react'
import { Line } from 'react-progressbar.js'
import { roundValue } from '../../config'

const options = {
  strokeWidth: 4,
  color: '#ED6A5A',
  trailColor: '#eee',
  trailWidth: 1,
  duration: 10,
  from: { color: '#ED6A5A' },
  to: { color: '#FFEA82' }
}

export default ({ min, max, label, unit, value, width }) => {
  value = value || 0
  return (
    <Line
      progress={value / (max - min)}
      text={`${label}:<br/> ${roundValue(value)} ${unit}`}
      options={options}
      containerStyle={{
        width,
        height: 30 + options.strokeWidth
      }} />
  )
}
