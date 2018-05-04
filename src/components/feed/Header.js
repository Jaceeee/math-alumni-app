import React, { Component } from 'react';

class Header extends Component {
	render() {
		return(
			<header>
				<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
					<h1 className="navbar-brand">UPC Math Alumni</h1>
					<h3 className="navbar-brand">Hello, {this.props.currentUser}!</h3>
				</nav>
			</header>
		)
	}
}

export default Header;