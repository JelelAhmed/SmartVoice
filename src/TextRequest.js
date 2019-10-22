import React, { Component } from 'react';
import Houndify from 'houndify';
import ReportCard from './ReportCard';

class TextRequest extends Component {

    state = {
        queryString: '.',
        Response: '',
        AllResults: '',
    }


    onChange = (event) => {
        this.setState({ queryString: event.target.value });
    }

    onResponse = (response, info) => {
        this.setState({
            Response: response,
            AllResults: response.AllResults[0]
        });
        console.log(this.state.Response);
    };



    initTextRequest = () => {
        const { queryString } = this.state;
        const textRequest = new Houndify.TextRequest({
            // Text query
            query: queryString,

            // Your Houndify Client ID



            // For testing environment you might want to authenticate on frontend without Node.js server. 
            // In that case you may pass in your Houndify Client Key instead of "authURL".
            // clientKey: "YOUR_CLIENT_KEY",
            clientId: "GDphGQ3HonLiBJlAK_bKZg==",

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

            // You need to create an endpoint on your server
            // for handling the authentication and proxying 
            // text search http requests to Houndify backend
            // See SDK's server-side method HoundifyExpress.createTextProxyHandler().

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
        const { AllResults } = this.state;
        return (
          <div className='App'>
            <div className="ui action big labeled fluid input field">
              <input 
                    onChange={this.onChange}
                    id="query" 
                    type="text" 
                    placeholder="Click on a microphone icon or type in your query" 
                />
              <button 
                      onClick={this.initTextRequest}
                      id="textSearchButton"  
                      className="ui icon button"
              > 
                 <i className="search big icon"></i>
              </button>
            </div>
             {  AllResults === ''
                ? <div>
                  </div>
                : ( AllResults !== '',
                    <ReportCard {...AllResults} />
                  )
             }    
          </div>
        )
    }
}

export default TextRequest