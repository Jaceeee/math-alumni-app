import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return(
			<footer className="footer">
				<div className="container">
					<span className="text-muted">Counter: {this.props.userVoteCount}</span>
					&nbsp;&nbsp;					
					<button className="btn btn-primary" 
							onClick={this.props.resetCount.bind(this)} 
							>Reset</button>
				</div>
			</footer>
		)
	}
}

export default Footer;