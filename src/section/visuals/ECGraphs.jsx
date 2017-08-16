import React from 'react'
import { connect } from 'react-redux'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import { Button } from 'react-bootstrap'

const SparkLineProps = {
  limit: 20,
  width: 150,
  height: 100,
  margin: 2,
  style: { flexGrow: 0, flexShrink: 0, width: 150, height: 100 }
}

let tabNum = 0

class ECGraphs extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
      tabNum: 0
    }
    this.setTab = this.setTab.bind(this)
  }

  setTab(tabNum) {
  	this.setState({
  		tabNum: tabNum
  	})
  }

	render() {
		let ecHistory = [
			[0, 1, 2, 4, 9, 16, 25, 36, 49, 64, 81, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
			[5, 3, 1, 0, 5, 26, 37, 92, 18, 16, 12, 75, 46, 13, 13, 166, 15, 15, 55, 10, 80],
			[0, 21, 22, 24, 29, 36, 45, 56, 69, 84, 101, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30]
		]
		return (
			<div style={this.props.style}>
				<div style={{float: 'left'}}>
					<Button
						bsStyle='info'
						bsSize='sm'
						active={this.state.tabNum === 0}
						disabled={false}
						onClick={() => this.setTab(0)}>
					Tab0
					</Button>
					<Button
						bsStyle='info'
						bsSize='sm'
						active={this.state.tabNum === 1}
						disabled={false}
						onClick={() => this.setTab(1)}>
					Tab1
					</Button>
					<Button
						bsStyle='info'
						bsSize='sm'
						active={this.state.tabNum === 2}
						disabled={false}
						onClick={() => this.setTab(2)}>
					Tab2
					</Button>
				</div>
				<Sparklines data={ecHistory[this.state.tabNum]} {...SparkLineProps} style={{float: 'right'}}>
					<SparklinesLine color='red' />
				</Sparklines>
			</div>
		)
	} 
}

export default ECGraphs