import React, { Component } from 'react';

class Login extends Component {
	submitForm(e) {		
		if(this.refs.username.value === "jtroldan" && this.refs.password.value === "1234") {
			alert("hello");
			this.props.changeDisplayState(2);
		}
		e.preventDefault();
	}

	render() {
		return(
			<div className="text-center">
		    <form className="form-signin" onSubmit={this.submitForm.bind(this)}>		      
		      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
		      <label htmlFor="inputEmail" className="sr-only">Email address</label>
		      <input ref="username" type="text" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
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