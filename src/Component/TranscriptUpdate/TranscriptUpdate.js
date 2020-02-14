import React from 'react';

const TranscriptUpdate = ({transcript}) => {
	return (
		<div className="mw7 content center mt5">
      <div className="ui black fluid card ma2">
        <div className="content black"><div className="black">{transcript}</div></div>
      </div>
    </div>
	)
}

export default TranscriptUpdate;