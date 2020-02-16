import React from 'react';
import './TranscriptUpdate.css';

const TranscriptUpdate = ({transcript}) => {
	return (
	  <div className='fix'>
      <p className='f3'>{transcript}</p>
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