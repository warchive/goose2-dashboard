import React from 'react'
import { connect } from 'react-redux'

const styles = {
  container: {
    overflow: 'scroll',
    backgroundcolor: 'white',
    fontFamily: 'mono'
  },
  date: {
    color: 'gray'
  }
}
class MessageDisplay extends React.Component {
  render () {
    return (
      <div
        className='container-fluid'
        style={Object.assign({}, styles.container, { height: this.props.height })}>
        {
          this.props.messages.map(v => {
            return (
              <p key={v[0]}>
                <span style={styles.date}>{v[1]}</span>:
                {
                  v[2]
                }
              </p>
            )
          }).reverse()
        }
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      messages: state.podData.messages
    }
  }
)(MessageDisplay)
