<article className= 'card ba br3 dark-gray b--black-10 mw6 shadow-5 center'>
					  <ul className="list br6 pl0 mw6 center">
					   <li className="pv4 ba br3 bl-0 bt-0 br-0 b--line b--black-30 center tc f2">Report Card</li>
					    <li className="tl f4 lh-copy pv3 ba br3 bl-0 bt-0 br-0 b--line b--black-30">Status:
					      <p className='para'>{Response.Status}</p>
					    </li>
					    <li className="tl f4 lh-copy pv3 ba br3 bl-0 bt-0 br-0 b--line b--black-30">Command Kind:
					      <p className='para'>{CommandKind}</p>
					    </li>
					    <li className="tl f4 lh-copy pv3 ba br3 bl-0 bt-0 br-0 b--line b--black-30">Spoken Response:
					      <p className='para'>{SpokenResponseLong}</p>
					    </li>
					    <li className="tl f4 lh-copy pv3 br3 bl-0 bt-0 br-0 b--line b--black-30">Written Response:
					     <p className='para'>{WrittenResponseLong}</p>		    
					    </li>
					  </ul>
		      </article>





		      <div>
        <Rank {...user}/>
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