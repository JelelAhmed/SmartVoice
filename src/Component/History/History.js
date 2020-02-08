import React from 'react';

class History extends React.Component {

  state = {
    count: 0
  }
  
  onPressNextButton = () => {  
    const { savedResponse } = this.props;
    const { count } = this.state;
      if (savedResponse.length === (count + 1)) {
        this.setState({count: 0});
      } else if (savedResponse.length > count) {
          this.setState({count: count +  1});
        } 
      console.log(count);         
    }



  onPressPreviousButton = () => {
    const { savedResponse } = this.props;
    const { count } = this.state;
    if (count !== 0) {
      this.setState({count: count - 1});
      console.log(count)
    }
  }


render() {
  const { onGetHistory, name, savedResponse }  = this.props;
  const { count } = this.state;
  console.log(savedResponse.length, 'history')
  return (
    <div className=''>
      <p onClick={onGetHistory}
         className='tr b2 link f3 white border-history underline pr3 pointer'>Get Smarter!</p>
      <p className='f3 white'>{`${name} Relearn Previous Queries`}</p>
      <p className='f4 white'>{`You have ${savedResponse.length} saved responses to Relearn!`}</p>
      <div className='f2 bold'>
        { savedResponse.length
         ? `${count+1} of ${savedResponse.length}`
         : ''
        }
      </div>
      <div className='fontStyle box white f4'> 
				<div className='fontStyle pa2'>
          { savedResponse.length
            ?  <div> {savedResponse[count].response}</div>
            : 'No Saved Response to Show!!!'          
          }
        </div>
	   		<div className='ui two buttons buttonStyle pa2 ma3'>
	   	 		<button className= 'ui blue button pa2' onClick={this.onPressPreviousButton}>Previous</button>
	   	 		<button className='ui white button pa2' onClick={this.onPressNextButton}>Next</button>
	    	</div>
    	</div>
    </div>
  )
}
}


export default History;