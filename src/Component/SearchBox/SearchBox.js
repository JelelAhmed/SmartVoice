import React from 'react';

const SearchBox = ({onChange, onClick}) => {
	return (
		<div className="ui action big labeled fluid input field">
              <input 
                    id="query" 
                    type="text" 
                    placeholder="Click on a microphone icon or type in your query"
                    onChange={onChange} 
                />
              <button 
                      id="textSearchButton"  
                      className="ui icon button"
                      onClick={onClick}
              > 
                 <i className="search big icon"></i>
              </button>
    </div>
	)
}

export default SearchBox;