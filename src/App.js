import React from 'react';
import Recorder from './VoiceRequest';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="ui center aligned basic segment container">
        <h2 className="ui block basic header">SmartBrain</h2>
          <div>
           <Recorder />
          </div>
    </div>
  );
}

export default App;
