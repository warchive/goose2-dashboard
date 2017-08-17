import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'

const SparkLineProps = {
  limit: 20,
  width: 150,
  height: 100,
  margin: 2,
  style: { flexGrow: 0, flexShrink: 0, width: 150, height: 100 }
}

class ECGraphs extends React.Component {
	render() {
		let ecHistory = [0, 1, 2, 4, 9, 16, 25, 36, 49, 64, 81, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
		return (
			<Sparklines data={ecHistory} {...SparkLineProps}>
				<SparklinesLine color='red' />
			</Sparklines>
		)
	} 
}

export default ECGraphs