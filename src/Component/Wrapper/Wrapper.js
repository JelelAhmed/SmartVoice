import React from 'react';
import Tilt from 'react-tilt'
import './Wrapper.css';

const Wrapper = ({children, message, onCommandChange, command}) => {
  return (
    <div className='ma4 mt0'>
      <article onClick={()=> onCommandChange(command)} className="dim br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l wide pt3 displayGrid shadow-5 center pointer">
				{children}
				<div>
	        <p className='b pa1 b--black-10'>{message}</p>
	      </div>
	    </article>
	  </div>
  )
}

export default Wrapper;