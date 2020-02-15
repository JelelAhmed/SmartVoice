import React from 'react'
import './ResponseVoice.css';

const ResponseVoice = ({Response}) => {
 
	return ( 
		<div className='fontStyle box white f4'> 
			<div className='fontStyle pa2'>{Response}</div>
  	</div>
	)
}

export default ResponseVoice;