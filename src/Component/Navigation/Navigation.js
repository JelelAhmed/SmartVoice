import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn, command, onCommandChange}) => {
	console.log(isSignedIn);
	return ( 
		<div>
			{ isSignedIn === true 
				? ( command !== null
						? (
							<nav>
								<p 
								 onClick={() => onCommandChange(null)}
								 className='f3 link dim black underline pr3 pointer'>Back</p>
								 <p 
								 onClick={() => onRouteChange('signout')}
								 className='f3 link dim black underline pr3 pointer'>Sign Out</p>
				      </nav>
							) 
						  :<nav>
								<p 
								 onClick={() => onRouteChange('signout')}
								 className='f3 link dim black underline pr3 pointer'>Sign Out</p>
					     </nav>
				  )
				: <nav>
						<p 
						 onClick={() => onRouteChange('signin')} 
						 className='f3 link dim black underline pr3 pointer'>Sign In</p>
						<p 
						 onClick={() => onRouteChange('register')} 
						 className='f3 link dim black underline pr3 pointer'>Register</p>
				  </nav>				
			}
		</div>
	)
}

export default Navigation;