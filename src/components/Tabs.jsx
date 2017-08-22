import React from 'react'
import { Button } from 'react-bootstrap'

export class TabView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tabNum: 0
    }
  }

  setTab (tabNum) {
    this.setState({
      tabNum: tabNum
    })
  }

  render () {
    let tabs = this.props.tabNames.map((v, i) => {
      return <Button
        key={i}
        bsStyle='info'
        bsSize='sm'
        active={this.state.tabNum === i}
        disabled={false}
        onClick={() => this.setTab(i)}>
        {v}
      </Button>
    })

    let style = Object.assign({}, { display: 'flex', flexDirection: 'row' }, this.props.style)
    return (
      <div style={style} >
        <div style={{ flexDirection: 'column', display: 'flex' }}>
          {tabs}
        </div>
        {React.Children.toArray(this.props.children)[this.state.tabNum]}
      </div >
    )
  }
}
