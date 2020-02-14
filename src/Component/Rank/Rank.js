import React from 'react';

const Rank = ({name, legend}) => {
	
  return (
  	<div className='white f3'>
	  	<div className=''>
	  		{`${name}, The number queries you've submitted is...`}
			</div>
			<div className='b f2 mb2'>
	  		{legend}
			</div>
			<div>
				{"Get Smarter. Ask SmartBrain Anything!"}
			</div>
		</div>
  )
}

export default Rank;