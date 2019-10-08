import React from 'react';
import 'tachyons';
import VoiceRequest from './VoiceRequest';
import TextRequest from './TextRequest';



function App() {
  return (
    <div className="ui center aligned basic segment container">
        <h2 className="ui block basic header">SmartVoice</h2>
          <div>
            <TextRequest />
          </div>
          <div className='ma2'>
           <VoiceRequest />
          </div>
    </div>
  );
}

export default App;
