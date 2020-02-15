import React, { Component } from 'react';
import 'tachyons';
import Navigation from './Component/Navigation/Navigation';
import SearchBox from './Component/SearchBox/SearchBox';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/Register/Register';
import SelectCommand from './Component/SelectCommand/SelectCommand';
import VoiceRequest from './VoiceRequest';
import TextRequest from './TextRequest';
import Particles from 'react-particles-js';
import './App.css';

const particleOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 800
      }
    },
    shape: {
      stroke: {
        width: 2
      }
    }   
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      route: 'signin',
      isSignedIn: 'false',
      command: null,
      user: {
        id: '',
        name: '',
        email: '',
        legend: 0,
        history: [],
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      history: data.history,
      legend: data.entries,
      joined: data.joined
    }})
  }

  upDateCount = (count) => {
    this.setState(Object.assign(this.state.user, {
      legend: count
    }))
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
        <Particles className='particles' params={particleOptions} />
          <h2 className="coolTitle">SmartVoice</h2>
            <div>
              <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} onCommandChange={this.onCommandChange} command={command} />
              { route === 'home'
                ? (
                   command === null 
                   ? <SelectCommand name={this.state.user.name} onCommandChange={this.onCommandChange}/>
                   : (
                      command === 'search'
                      ? <TextRequest user={this.state.user} upDateCount={this.upDateCount}/>
                      : <VoiceRequest />
                      )
                  )           
                : (
                  this.state.route === 'signin' 
                  ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                  : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                  )
              }
            </div>
      </div>
      
    );
  }
}

export default App;
