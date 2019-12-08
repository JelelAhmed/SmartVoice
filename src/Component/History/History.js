import React from 'react';

const History = ({onGetHistory, userHistory, name}) => {
    let writtenResponse;
    for (var i = 0; i < userHistory.length; i++) {
    return const {writtenResponse} = (userHistory[i]);
      console.log(writtenResponse);
    }

    return (
	    <div className=''>
        <p onClick={onGetHistory}
           className='tr b2 link f3 white border-history underline pr3 pointer'>Get Smarter!</p>
        <p className='f3 white'>{`${name} Relearn Previous Queries`}</p>
        <p className='f4 white'>{`You have ${userHistory.length} saved responses to Relearn!`}</p>
        <div className='fontStyle box white f4'> 
					<div className='fontStyle pa2'></div>
		   		 <div className='ui two buttons buttonStyle pa2 ma3'>
		   	 		<button className= 'ui blue button pa2'>Previous</button>
		   	 		<button className='ui white button pa2'>Next</button>
		    	</div>
	    	</div>
      </div>
    )
}

export default History;