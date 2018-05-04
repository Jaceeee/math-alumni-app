import React, { Component } from 'react';
import AdminFeed from './AdminFeed';
import UserFeed from './UserFeed';
import Header from './Header';


class Feed extends Component {		
	render() {		
		return(
			<div>
				<Header />
				<FeedSwitcher displayState={this.props.displayState} />				

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
				<UserFeed />
			)
		default:
			return(
				<UserFeed />
			)			
	}
}

export default Feed;