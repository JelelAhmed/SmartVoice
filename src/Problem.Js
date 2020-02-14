<html>
  <head>
    <script src="https://unpkg.com/houndify@3.0.3/dist/houndify.js"></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.min.css"
    />
  </head>

  <body>
    <div class="ui center aligned basic segment container">
      <h2 class="ui block basic header">Houndify JavaScript SDK Demo</h2>
      <form id="form" class="ui form" action="javascript:void(0);">
        <div class="ui action big labeled fluid input field">
          <div class="ui icon basic label button" onclick="onMicrophoneClick()">
            <i id="voiceIcon" class="unmute big icon"></i>
          </div>
          <input
            id="query"
            type="text"
            placeholder="Click on a microphone icon or type in your query"
          />
          <button
            id="textSearchButton"
            class="ui icon button"
            onclick="initTextRequest()"
          >
            <i class="search big icon"></i>
          </button>
        </div>

        <div class="ui field">
          <label class="ui label" for="file"
            >Or upload a recorded voice query from a file</label
          >
          <input type="file" id="file" name="file" onchange="onFileUpload()" />
        </div>

        <div id="status" class="ui info message">
          Click on microphone icon or type in the text query.
        </div>

        <div class="ui field" hidden>
          <label>Response object</label>
          <textarea id="responseJSON"></textarea>
        </div>
        <div class="ui field" hidden>
          <label>Search info object</label>
          <textarea id="infoJSON"></textarea>
        </div>
      </form>
    </div>

    <script>


      var clientID = "70AE-xXolrShZks34yuc5g==";
      var conversationState = null;
      var voiceRequest = null;

      var recorder = new Houndify.AudioRecorder();
      recorder.on("start", function() {
        //Initialize VoiceRequest
        voiceRequest = initVoiceRequest(recorder.sampleRate);
        document.getElementById("voiceIcon").className =
      });

      recorder.on("data", function(data) {
        voiceRequest.write(data);
      });

      recorder.on("end", function() {
        voiceRequest.end();
      });

      recorder.on("error", function(error) {
        voiceRequest.abort();
      });

      

      function initVoiceRequest(sampleRate) {

        var voiceRequest = new Houndify.VoiceRequest({
          //Your Houndify Client ID
          clientId: clientID,

          authURL: "/houndifyAuth",
          requestInfo: {
            UserID: "test_user",
            Latitude: 37.388309,
            Longitude: -121.973968,
          },
          conversationState,

          //Sample rate of input audio
          sampleRate,

          //Enable Voice Activity Detection
          //Default: true
          enableVAD: true,

          //Partial transcript, response and error handlers
          onTranscriptionUpdate: onTranscriptionUpdate,
          onResponse: function(response, info) {
            recorder.stop();
            onResponse(response, info);
          },
          onError: function(err, info) {
            recorder.stop();
            onError(err, info);
          },
        });

        return voiceRequest;
      }

      function onMicrophoneClick() {
        if (recorder && recorder.isRecording()) {
          recorder.stop();
          return;
        }

        recorder.start();


      

      //Fires after server responds with Response JSON
      //Info object contains useful information about the completed request
      //See https://houndify.com/reference/HoundServer
      function onResponse(response, info) {
        if (response.AllResults && response.AllResults.length) {
          //Pick and store appropriate ConversationState from the results.
          //This example takes the default one from the first result.
          conversationState = response.AllResults[0].ConversationState;
        }

      }

      //Fires if error occurs during the request
      function onError(err, info) {

      }

      function onTranscriptionUpdate(transcript) {
        transcriptElt.value = transcript.PartialTranscript;
      }
    </script>
  </body>
</html>
