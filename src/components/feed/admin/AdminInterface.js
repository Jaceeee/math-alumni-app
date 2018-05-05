import React, { Component } from 'react';
import { base } from '../../../firebase/firebase';

const CandidatesList = (props) => {
	const candidates = props.candidates;	
	candidates.sort((a, b) => {
		return b.voteCount - a.voteCount;
	});
	const candidateItems = candidates.map((candidate) => {
		return <CandidateItem name={candidate.name}
							  voteCount={candidate.voteCount}
							  key={candidate.id.toString()}
							  id={candidate.id}
							  togglePresence={props.togglePresence}
							  present={candidate.present} />
	});

	return(
		<table style={{position: "relative", left: "40%", maxHeight: "100px"}}>
			<thead>
				<tr>
					<td><b>ID</b></td>
					<td><b>Names</b></td>
					<td><b>Votes</b></td>
					<td><b>Present</b></td>
				</tr>
			</thead>
			{candidateItems}
		</table>
	)
}

const CandidateItem = (props) => {
	return(		
		<tbody>
			<tr>
				<td>{props.id}</td>
				<td>{props.name}</td>
				<td>{props.voteCount}</td>
				<td><input id={props.id} checked={props.present} onChange={props.togglePresence.bind(this)} type="checkbox" /></td>
			</tr>
		</tbody>
	)
}

class AdminInterface extends Component {
	constructor() {
		super()
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

	togglePresence(e) {
		let candidates = this.state.candidates;		
		console.log(candidates[e.target.id - 1]);
		candidates[e.target.id - 1].present = !(candidates[e.target.id - 1]);	

		console.log(candidates[e.target.id - 1]);
		this.setState({
			...this.state,
			candidates: candidates
		});
		
		e.preventDefault();
	}
	render() {		
		return(
			<div>
				<br /><br /><br />
				<CandidatesList candidates={this.props.candidates}
								togglePresence={this.togglePresence.bind(this)}/>

			</div>
		)
	}
}

export default AdminInterface;