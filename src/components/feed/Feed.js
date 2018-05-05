import React, { Component } from 'react';
import AdminFeed from './admin/AdminFeed';
import UserFeed from './user/UserFeed';
import Header from './Header';
import {base} from '../../firebase/firebase';


class Feed extends Component {	
	constructor() {
		super();
		this.state = {
			candidates: []
		}

	}	
	componentWillMount() {		
		this.candidatesRef = base.syncState('candidates', {
			context: this,
			state: 'candidates'
		});
	}	

	componentWillUnmount() {
		base.removeBinding(this.candidatesRef);
	}

	render() {		
		return(
			<div>
				<Header currentUser={this.state.candidates.length === 0 ? 
								"..." : 
								this.state.candidates[this.props.currentUserId].name}
						changeDisplayState={this.props.changeDisplayState}/>
				<FeedSwitcher displayState={this.props.displayState}
								changeDisplayState={this.props.changeDisplayState}
							  currentUserId={this.props.currentUserId} 
							  candidates={this.state.candidates}/>				

			</div>
		)
	}
}

const FeedSwitcher = (props) => {		
	if(props.displayState === 2) {		
		if(props.candidates[props.currentUserId].voted) {
			return <AlreadyVoted changeDisplayState={props.changeDisplayState} />
		}
	}
	switch(props.displayState) {
		case 1:
			return(
				<AdminFeed changeDisplayState={props.changeDisplayState}/>
			)
		case 2:
			return(
				<UserFeed currentUserId={props.currentUserId}/>
			)
		default:
			return(
				<UserFeed currentUserId={props.currentUserId}/>
			)			
	}
}

const AlreadyVoted = (props) => {
	return(
		<div>
			<br /><br /><br />
			<h1>You have already voted.</h1>
			<br />
			<button onClick={props.changeDisplayState.bind(this, 0)}>Return to home</button>
		</div>
	)
}
export default Feed;