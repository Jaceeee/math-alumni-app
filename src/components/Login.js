import React, { Component } from 'react';
import { base } from '../firebase/firebase';

class Login extends Component {
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

	
	submitForm(e) {		
		let logFlag = false;		
		if(this.refs.username.value === 'admin' && this.refs.password.value === '1234') {
			this.props.changeDisplayState(1, 41);
			logFlag = true;
		} else {
			for(let i = 0; i < this.state.candidates.length; i++) {				
				if(this.refs.username.value === this.state.candidates[i].userName && this.refs.password.value === this.state.candidates[i].password) {
					this.props.changeDisplayState(2, this.state.candidates[i].id - 1);				
					// this.props.setCurrentUser(this.state.candidates[i].id - 1);
					logFlag = true;
				}
			}			
		}

		if(!logFlag) {
			alert('Invalid login...')
		}

		e.preventDefault();
	}

	render() {		
		console.log(this.state.candidates);
		return(
			<div className="text-center">
		    <form className="form-signin" onSubmit={this.submitForm.bind(this)}>		      
		      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
		      <label htmlFor="inputEmail" className="sr-only">Username</label>
		      <input ref="username" type="text" id="inputEmail" className="form-control" placeholder="Username" required autoFocus />
		      <label htmlFor="inputPassword" className="sr-only">Password</label>
		      <input ref="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />
		      <div className="checkbox mb-3">
		        <label>
		          <input type="checkbox" value="remember-me" /> Remember me
		        </label>
		      </div>
		      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
		      <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
		    </form>
		  </div>
		)
	}
}

export default Login;