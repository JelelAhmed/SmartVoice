import React from 'react';
import VoiceLogo from '../VoiceLogo/VoiceLogo';
import TextLogo from '../TextLogo/TextLogo';
import Wrapper from '../Wrapper/Wrapper';
import './SelectCommand.css'

const SelectCommand = ({onCommandChange}) => {

	const voiceMessage = 'Perform a Speech to Text Operation Using Your Microphone';
	const textMessage = 'Query Knowledge on Weather, News, People, Countries, Events and lots more!'
  const voice = 'voice';
  const text = 'search';

	return (
		<div>
		  <h2 className='pa2 gold pointer f2'>What do you want to do?</h2>
			<div>
			 	<article className="br ba dark-gray b--black-10 mv4 w-40-l pt4 displayFlex shadow-5 center">
				  <Wrapper 
				  	onCommandChange={onCommandChange}
				  	command={voice} 
				  	message={voiceMessage}>				  	
				  	<VoiceLogo/>
				  </Wrapper>
				  <Wrapper 
				  	onCommandChange={onCommandChange}
				  	command={text}
				  	message={textMessage}>
				  	<TextLogo />
				  </Wrapper>
				</article>
			</div>
		</div>
	)
}

export default SelectCommand;  