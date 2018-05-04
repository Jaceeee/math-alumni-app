import React, { Component } from 'react';
import Feed from './components/feed/Feed';
import Login from './components/Login';


class App extends Component {

  componentWillMount() {
    this.setState({
      displayState: 0
    });
  }
   
  changeDisplayState(stateVal) {    
    this.setState({
      ...this.state,
      displayState: stateVal
    });    
  } 

  render(){
    return (
      <div>
        <LogSwitcher displayState={this.state.displayState}
                     changeDisplayState={this.changeDisplayState.bind(this)}/>
      </div>
    )
   }
}

const LogSwitcher = (props) => {
  switch(props.displayState){
    case 0:
      return(
        <Login changeDisplayState={props.changeDisplayState}/>
      )
    case 1:
    case 2:
    default:
      return(<Feed displayState={props.displayState}
                   changeDisplayState={props.changeDisplayState}/>)

  }
}

export default App;
