import React from 'react';

const TranscriptUpdate = ({transcript}) => {

	return (
	  <div className= 'tc bg-light-green fontStyle white dib br2 pa2 bw2 shadow'>
      	  <h2>{transcript}</h2>
    </div>
  )


	// return (
	// 	<div className="mw7 content center mt4">
 //      <div className="ui black fluid card ma2 shadow-5">
 //        <div className="black f4 pa2">{transcript}</div>
 //      </div>
 //    </div>
	// )
}

export default TranscriptUpdate;