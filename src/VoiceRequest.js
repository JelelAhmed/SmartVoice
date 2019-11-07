import React, { Component } from 'react';
import Houndify from 'houndify';
import ResponseCard from './Component/ResponseCard/ResponseCard';

let voiceRequest;
let conversationState;

const recorder = new Houndify.AudioRecorder();

recorder.on('data', (data) => {
    voiceRequest.write(data);
});

recorder.on('end', () => {
    voiceRequest.end();
});

recorder.on('error', (error) => {
    voiceRequest.abort();
});

const onError = (err, info) => {
    console.log(err);
}

const onTranscriptionUpdate  = (transcript) => {
  transcript = transcript.PartialTranscript;
  console.log(transcript)
}

const onResponse = (response, info) => {
  if (response.AllResults && response.AllResults.length) {
      //Pick and store appropriate ConversationState from the results. 
      //This example takes the default one from the first result.
      conversationState = response.AllResults[0].ConversationState;
  }
}



class VoiceRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
        Response: '',
        AllResults: '',
    };

    recorder.on('start', () => {
     voiceRequest = initVoiceRequest(recorder.sampleRate);
    });

    const initVoiceRequest = (sampleRate) => {

      var voiceRequest = new Houndify.VoiceRequest({
          // Houndify Client ID
          clientId: "dZtmNkiCT30LvR6Jj2FCvw==",

          // server endpoint for handling the authentication.
          authURL: "http://localhost:3002/houndifyAuth",

          // Request Info JSON
          // See https://houndify.com/reference/RequestInfo
          requestInfo: {
              UserID: "test_user",
              Latitude: 37.388309,
              Longitude: -121.973968
          },

          // Sample rate of input audio
          sampleRate: 16000,

          // Enable Voice Activity Detection, default: true
          enableVAD: true,

          // Partial transcript, response and error handlers
          // Partial transcript, response and error handlers
          onTranscriptionUpdate: onTranscriptionUpdate,

          onResponse: (response, info) => {
              recorder.stop();
              this.setState({
                Response: response,
                AllResults: response.AllResults[0]
              })
              onResponse(response, info);             
          },
          onError: (err, info) => {
              recorder.stop();
              onError(err, info);
          }
      });

      return voiceRequest;
    }
}
    
onMicroClick = () => {

  if (recorder && recorder.isRecording()) {
      recorder.stop();
      return;
  }

  recorder.start();
}

  render() {
    console.log(this.state.Response);
    const {AllResults} = this.state;
    return (
      <div>
        <div className="ui icon basic label button">
          <i id="voiceIcon" 
             className="unmute big icon" 
             onClick={()=>this.onMicroClick()}>
          </i>
        </div>
        <div className='mt5'>
        {AllResults === ''
          ? <div></div>
          : ( AllResults !== '',
              <ResponseCard {...AllResults} Response={this.state.Response}/>
            )
         }
       </div>
      </div>
    )
  }
}

export default VoiceRequest;