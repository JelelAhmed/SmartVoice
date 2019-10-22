import React from 'react';

const ReportCard = ({SpokenResponseLong, CommandKind, WrittenResponse}) => {
	console.log(SpokenResponseLong);
	return (
	  <div className= 'tc bg-light-green dib br2 pa2 ma7 grow bw2 shadow'>
      	<div >
      	  <h2>{CommandKind}</h2>
      	  <h2>{SpokenResponseLong}</h2>
      	  <h2>{WrittenResponse}</h2>
      	</div>
    </div>
  )
}

export default ReportCard;