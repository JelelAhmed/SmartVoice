import React, { Component } from 'react';
import 'tachyons';
import Navigation from './Component/Navigation/Navigation';
import SearchBox from './Component/SearchBox/SearchBox';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/Register/Register';
import VoiceRequest from './VoiceRequest';
import TextRequest from './TextRequest';
import './App.css';




class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      route: 'signin',
      isSignedIn: 'false'
    }
  } 

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    const { route, isSignedIn } = this.state;
    return (
      <div>
          <h2 className="coolTitle">SmartVoice</h2>
            <div>
              <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
              { route === 'home'
                ? <TextRequest />               
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
