import React, { Component } from 'react';
import 'tachyons';
import Navigation from './Component/Navigation/Navigation';
import SearchBox from './Component/SearchBox/SearchBox';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/Register/Register';
import SelectCommand from './Component/SelectCommand/SelectCommand';
import VoiceRequest from './VoiceRequest';
import TextRequest from './TextRequest';
import './App.css';




class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      route: 'signin',
      isSignedIn: 'false',
      command: null,
    }
  } 

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({
        isSignedIn: false, 
        command: null
      })
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  onCommandChange = (command) => {
   this.setState({command: command})
  }

  render(){
    const { route, isSignedIn, command} = this.state;
    return (
      <div className='App'>
          <h2 className="coolTitle">SmartVoice</h2>
            <div>
              <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} onCommandChange={this.onCommandChange} command={command} />
              { route === 'home'
                ? (
                   command === null 
                   ? <SelectCommand onCommandChange={this.onCommandChange}/>
                   : (
                      command === 'search'
                      ? <TextRequest />
                      : <VoiceRequest />
                      )
                  )           
                : (
                  this.state.route === 'signin' 
                  ? <SignIn onRouteChange={this.onRouteChange} />
                  : <Register onRouteChange={this.onRouteChange} />
                  )
              }
            </div>
      </div>
      
    );
  }
}

export default App;
