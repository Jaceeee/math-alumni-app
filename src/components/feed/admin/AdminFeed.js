import React, { Component } from 'react';
import { base } from '../../../firebase/firebase';
import AdminInterface from './AdminInterface';
import { printImg } from '../../../api/api';

class AdminFeed extends Component {
	
	constructor() {
		super();
		this.state = {
			candidates: []
		}
	}

	hashFnv32a(str, asString, seed) {
	    /*jshint bitwise:false */
	    var i, l,
	        hval = (seed === undefined) ? 0x811c9dc5 : seed;

	    for (i = 0, l = str.length; i < l; i++) {
	        hval ^= str.charCodeAt(i);
	        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
	    }
	    if( asString ){
	        // Convert to 8 digit hex string
	        return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
	    }
	    return hval >>> 0;
	}

	addCandidate(name) {
		const candidates = {...this.state.candidates};
		const id = candidates.length + 1;
		candidates[id] = {
			id: id,
			name: name,	
			voteCount: 0
		};

		this.setState({candidates});

		const toPrint = [{...candidates[id]}];		
	}

	componentWillMount() {
		this.candidatesRef = base.syncState('candidates', {
			context: this,
			state: 'candidates'
		})
	}

	componentWillUnmount() {
		base.removeBinding(this.candidatesRef);
	}

	printItems() {
		printImg(this.state.candidates);
	}

	addItems(e) {
		let candidates = this.state.candidates;
		let { name, username } = this.refs;
		let newCandidate = {
			id: candidates.length + 1,
			name: name.value,
			password: this.hashFnv32a(name, true),
			present: true,
			userName: username.value,
			voteCount: 0,
			voted: false
		}

		candidates.push(newCandidate);				

		
		this.setState({
			...this.state,
			candidates: candidates
		});

		name.value = '';
		username.value = '';
		
		printImg([newCandidate]);
		e.preventDefault();
	}

	togglePresence(e) {
		let { id1 } = this.refs;
		const index = id1.value - 1;

		let candidates = this.state.candidates;

		if(index < candidates.length){			
			candidates[index].present = !candidates[index].present;

			this.setState({
				...this.state,
				candidates
			})			
		}
		id1.value = '';
		e.preventDefault();
	}

	deleteCandidate(e) {
		let { id2 } = this.refs;
		const index = id2.value - 1;
		
		let candidates = this.state.candidates;
		candidates.splice(index, 1);

		this.setState({
			...this.state,
			candidates
		})

		id2.value = '';
		e.preventDefault();	
	}

	render() {		
		return(
			<div>
				<AdminInterface candidates={this.state.candidates}/>				
				<form onSubmit={this.addItems.bind(this)} style={{position: "relative", left: "30%"}}>
					<p>Name:</p>
					<input ref="name" type="text" />
					<p>Username:</p>
					<input ref="username" type="text" />
					<br /><br />
					<button type="submit" className="btn btn-primary">Add</button>&nbsp;&nbsp;
					<button className="btn btn-secondary" onClick={this.printItems.bind(this)}>Print Items</button>					
				</form>				
				<br /><br />
				<form onSubmit={this.togglePresence.bind(this)} style={{position: "relative", left: "30%"}}>
					<p>Enter id</p>
					<input ref="id1" type="text" />					
					<br /><br />
					<button type="submit" className="btn btn-warning">Toggle Presence</button>&nbsp;&nbsp;					
				</form>
				<br /><br />
				<form onSubmit={this.deleteCandidate.bind(this)} style={{position: "relative", left: "30%"}}>
					<p>Enter id</p>
					<input ref="id2" type="text" />					
					<br /><br />
					<button type="submit" className="btn btn-danger">Delete</button>&nbsp;&nbsp;					
				</form>
			</div>
		)
	}
}

export default AdminFeed;