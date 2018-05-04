import React, { Component } from 'react';
import Footer from './Footer';
import { base } from '../../firebase/firebase';

const VotingList = (props) => {	
	const candidates = props.candidates;	

	const votingList = candidates.map((candidate) => {
		return(
			<VotingItem name={candidate.name}
									key={candidate.id.toString()}
									increaseCount={props.increaseUserCount.bind(this)}
									disableBoxes={props.disableBoxes}
									disable={props.disable}
									reset={props.reset}/>
		);
	})

	return(
		<ul style={{listStyleType: "none"}}>{votingList}</ul>
	)
}

const VotingItem = (props) => {
	if(props.reset) {
		return(
			<li>
			{props.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

			<input disabled={props.disable} 
						 type="checkbox" 						 
						 onChange={props.increaseCount.bind(this)}
						 checked="false"/>
		</li>
		)
	}
	return(	
		<li>
			{props.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

			<input disabled={props.disable} 
						 type="checkbox" 						 
						 onChange={props.increaseCount.bind(this)}/>
		</li>
	)
}

class UserFeed extends Component {			
	constructor(){
		super();
		this.state = {
			candidates: [{id: 1, name: "Abcede, Francis Daryl"}]
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

	increaseUserQueuedCount(e) {
		let add = (e.target.checked) ? ((this.state.userVoteCount === 3) ? 0 : 1) : ((this.state.userVoteCount === 0) ? 0 : -1);		

		this.setState({...this.state, userVoteCount: this.state.userVoteCount+add});		
	}

	resetCount(e) {
		this.setState({
			...this.state,
			userVoteCount: 0,
			disableBoxes: false
		})
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
								<VotingList candidates={this.state.candidates.slice(0, 30)}														
														increaseUserCount={this.increaseUserQueuedCount.bind(this)}													
														/>
							</div>
							<div className="col-sm-3">
								<VotingList candidates={this.state.candidates.slice(30, 60)}														
														increaseUserCount={this.increaseUserQueuedCount.bind(this)}
														/>
							</div>
							<div className="col-sm-3">
								<VotingList candidates={this.state.candidates.slice(60, 90)}														
														increaseUserCount={this.increaseUserQueuedCount.bind(this)}
														/>
							</div>
							<div className="col-sm-3">
								<VotingList candidates={this.state.candidates.slice(90, 120)}														
														increaseUserCount={this.increaseUserQueuedCount.bind(this)}
														/>
							</div>
						</div>
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
		{id: 1, name: "Abcede, Francis Daryl", voteCount: 0},
		{id: 2, name: "Albina, Julius", voteCount: 0},
		{id: 3, name: "Albiso, Romil", voteCount: 0},
		{id: 4, name: "Alcoseba, An Vinson", voteCount: 0},
		{id: 5, name: "Ambrocio-Montajes, Bernadette", voteCount: 0},
		{id: 6, name: "Andal, Zenar", voteCount: 0},
		{id: 7, name: "Ardiente, Kenneth", voteCount: 0},
		{id: 8, name: "Arias, Crisostomo", voteCount: 0},
		{id: 9, name: "Babierra, Mark", voteCount: 0},
		{id: 10, name: "Bag-ao Dologan, Gwynn", voteCount: 0},
		{id: 11, name: "Bagatsing, Jenny", voteCount: 0},
		{id: 12, name: "Balduman, Engelbert", voteCount: 0},
		{id: 13, name: "Bangos, Cathy", voteCount: 0},				
		{id: 14, name: "Barcelona, Rae", voteCount: 0},
		{id: 15, name: "Barredo, Odeza", voteCount: 0},
		{id: 16, name: "Barte, Jose Ferrer III", voteCount: 0},				
		{id: 17, name: "Batanay, Nino Paul", voteCount: 0},
		{id: 18, name: "Bercero, Gaea Lolanthe", voteCount: 0},
		{id: 19, name: "Bollozos, Jade Lourdes", voteCount: 0},
		{id: 20, name: "Bubuli, Chyssa May Yares", voteCount: 0},			
		{id: 21, name: "Cadurnigara, Mariane Rose", voteCount: 0},
		{id: 22, name: "Cajigas, Stephen Paul", voteCount: 0},
		{id: 23, name: "Caminero, Jay", voteCount: 0},
		{id: 24, name: "Candia, Jefferson", voteCount: 0},
		{id: 25, name: "Candia, Ma. Teresa Astillero", voteCount: 0},
		{id: 26, name: "Carillo, Jesse Jasper", voteCount: 0},
		{id: 27, name: "Castillo, Vanessa", voteCount: 0},
		{id: 28, name: "Catoc-Pulk, Marilou", voteCount: 0},
		{id: 29, name: "Ceniza, Neil", voteCount: 0},
		{id: 30, name: "Ceniza, Roselyn", voteCount: 0},
		{id: 31, name: "Chua, Riezl Cabanero", voteCount: 0},
		{id: 32, name: "Coca, Christine Zoilo", voteCount: 0},
		{id: 33, name: "Codinera-Yap , Jenny", voteCount: 0},				
		{id: 34, name: "Coronel, Maria Krista", voteCount: 0},
		{id: 35, name: "De Guzman, Jannette", voteCount: 0},
		{id: 36, name: "De Guzman, Natasha", voteCount: 0},
		{id: 37, name: "Debajo, Marcelino", voteCount: 0},
		{id: 38, name: "Deiparine, Marve Eniola", voteCount: 0},
		{id: 39, name: "Demetrio, Lynniel Jo", voteCount: 0},
		{id: 40, name: "Desucatan, Bernie", voteCount: 0},
		{id: 41, name: "Mier-Dominise, Jennifer", voteCount: 0},
		{id: 42, name: "Dulaca, Ryan Ciriaco", voteCount: 0},
		{id: 43, name: "Enriquez, Sunshine", voteCount: 0},
		{id: 44, name: "Espana, Chris Dale", voteCount: 0},
		{id: 45, name: "Esperida, Mark Anthony", voteCount: 0},
		{id: 46, name: "Espiritu-Vizcarra, Emma", voteCount: 0},
		{id: 47, name: "Esteban, Joseph", voteCount: 0},
		{id: 48, name: "Estrera, Lindo Canillas", voteCount: 0},
		{id: 49, name: "Estrera, Maria Lumerica", voteCount: 0},
		{id: 50, name: "Fat-Yara, Jacqueline", voteCount: 0},
		{id: 51, name: "Gabica, Dexter", voteCount: 0},
		{id: 52, name: "Genares, Reynan", voteCount: 0},
		{id: 53, name: "Go-Nacion, Alice Mae", voteCount: 0},
		{id: 54, name: "Gorre-Grecia, Jane Leslie", voteCount: 0},
		{id: 55, name: "Hernandez, Alva", voteCount: 0},
		{id: 56, name: "Heruela, Marc", voteCount: 0},
		{id: 57, name: "Itumay, Marianyl", voteCount: 0},
		{id: 58, name: "Javier, Antonio", voteCount: 0},
		{id: 59, name: "Jimenez, Fritz", voteCount: 0},
		{id: 60, name: "Lara, Francis", voteCount: 0},
		{id: 61, name: "Librero, Joseph", voteCount: 0},
		{id: 62, name: "Limboy, Janine", voteCount: 0},
		{id: 63, name: "Lipardo, Caren", voteCount: 0},
		{id: 64, name: "Lopez, Rossveth", voteCount: 0},
		{id: 65, name: "Lubino, Kay", voteCount: 0},
		{id: 66, name: "Lui-Ramos, Janet", voteCount: 0},
		{id: 67, name: "Madelo, Edwilyn", voteCount: 0},
		{id: 68, name: "Magallanes, Philip", voteCount: 0},
		{id: 69, name: "Manalang, Sheryl", voteCount: 0},
		{id: 70, name: "Manlangit-Gozon, Jore Jean", voteCount: 0},
		{id: 71, name: "Mantilla, Marga", voteCount: 0},
		{id: 72, name: "Maratas, Jeremy", voteCount: 0},
		{id: 73, name: "Matillano, Neil", voteCount: 0},
		{id: 74, name: "Melleza, Issa Joanna Ariza", voteCount: 0},
		{id: 75, name: "Mercado, Guia", voteCount: 0},
		{id: 76, name: "Mercado, Lana", voteCount: 0},
		{id: 77, name: "Merlin, Mavy Nineza", voteCount: 0},
		{id: 78, name: "Metoda, Christine Marie", voteCount: 0},
		{id: 79, name: "Minoza, Dancel Marie", voteCount: 0},
		{id: 80, name: "Mira, Arim", voteCount: 0},
		{id: 81, name: "Miranda-Rago, Cymbeline", voteCount: 0},
		{id: 82, name: "Miro, Ryan", voteCount: 0},
		{id: 83, name: "Montajes, Raymund", voteCount: 0},
		{id: 84, name: "Bontigao-Nardo, Grecedes", voteCount: 0},
		{id: 85, name: "Olano, Mafe", voteCount: 0},
		{id: 86, name: "Omerez, Ariel", voteCount: 0},
		{id: 87, name: "Palen, Dave", voteCount: 0},
		{id: 88, name: "Avergonzado-Pangalangan, Malou", voteCount: 0},
		{id: 89, name: "Pantoja, Christian", voteCount: 0},
		{id: 90, name: "Patindol, Tigran", voteCount: 0},
		{id: 91, name: "Penon, Jim Irvin", voteCount: 0},
		{id: 92, name: "Plenos, Haydee", voteCount: 0},
		{id: 93, name: "Razonable, Steven", voteCount: 0},
		{id: 94, name: "Remirata, Alger", voteCount: 0},
		{id: 95, name: "Reyes, Michelle", voteCount: 0},
		{id: 96, name: "Rizal, Reina", voteCount: 0},
		{id: 97, name: "Rodelas-Canama, Ronnie Lynn", voteCount: 0},
		{id: 98, name: "Romeo, Daisy", voteCount: 0},
		{id: 99, name: "Rosell, Joshua", voteCount: 0},
		{id: 100, name: "Sagayno-Oplado, Mary Joy", voteCount: 0},
		{id: 101, name: "Salces, Cary", voteCount: 0},
		{id: 102, name: "Samson, Alyssa Lorraine", voteCount: 0},
		{id: 103, name: "Sevilla-Esmero, Darlene", voteCount: 0},
		{id: 104, name: "Sia-Chu, Cherry Joy", voteCount: 0},
		{id: 105, name: "Sicisc, Cyril", voteCount: 0},
		{id: 106, name: "Solon, Claudine", voteCount: 0},
		{id: 107, name: "Soria, Francis", voteCount: 0},
		{id: 108, name: "Suico, Celedon Erpurt", voteCount: 0},
		{id: 109, name: "Tabornal, Racquel", voteCount: 0},
		{id: 110, name: "Talam, Francis", voteCount: 0},
		{id: 111, name: "Tamala, Nelson", voteCount: -1},
		{id: 112, name: "Tan, Julie Ann", voteCount: 0},
		{id: 113, name: "Tariman, Kareen", voteCount: 0},
		{id: 114, name: "Te, Jennifer", voteCount: 0},
		{id: 115, name: "Trompeta-Layosa, Judie Lyn", voteCount: 0},
		{id: 116, name: "Valmores, Camille", voteCount: 0},
		{id: 117, name: "Lumambas-Vasquez, Daisyrie", voteCount: 0},
		{id: 118, name: "Villamora, Giovanni", voteCount: 0},
		{id: 119, name: "Ya, Marjo", voteCount: 0},
		{id: 120, name: "Yap, Cheryl", voteCount: 0}
	],
*/