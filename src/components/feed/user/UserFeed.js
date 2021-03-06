import React, { Component } from 'react';
import Footer from './Footer';
import { base } from '../../../firebase/firebase';

const VotingList = (props) => {	
	const candidates = props.candidates;
	const votingList = candidates.map((candidate) => {
		if(candidate.present)
		return(
			<VotingItem name={candidate.name}
									key={candidate.id.toString()}
									id={candidate.id - 1}
									increaseCount={props.increaseUserCount.bind(this)}
									disableBoxes={props.disableBoxes}
									checked={props.checked}/>
		);
	})

	return(
		<ul style={{listStyleType: "none"}}>{votingList}</ul>
	)
}

const VotingItem = (props) => {	
	let toDisable = false;
	let checked = props.checked;	
	if(props.disableBoxes) {
		if(!checked[props.id]) {
			toDisable = true;
		}
	}
	
	return(	
		<li>
			{props.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

			<input id={props.id}
						 disabled={toDisable} 
						 type="checkbox" 						 
						 onChange={props.increaseCount.bind(this)}/>
		</li>
	)
}

class UserFeed extends Component {			
	constructor(){
		super();
		this.state = {
			candidates: [{id: 1, name: "Abcede, Francis Daryl"}],
			userVoteCount: 0,
			disableBoxes: false,			
		}
	}

	componentWillMount() {		
		this.candidatesRef = base.syncState('candidates', {
			context: this,
			state: 'candidates'
		});				
		let checked = new Array(120);
		
		for(let i = 0; i < checked.length; i++) {
			checked[i] = false;
		}

		this.setState({
			checked: checked
		})
	}

	componentWillUnmount() {
		base.removeBinding(this.candidatesRef);
	}		

	increaseUserQueuedCount(e) {		
		let add = (e.target.checked) ? ((this.state.userVoteCount === 3) ? 0 : 1) : ((this.state.userVoteCount === 0) ? 0 : -1);		

		let checked = this.state.checked;

		checked[e.target.id] = true;
		this.setState({...this.state, userVoteCount: this.state.userVoteCount+add, checked: checked});		

		if(this.state.userVoteCount === 2) {
			this.setState({...this.state, userVoteCount: this.state.userVoteCount+add, disableBoxes: true, checked: checked})
		}
	}

	resetCount(e) {
		let checked = new Array(120);
		
		for(let i = 0; i < checked.length; i++) {
			checked[i] = false;
		}
		
		this.setState({
			...this.state,
			userVoteCount: 0,
			disableBoxes: false,
			checked: checked,
			reset: true
		})
	}

	submitForm(e) {				
		let candidates = this.state.candidates;
		let count = 0;
		
		for(let i = 0; i < candidates.length; i++) {			
			if(this.state.checked[i]) {
				candidates[i].voteCount++;
				count++;
			}
		}

		if(count === 3){			
			candidates[this.props.currentUserId].voted = true;
			this.setState({
				...this.state,
				candidates: candidates
			});
			alert('Your responses are now recorded.');
		} else {
			alert(`You need ${3 - count} more responses!`);
		}

		this.render();

		e.preventDefault();		
	}

	render() {		

		return(			
			<div>
				<main>
					<br />
					<br />
					<br />
					<form action="">
						<div className="row">											
							<div className="col-sm-3">
								<VotingList candidates={this.state.candidates.slice(0, this.state.candidates.length / 4 * 1)}																	disableBoxes={this.state.disableBoxes}
														increaseUserCount={this.increaseUserQueuedCount.bind(this)}
														checked={this.state.checked}/>
							</div>
							<div className="col-sm-3">
								<VotingList candidates={this.state.candidates.slice(this.state.candidates.length / 4 * 1, this.state.candidates.length / 2)}
														disableBoxes={this.state.disableBoxes}
														increaseUserCount={this.increaseUserQueuedCount.bind(this)}
														checked={this.state.checked}/>
							</div>
							<div className="col-sm-3">
								<VotingList candidates={this.state.candidates.slice(this.state.candidates.length / 2, this.state.candidates.length / 4 * 3)}
														disableBoxes={this.state.disableBoxes}
														increaseUserCount={this.increaseUserQueuedCount.bind(this)}
														checked={this.state.checked}/>
							</div>
							<div className="col-sm-3">
								<VotingList candidates={this.state.candidates.slice(this.state.candidates.length / 4 * 3, this.state.candidates.length)}
														disableBoxes={this.state.disableBoxes}
														increaseUserCount={this.increaseUserQueuedCount.bind(this)}
														checked={this.state.checked}/>
							</div>
						</div>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="submit" onClick={this.submitForm.bind(this)} className="btn btn-primary">Submit</button>
					</form>
				</main>

				<Footer userVoteCount={this.state.userVoteCount}
								resetCount={this.resetCount.bind(this)}/>
			</div>
		)
	}
}

export default UserFeed;


/*this.setState({
			candidates: [
				{id: 1, name: "Abcede, Francis Daryl", voteCount: 0, present: true, voted: false, password: },
				{id: 2, name: "Albina, Julius", voteCount: 0, present: true},
				{id: 3, name: "Albiso, Romil", voteCount: 0, present: true},
				{id: 4, name: "Alcoseba, An Vinson", voteCount: 0, present: true},
				{id: 5, name: "Ambrocio-Montajes, Bernadette", voteCount: 0, present: true},
				{id: 6, name: "Andal, Zenar", voteCount: 0, present: true},
				{id: 7, name: "Ardiente, Kenneth", voteCount: 0, present: true},
				{id: 8, name: "Arias, Crisostomo", voteCount: 0, present: true},
				{id: 9, name: "Babierra, Mark", voteCount: 0, present: true},
				{id: 10, name: "Bag-ao Dologan, Gwynn", voteCount: 0, present: true},
				{id: 11, name: "Bagatsing, Jenny", voteCount: 0, present: true},
				{id: 12, name: "Balduman, Engelbert", voteCount: 0, present: true},
				{id: 13, name: "Bangos, Cathy", voteCount: 0, present: true},				
				{id: 14, name: "Barcelona, Rae", voteCount: 0, present: true},
				{id: 15, name: "Barredo, Odeza", voteCount: 0, present: true},
				{id: 16, name: "Barte, Jose Ferrer III", voteCount: 0, present: true},				
				{id: 17, name: "Batanay, Nino Paul", voteCount: 0, present: true},
				{id: 18, name: "Bercero, Gaea Lolanthe", voteCount: 0, present: true},
				{id: 19, name: "Bollozos, Jade Lourdes", voteCount: 0, present: true},
				{id: 20, name: "Bubuli, Chyssa May Yares", voteCount: 0, present: true},			
				{id: 21, name: "Cadurnigara, Mariane Rose", voteCount: 0, present: true},
				{id: 22, name: "Cajigas, Stephen Paul", voteCount: 0, present: true},
				{id: 23, name: "Caminero, Jay", voteCount: 0, present: true},
				{id: 24, name: "Candia, Jefferson", voteCount: 0, present: true},
				{id: 25, name: "Candia, Ma. Teresa Astillero", voteCount: 0, present: true},
				{id: 26, name: "Carillo, Jesse Jasper", voteCount: 0, present: true},
				{id: 27, name: "Castillo, Vanessa", voteCount: 0, present: true},
				{id: 28, name: "Catoc-Pulk, Marilou", voteCount: 0, present: true},
				{id: 29, name: "Ceniza, Neil", voteCount: 0, present: true},
				{id: 30, name: "Ceniza, Roselyn", voteCount: 0, present: true},
				{id: 31, name: "Chua, Riezl Cabanero", voteCount: 0, present: true},
				{id: 32, name: "Coca, Christine Zoilo", voteCount: 0, present: true},
				{id: 33, name: "Codinera-Yap , Jenny", voteCount: 0, present: true},				
				{id: 34, name: "Coronel, Maria Krista", voteCount: 0, present: true},
				{id: 35, name: "De Guzman, Jannette", voteCount: 0, present: true},
				{id: 36, name: "De Guzman, Natasha", voteCount: 0, present: true},
				{id: 37, name: "Debajo, Marcelino", voteCount: 0, present: true},
				{id: 38, name: "Deiparine, Marve Eniola", voteCount: 0, present: true},
				{id: 39, name: "Demetrio, Lynniel Jo", voteCount: 0, present: true},
				{id: 40, name: "Desucatan, Bernie", voteCount: 0, present: true},
				{id: 41, name: "Mier-Dominise, Jennifer", voteCount: 0, present: true},
				{id: 42, name: "Dulaca, Ryan Ciriaco", voteCount: 0, present: true},
				{id: 43, name: "Enriquez, Sunshine", voteCount: 0, present: true},
				{id: 44, name: "Espana, Chris Dale", voteCount: 0, present: true},
				{id: 45, name: "Esperida, Mark Anthony", voteCount: 0, present: true},
				{id: 46, name: "Espiritu-Vizcarra, Emma", voteCount: 0, present: true},
				{id: 47, name: "Esteban, Joseph", voteCount: 0, present: true},
				{id: 48, name: "Estrera, Lindo Canillas", voteCount: 0, present: true},
				{id: 49, name: "Estrera, Maria Lumerica", voteCount: 0, present: true},
				{id: 50, name: "Fat-Yara, Jacqueline", voteCount: 0, present: true},
				{id: 51, name: "Gabica, Dexter", voteCount: 0, present: true},
				{id: 52, name: "Genares, Reynan", voteCount: 0, present: true},
				{id: 53, name: "Go-Nacion, Alice Mae", voteCount: 0, present: true},
				{id: 54, name: "Gorre-Grecia, Jane Leslie", voteCount: 0, present: true},
				{id: 55, name: "Hernandez, Alva", voteCount: 0, present: true},
				{id: 56, name: "Heruela, Marc", voteCount: 0, present: true},
				{id: 57, name: "Itumay, Marianyl", voteCount: 0, present: true},
				{id: 58, name: "Javier, Antonio", voteCount: 0, present: true},
				{id: 59, name: "Jimenez, Fritz", voteCount: 0, present: true},
				{id: 60, name: "Lara, Francis", voteCount: 0, present: true},
				{id: 61, name: "Librero, Joseph", voteCount: 0, present: true},
				{id: 62, name: "Limboy, Janine", voteCount: 0, present: true},
				{id: 63, name: "Lipardo, Caren", voteCount: 0, present: true},
				{id: 64, name: "Lopez, Rossveth", voteCount: 0, present: true},
				{id: 65, name: "Lubino, Kay", voteCount: 0, present: true},
				{id: 66, name: "Lui-Ramos, Janet", voteCount: 0, present: true},
				{id: 67, name: "Madelo, Edwilyn", voteCount: 0, present: true},
				{id: 68, name: "Magallanes, Philip", voteCount: 0, present: true},
				{id: 69, name: "Manalang, Sheryl", voteCount: 0, present: true},
				{id: 70, name: "Manlangit-Gozon, Jore Jean", voteCount: 0, present: true},
				{id: 71, name: "Mantilla, Marga", voteCount: 0, present: true},
				{id: 72, name: "Maratas, Jeremy", voteCount: 0, present: true},
				{id: 73, name: "Matillano, Neil", voteCount: 0, present: true},
				{id: 74, name: "Melleza, Issa Joanna Ariza", voteCount: 0, present: true},
				{id: 75, name: "Mercado, Guia", voteCount: 0, present: true},
				{id: 76, name: "Mercado, Lana", voteCount: 0, present: true},
				{id: 77, name: "Merlin, Mavy Nineza", voteCount: 0, present: true},
				{id: 78, name: "Metoda, Christine Marie", voteCount: 0, present: true},
				{id: 79, name: "Minoza, Dancel Marie", voteCount: 0, present: true},
				{id: 80, name: "Mira, Arim", voteCount: 0, present: true},
				{id: 81, name: "Miranda-Rago, Cymbeline", voteCount: 0, present: true},
				{id: 82, name: "Miro, Ryan", voteCount: 0, present: true},
				{id: 83, name: "Montajes, Raymund", voteCount: 0, present: true},
				{id: 84, name: "Bontigao-Nardo, Grecedes", voteCount: 0, present: true},
				{id: 85, name: "Olano, Mafe", voteCount: 0, present: true},
				{id: 86, name: "Omerez, Ariel", voteCount: 0, present: true},
				{id: 87, name: "Palen, Dave", voteCount: 0, present: true},
				{id: 88, name: "Avergonzado-Pangalangan, Malou", voteCount: 0, present: true},
				{id: 89, name: "Pantoja, Christian", voteCount: 0, present: true},
				{id: 90, name: "Patindol, Tigran", voteCount: 0, present: true},
				{id: 91, name: "Penon, Jim Irvin", voteCount: 0, present: true},
				{id: 92, name: "Plenos, Haydee", voteCount: 0, present: true},
				{id: 93, name: "Razonable, Steven", voteCount: 0, present: true},
				{id: 94, name: "Remirata, Alger", voteCount: 0, present: true},
				{id: 95, name: "Reyes, Michelle", voteCount: 0, present: true},
				{id: 96, name: "Rizal, Reina", voteCount: 0, present: true},
				{id: 97, name: "Rodelas-Canama, Ronnie Lynn", voteCount: 0, present: true},
				{id: 98, name: "Romeo, Daisy", voteCount: 0, present: true},
				{id: 99, name: "Rosell, Joshua", voteCount: 0, present: true},
				{id: 100, name: "Sagayno-Oplado, Mary Joy", voteCount: 0, present: true},
				{id: 101, name: "Salces, Cary", voteCount: 0, present: true},
				{id: 102, name: "Samson, Alyssa Lorraine", voteCount: 0, present: true},
				{id: 103, name: "Sevilla-Esmero, Darlene", voteCount: 0, present: true},
				{id: 104, name: "Sia-Chu, Cherry Joy", voteCount: 0, present: true},
				{id: 105, name: "Sicisc, Cyril", voteCount: 0, present: true},
				{id: 106, name: "Solon, Claudine", voteCount: 0, present: true},
				{id: 107, name: "Soria, Francis", voteCount: 0, present: true},
				{id: 108, name: "Suico, Celedon Erpurt", voteCount: 0, present: true},
				{id: 109, name: "Tabornal, Racquel", voteCount: 0, present: true},
				{id: 110, name: "Talam, Francis", voteCount: 0, present: true},
				{id: 111, name: "Tamala, Nelson", voteCount: 0, present: true},
				{id: 112, name: "Tan, Julie Ann", voteCount: 0, present: true},
				{id: 113, name: "Tariman, Kareen", voteCount: 0, present: true},
				{id: 114, name: "Te, Jennifer", voteCount: 0, present: true},
				{id: 115, name: "Trompeta-Layosa, Judie Lyn", voteCount: 0, present: true},
				{id: 116, name: "Valmores, Camille", voteCount: 0, present: true},
				{id: 117, name: "Lumambas-Vasquez, Daisyrie", voteCount: 0, present: true},
				{id: 118, name: "Villamora, Giovanni", voteCount: 0, present: true},
				{id: 119, name: "Ya, Marjo", voteCount: 0, present: true},
				{id: 120, name: "Yap, Cheryl", voteCount: 0, present: true}
			],
		});
*/