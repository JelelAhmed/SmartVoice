import React, { Component } from 'react';
import Houndify from 'houndify';
import ResponseCard from './Component/ResponseCard/ResponseCard';
import SearchBox from './Component/SearchBox/SearchBox';

class TextRequest extends Component {


    state = {
        searchfield: '.',
        Response: '',
        AllResults: '',
    };

    onChange = (event) => {
        this.setState({ searchfield: event.target.value });
        console.log(this.state.searchfield);
    }

    onResponse = (response, info) => {
        this.setState({
            Response: response,
            AllResults: response.AllResults[0]
        });
        console.log(this.state.Response);
    };



    initTextRequest = () => {
        const { searchfield } = this.state;
        const textRequest = new Houndify.TextRequest({
            // Text query
            query: searchfield,

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
                Longitude: -121.973968
            },

            // Pass the current ConversationState stored from previous queries
            // See https://www.houndify.com/docs#conversation-state
            conversationState: '',

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

            onError: function(err, info) {
                console.log(err);
            }
        });

    }


  render() {
    const {AllResults} = this.state;
    return (
      <div>
       <SearchBox onChange={this.onChange} initTextRequest={this.initTextRequest}/>
       <div className=''>
       {  AllResults === ''
                ? <div>
                  </div>
                : ( AllResults !== '',
                    <ResponseCard {...AllResults} Response={this.state.Response}/>
                  )
             }
       </div>
      </div>
    )
  }
}

export default TextRequest