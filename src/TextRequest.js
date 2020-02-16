import React, { Component } from 'react';
import Houndify from 'houndify';
import ResponseCard from './Component/ResponseCard/ResponseCard';
import SearchBox from './Component/SearchBox/SearchBox';
import History from './Component/History/History';
import Rank from './Component/Rank/Rank';
import Spinner from './Component/Spinner/Spinner';


class TextRequest extends Component {

  state = {
	  searchField: '',
	  Response: '',      
	  savedResponse: [],
	  isSearching: false,
	  isError: false,
	  errorMessage: '',
	  history: null
  };

  onChange = (event) => {
  	this.setState({ searchField: event.target.value })
  }

  clearResponse = (clear) => {
  	this.setState({ Response: clear})
  }

  errorFeedback = (errorMessage) => {
  	return errorMessage;
  }

  onError = (err, info) => {
    this.setState({
      isSearching: false,
      errorMessage: 'Please check your internet connection!',
      isError: true
    })
    console.log(err);
  }

  onResponse = (response, info) => {
    this.setState({
    	Response: response.AllResults[0].WrittenResponseLong,
      isSearching: false
    });

    fetch('http://localhost:3002/queryCount', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.props.user.id
      })
    })
    .then(response => response.json())
    .then(count => {
    	this.props.upDateCount(count);
    })
    .catch(console.log)
  };

	onGetHistory = (boolean) => {
  	const { id } = this.props.user;
    fetch(`http://localhost:3002/history/${id}`, {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(history => {
      this.setState({
      	savedResponse: history
      })
    })
    .catch(console.log)
    this.setState({history: boolean});
  }

	onSavedResponse =()=> {
	  if (this.state.Response !== '') {
	    fetch('http://localhost:3002/saveResponse', {
	      method: 'post',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify({
	        id: this.props.user.id,
	        query: this.state.searchField,
	        writtenResponse: this.state.Response
	      })
	    })
	    .then(response => response.json())
	    .then(saved => {
	    	console.log(saved, 'saved')
	    })
	    .catch(console.log);
	  };
  }


	initTextRequest = () => {
  	const { searchField } = this.state;
    this.setState({
      isSearching: true,
      isError: false
    });
    this.clearResponse('');
    if (searchField !== '') {
    	const textRequest = new Houndify.TextRequest({
      	// Text query
      	query: searchField,
      	 
        // Your Houndify Client ID

        // For testing environment you might want to authenticate on frontend without Node.js server. 
        // In that case you may pass in your Houndify Client Key instead of "authURL".
        // clientKey: "YOUR_CLIENT_KEY",
        clientId: "dZtmNkiCT30LvR6Jj2FCvw==",

        // Otherwise you need to create an endpoint on your server
        // for handling the authentication.
        // See SDK's server-side method HoundifyExpress.createAuthenticationHandler().
        // clientKey: "QbRXbiJP9ZSVg13bXa0a3xeD9wz-Tu5ft2afYUYc0zWYHnFlnEW7EFpMWDaFd4Va25mVajfVvjewul_P-7ZoXw==",
        authURL: "http://localhost:3002/houndifyAuth",
        // Request Info JSON
        // See https://houndify.com/reference/RequestInfo
        requestInfo: {
          UserID: "test_user",
          Latitude: 37.388309,
          Longitude: -121.973968,
        },

        // Pass the current ConversationState stored from previous queries
        // See https://www.houndify.com/docs#conversation-state

        // for handling the authentication and proxying 
        // text search http requests to Houndify backend
          
        proxy: {
          method: 'POST',
          url: "http://localhost:3002/textSearchProxy",
          // headers: {}
          // ... More proxy options will be added as needed
        },

        // Response and error handlers
        onResponse: this.onResponse,

        onError: this.onError,
      });
    } else {
        this.setState({
          isError: true,
          errorMessage: 'Search Box Cannot be empty'
        })
      }
  }  



  render() {
    const { user } = this.props;
    const { history, Response, savedResponse, searchField, isSearching, isError, errorMessage } = this.state;
    return ( 
      <div>
        { history === true
          ? <History onGetHistory={()=>this.onGetHistory()}  
                     {...user} 
                     savedResponse={savedResponse}
                     searchField={searchField} />
          : <div>
              <div>
                <p onClick={()=> this.onGetHistory(true)}
                  className='f3 tr pr3 history link dim white underline pointer'>History</p>
                <Rank {...user}/>
              </div>
                <SearchBox onChange={this.onChange} initTextRequest={this.initTextRequest}/>
                <div className=''>
               { isError === false
                  ? (  Response === ''
                       ? ( <div> 
                              { isSearching === true
                                ? <div className='tc'> 
                                   <Spinner type={'bubbles'} color={'#131313'}/>             
                                  </div>
                                : <div></div>
                              }
                            </div>
                          )
                       : (
                           <ResponseCard
                             Response={this.state.Response} 
                             clearResponse={this.clearResponse}
                             onSavedResponse={this.onSavedResponse}
                             />
                          ) 
                    )
                  : <div className='mt4 pa3'>
                     <p className='f4 tc white'>Ooops!!! Something went wrong.<br />
                       {this.errorFeedback(errorMessage)}
                     </p>
                    </div>                 
                }
              </div>
            </div>
        }
      </div>   
    )
  }
}

export default TextRequest;