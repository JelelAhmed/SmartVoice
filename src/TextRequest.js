import React, { Component } from 'react';
import Houndify from 'houndify';
import ResponseCard from './Component/ResponseCard/ResponseCard';
import SearchBox from './Component/SearchBox/SearchBox';
import History from './Component/History/History';
import Rank from './Component/Rank/Rank';

class TextRequest extends Component {

    state = {
        searchfield: '.',
        Response: '',
        AllResults: '',
        userHistory: '',
        history: null
    };

    onChange = (event) => {
        this.setState({ searchfield: event.target.value });
        console.log(this.state.searchfield);
    }

    clearResponse = (clear) => {
      this.setState({ Response: clear});
    }



    onResponse = (response, info) => {
      // this.setState({
      //       Response: response,
      //       AllResults: response.AllResults[0]
      //   });

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
    };

    onGetHistory = (boolean) => {
      const { id } = this.props.user;
      fetch(`http://localhost:3002/history/${id}`, {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
      })
        .then(response => response.json())
        .then(history => {
          this.setState({userHistory: history})
        })
        
      this.setState({history: boolean});
    }

    onSavedResponse =()=> {
      if (this.state.Response !== '') {
        fetch('http://localhost:3002/saveResponse', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.props.user.id,
            writtenResponse: this.state.Response
          })
        })
          .then(response => response.json())
          .then(saved => {
            console.log(saved)
          })
      };
    }


     initTextRequest = () => {
      this.setState({Response: "Thanks to a fellow student, Rodrigo, who pointed out that there are a few changes in the code from the last video. Make sure you take note of these so you don't get an error in your code as you move on to this next part."})
      this.onResponse(this.state.Response, null);
    //     const { searchfield } = this.state;
    //     const textRequest = new Houndify.TextRequest({
    //         // Text query
    //         query: searchfield,

    //         // Your Houndify Client ID



    //         // For testing environment you might want to authenticate on frontend without Node.js server. 
    //         // In that case you may pass in your Houndify Client Key instead of "authURL".
    //         // clientKey: "YOUR_CLIENT_KEY",
    //         clientId: "dZtmNkiCT30LvR6Jj2FCvw==",

    //         // Otherwise you need to create an endpoint on your server
    //         // for handling the authentication.
    //         // See SDK's server-side method HoundifyExpress.createAuthenticationHandler().
    //         // clientKey: "QbRXbiJP9ZSVg13bXa0a3xeD9wz-Tu5ft2afYUYc0zWYHnFlnEW7EFpMWDaFd4Va25mVajfVvjewul_P-7ZoXw==",
    //         authURL: "http://localhost:3002/houndifyAuth",
    //         // Request Info JSON
    //         // See https://houndify.com/reference/RequestInfo
    //         requestInfo: {
    //             UserID: "test_user",
    //             Latitude: 37.388309,
    //             Longitude: -121.973968
    //         },

    //         // Pass the current ConversationState stored from previous queries
    //         // See https://www.houndify.com/docs#conversation-state
    //         conversationState: '',

    //         // for handling the authentication and proxying 
    //         // text search http requests to Houndify backend
            
    //         proxy: {
    //             method: 'POST',
    //             url: "http://localhost:3002/textSearchProxy",
    //             // headers: {}
    //             // ... More proxy options will be added as needed
    //         },

    //         // Response and error handlers
    //         onResponse: this.onResponse,

    //         onError: function(err, info) {
    //             console.log(err);
    //         }
    //     });

    }  

     onSavedResponse =()=> {
      if (this.state.Response !== '') {
        fetch('http://localhost:3002/saveResponse', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.props.user.id,
            writtenResponse: this.state.Response
          })
        })
        .then(response => response.json())
        .then(saved => {
          console.log(saved)
        })
      };
    }


  render() {
    const {user} = this.props;
    const {AllResults, history, Response, userHistory} = this.state;
    return ( 
      <div>
        { history === true
          ? <History onGetHistory={this.onGetHistory} userHistory={userHistory} {...user} />
          : <div>
              <div>
                <p onClick={()=> this.onGetHistory(true)}
                  className='f3 tr pr3 history link dim white underline pointer'>History</p>
        }
                <Rank {...user}/>
              </div>
                <SearchBox onChange={this.onChange} initTextRequest={this.initTextRequest}/>
                <div className=''>
               {  Response === ''
                     ? <div>               
                       </div>
                     : (
                         <ResponseCard {...AllResults} 
                           Response={this.state.Response} 
                           clearResponse={this.clearResponse}
                           onSavedResponse={this.onSavedResponse}
                           />
                        )                  
                }
              </div>
            </div>
        }
      </div>   
    )
  }
}

export default TextRequest