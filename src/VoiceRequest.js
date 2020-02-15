import React, { Component } from 'react';
import Houndify from 'houndify';
import ResponseVoice from './Component/ResponseVoice/ResponseVoice';
import TranscriptUpdate from './Component/TranscriptUpdate/TranscriptUpdate';
import Spinner from './Component/Spinner/Spinner';
import MicIcon from './Component/MicIcon/MicIcon';


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
        transcript: '',
        isRecording: false,
        isError: false
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
              Longitude: -121.973968,
          },

          conversationState,

          // Sample rate of input audio
          sampleRate: sampleRate,

          // Enable Voice Activity Detection, default: true
          enableVAD: true,

          // Partial transcript, response and error handlers
          // Partial transcript, response and error handlers
          onTranscriptionUpdate:  (transcript) => {
            transcript = transcript.PartialTranscript;
            this.setState({transcript:transcript})
            console.log(transcript)
          },

          onResponse: (response, info) => {
              recorder.stop();
              this.setState({
                Response: response.AllResults[0].WrittenResponseLong,
                AllResults: response.AllResults[0]
              });
              onResponse(response, info);             
          },

          onError: (err, info) => {
              recorder.stop();
              this.setState({
                isRecording: false,
                isError: true
              });
              onError(err, info);
          }
      });

      return voiceRequest;
    }
}

clearState = () => {
  this.setState({
    transcript: '',
    AllResults: ''
  })
}

onMicroClick = () => {
  if (recorder && recorder.isRecording()) {      
      recorder.stop();
      this.setState({isRecording: false})
      return;
  }
  this.clearState();
  this.setState({
    isRecording: true,
    isError: false
  });
  recorder.start();
}

  render() {
    console.log(this.state.Response);
    const {AllResults, transcript, isRecording, isError} = this.state;
    return (
      <div className="tc">
        <div className='pa3 pointer dim grow' onClick={()=> this.onMicroClick()}>
           <MicIcon />
        </div>
        { isError === false
          ? ( <div>
                { transcript === ''
                  ? <div></div>
                  : <TranscriptUpdate transcript={transcript} />}        
                <div className='mt4'>
                  { isRecording === true
                    ? ( AllResults === ''
                        ? <Spinner type={'bubbles'} color={'grey'} height={'10%'} width={'10%'}/>
                        : <ResponseVoice {...AllResults} Response={this.state.Response}/>    
                      )
                    : <div className='f2'>Click on the microphone to begin recording</div>
                  }
               </div>
               </div>
              )
          : <div className='f2 white pa4'>
              <p className='f1'>Ooops!!! <br />...Something Went Wrong.</p> 
              <p>please, check you internet connection and try again!</p>
            </div>
        }
      </div>
    )
  }
}

export default VoiceRequest;
 
