import React, { Component } from 'react';
import Houndify from 'houndify'; 


let voiceRequest;
let conversationState;

const recorder = new Houndify.AudioRecorder();
recorder.on('start', () => {
    voiceRequest = initVoiceRequest(recorder.sampleRate);
});

recorder.on('data', (data) => {
    voiceRequest.write(data);
});

recorder.on('end', () => {
    voiceRequest.end();
});

recorder.on('error', (error) => {
    voiceRequest.abort();
});

function onError(err, info) {
    console.log(err);
}

function onTranscriptionUpdate(transcript) {
    transcript = transcript.PartialTranscript;
    console.log(transcript)
}

function onResponse(response, info) {
    if (response.AllResults && response.AllResults.length) {
        //Pick and store appropriate ConversationState from the results. 
        //This example takes the default one from the first result.
        conversationState = response.AllResults[0].ConversationState;
    }   
}

const initVoiceRequest = (sampleRate) => {

    var voiceRequest = new Houndify.VoiceRequest({
        // Houndify Client ID
        clientId: "GDphGQ3HonLiBJlAK_bKZg==",


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

        onResponse: function(response, info) {
            recorder.stop();
            onResponse(response, info);
            // 
        },
        onError: function(err, info) {
            recorder.stop();
            onError(err, info);
        }
    });

    return voiceRequest;
}

class VoiceRequest extends Component {

    onMicroClick = () => {

        if (recorder && recorder.isRecording()) {
            recorder.stop();
            return;
        }

        recorder.start();
    }


    render() {
        return (
            <div className="ui icon basic label button">
                <i id="voiceIcon" 
                   className="unmute big icon" 
                   onClick={()=>this.onMicroClick()}>
                </i>
            </div>
        )
    }
}

export default VoiceRequest;