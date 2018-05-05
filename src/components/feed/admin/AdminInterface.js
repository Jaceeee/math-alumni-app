import React, { Component } from 'react';

const CandidatesList = (props) => {
	const candidates = props.candidates;
	const candidateItems = candidates.map((candidate) => {
		return <CandidateItem name={candidate.name}
							  voteCount={candidate.voteCount}
							  id={candidate.id}
							  key={candidate.id.toString()} />
	});

	return(
		<table style={{position: "relative", left: "40%", maxHeight: "100px"}}>
			<thead>
				<tr>
					<td>ID</td>
					<td>Names</td>
					<td>Votes</td>
					<td>Present</td>
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
				<td><input type="checkbox" /></td>
			</tr>
		</tbody>
	)
}

class AdminInterface extends Component {
	render() {
		return(
			<div>
				<br /><br /><br />
				<CandidatesList candidates={this.props.candidates}/>

			</div>
		)
	}
}

export default AdminInterface;