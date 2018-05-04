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
								this.state.candidates[/*this.props.currentUserId - 1*/0].name}
						/>
				<FeedSwitcher displayState={this.props.displayState}
							  currentUserId={this.props.currentUser} />				

			</div>
		)
	}
}

const FeedSwitcher = (props) => {	
	switch(props.displayState) {
		case 1:
			return(
				<AdminFeed />
			)
		case 2:
			return(
				<UserFeed currentUserId={props.currentUserId}/>
			)
		default:
			return(
				<UserFeed />
			)			
	}
}

export default Feed;