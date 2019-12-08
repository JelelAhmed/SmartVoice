import React from 'react';
import './SearchBox.css';

const SearchBox = ({onChange, initTextRequest}) => {
	return (
		<div className="box-width ui action big labeled fluid input field pa4 center br3 shadow-5">
		    <input 
	        id="query"
	        type="text"
	        placeholder="eg: what's the weather like in Lagos!"
	        onChange={onChange} 
		    />
		    <button 
	        id="textSearchButton"  
	        className="ui icon button"
	        onClick={initTextRequest}
		    > 
		      <i className="search big icon"></i>
		    </button>
    </div>
	)
}

export default SearchBox;