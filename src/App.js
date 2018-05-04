import React, { Component } from 'react';
import Feed from './components/feed/Feed';
import Login from './components/Login';


class App extends Component {
  constructor() {
    super();
    this.state = {      
      displayState: 0
    }
  }  
  componentWillMount() {
    this.setState({
      displayState: 2
    });
  }  

  changeDisplayState(stateVal) {    
    this.setState({
      ...this.state,
      displayState: stateVal
    });    
  } 

  setCurrentUser(userId) {
    alert(userId);
    this.setState({
      ...this.state,
      currentUserId: userId
    });
  }

  render(){    
    return (
      <div>
        <LogSwitcher displayState={this.state.displayState}
                     changeDisplayState={this.changeDisplayState.bind(this)}
                     currentUserId={this.state.currentUserId}
                     setCurrentUser={this.setCurrentUser.bind(this)}/>
      </div>
    )
   }
}

const LogSwitcher = (props) => {
  switch(props.displayState){
    case 0:
      return(
        <Login changeDisplayState={props.changeDisplayState}
               setCurrentUser={props.setCurrentUser}/>
      )
    case 1:
    case 2:
    default:
      return(<Feed displayState={props.displayState}
                   changeDisplayState={props.changeDisplayState}
                   currentUserId={props.currentUserId}/>)

  }
}

export default App;
