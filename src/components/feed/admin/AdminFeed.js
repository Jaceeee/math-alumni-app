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

	addItems() {
		let candidates = this.state.candidates;
		this.setState({
			candidates: [],			
		});
	}

	render() {
		return(
			<div>
				<AdminInterface candidates={this.state.candidates}/>				
				<button onClick={this.printItems.bind(this)}>Print Items</button>
			</div>
		)
	}
}

export default AdminFeed;