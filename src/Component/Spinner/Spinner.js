import React from 'react';
import ReactLoading from 'react-loading';
import './Spinner.css';

const Spinner = ({ type, color }) => {
	return (
		<div className='spinner-style'>
			<ReactLoading type={type} color={color} height={667} width={375} />
		</div>
	)
}


export default Spinner;