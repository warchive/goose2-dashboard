import React from 'react'
import { Button } from 'react-bootstrap'

class Tabs extends React.Component {
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
  	let buttons = [...React.Children.toArray(this.props.children).keys()].map((index) => {
  		return (
	  		<div>
	  			<Button
					bsStyle='info'
					bsSize='sm'
					active={this.state.tabNum === index}
					disabled={false}
					onClick={() => this.setTab(index)}>
						Tab {index}
					</Button>
					<br />
				</div>
			)
  	})

  	return (
	  	<div style={this.props.style}>
	  		<div style={{float: 'left'}}>
	  			{buttons}
	  		</div>
	  		<div style={{float: 'right'}}>
	  			{React.Children.toArray(this.props.children)[this.state.tabNum]}
	  		</div>
	  	</div>
	  )
  }
}

export default Tabs