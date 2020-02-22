import React from 'react';
import Spinner from '../Spinner/Spinner';

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
  }



  onPressPreviousButton = () => {
    const { count } = this.state;
    if (count !== 0) {
      this.setState({count: count - 1});
    }
  }
             
  render() {
    const { onGetHistory, name, savedResponse}  = this.props;
    const { count } = this.state;
    return (
      <div>       
        { !Array.isArray(savedResponse)
          ? <div className='justify'>
              <p className='f3 mt4 orange'>Loading Your History <br />Please Wait...</p> 
              <Spinner type={'bubbles'} color={'#68838B'}/> 
            </div>
          : <div className='pv3 pb4 mt4'>
              <div className=''>
                <p onClick={onGetHistory}
                   className='tr b2 link f3 white border-history underline pr3 pointer'>Get Smarter!</p>
                <div>
                  <p className='f4 white'>{`${name}, you have ${savedResponse.length} saved responses to relearn!`}</p>
                  <div className='f2 bold'>
                    { savedResponse.length
                     ? <div className='pt3'>{`${count+1} of ${savedResponse.length}`}
                          <p className='black light f3 pt2'>{savedResponse[count].query}</p>
                       </div>
                     : ''
                    }
                  </div>
                  <div className='fontStyle box white f4'> 
                    <div className='fontStyle pa2'>
                      { savedResponse.length
                        ? <div>
                            <div> {savedResponse[count].response}</div>
                            <div className='ui two buttons buttonStyle pa2 ma3'>
                              <button className= 'ui blue button pa2' onClick={this.onPressPreviousButton}>Previous</button>
                              <button className='ui white button pa2' onClick={this.onPressNextButton}>Next</button>
                            </div>
                          </div>
                        : <div className='f3'>{'No Saved Response to Show!!!'}</div>       
                      }
                    </div>        
                  </div> 
                </div>         
              </div>
            </div>
        }
      </div>
    )
  }
}

export default History;

              