import React, { Component } from 'react';

const CandidatesList = (props) => {
	const candidates = props.candidates;
	const candidateItems = props.candidates.map((candidate) => {
		return <CandidateItem name={candidate.name}
									 key={candidate.id.toString()} />
	});

	return(
		<table style={{position: "relative", left: "40%", maxHeight: "100px"}}>
			{candidateItems}
		</table>
	)
}

const CandidateItem = (props) => {
	return(
		<tbody>
			<tr>
				<td>{props.name}</td>
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