import React from 'react'
import { Button } from 'react-bootstrap'

const Style = {
  tabVert: { display: 'flex', flex: 1, flexDirection: 'column' },
  tabHoriz: { display: 'flex', flex: 1, flexDirection: 'row' },
  tabView: { display: 'flex', flexDirection: 'row' },
  tabColumn: { flexDirection: 'column', display: 'flex' }
}

export const Tab = ({ style, children, horizontal }) =>
  <div style={Object.assign({}, horizontal ? Style.tabHoriz : Style.tabVert, style)}>
    {children}
  </div >

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

    let style = Object.assign({}, Style.tabView, this.props.style)
    return (
      <div style={style} >
        <div style={Style.tabColumn}>
          {tabs}
        </div>
        {React.Children.toArray(this.props.children)[this.state.tabNum]}
      </div >
    )
  }
}
