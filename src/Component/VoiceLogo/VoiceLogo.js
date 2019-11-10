import React from 'react';
import Tilt from 'react-tilt'
import voice from './voice.png';

const VoiceLogo = () => {
    return (
    <div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 30 }} style={{ height: 150, width: 150 }} >
			 <div className="Tilt-inner pa3"><img style={{paddingTop: '27px'}} alt='Text' src={voice}/></div>
			</Tilt>
		</div>
    )
}

export default VoiceLogo;