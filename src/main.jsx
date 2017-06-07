import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  constructor(){
    super();
  }

  render(){
    return (
      <div>heyhere</div>
    )
  }
}


ReactDom.render(
  <App/>,
  document.getElementById('root')
)
