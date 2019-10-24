import React from 'react';
import 'tachyons';
import Navigation from './Component/Navigation/Navigation';
import SearchBox from './Component/SearchBox/SearchBox';
import VoiceRequest from './VoiceRequest';
import TextRequest from './TextRequest';




function App() {
  return (
    <div className="ui center aligned basic segment container">
        <h2 className="ui block basic header">SmartVoice</h2>
          <div>
            <Navigation />
            <div className='pa6'>
             <TextRequest />
            </div>
          </div>
    </div>
  );
}

export default App;
