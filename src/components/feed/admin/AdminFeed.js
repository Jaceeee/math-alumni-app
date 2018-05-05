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

/*
this.setState({
			candidates: [
				{ id: 1, 
					name: "Abcede, Francis Daryl", 
					voteCount: 0, 
					present: false, 
					voted: false, 
					password: "f6a3a0cd", 
					userName: "fabcede"
				},
				{id: 2, 
					name: "Albina, Julius", 
					voteCount: 0, 
					present: false, 
					voted: false,
					userName: "jalbina", 
					password: "a884fb46"
				},
				{id: 3, 
					name: "Albiso, Romil", 
					voteCount: 0, 
					present: false, 
					voted: false, 
					userName: "ralbiso", 
					password: "ce302d16"
				},
				{id: 4, 
					name: "Alcoseba, An Vinson", 
					voteCount: 0, 
					present: false,
					voted: false, 
					userName: "aalcoseba", 
					password: "110bb8ef"
				},
				{id: 5, 
					name: "Ambrocio-Montajes, Bernadette", 
					voteCount: 0, 
					present: false, 
					voted: false, 
					userName: "bambrocio-montajes",
					password: "6962d62f"},
				{id: 6, 
					name: "Andal, Zenar", 
					voteCount: 0, 
					present: false,					
					voted: false, 
					userName: "zandal",
					password: "04744ad3"
				},
				{id: 7, 
					name: "Ardiente, Kenneth", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "kardiente",
					password: "8831c52c"
				},
				{id: 8, 
					name: "Arias, Crisostomo", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "acrisostomo",
					password: "c0463ed3"
				},
				{id: 9, 
					name: "Babierra, Mark", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mbabierra",
					password: "a44a0d22"
				},
				{id: 10, 
					name: "Bag-ao Dologan, Gwynn", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "gbag-aodologan",
					password: "7ea1f923"
				},
				{id: 11, 
					name: "Bagatsing, Jenny", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jbagatsing",
					password: "5eea4d41"
				},
				{id: 12, 
					name: "Balduman, Engelbert", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "ebalduman",
					password: "2cdf3c61"
				},
				{id: 13, 
					name: "Bangos, Cathy", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "cbangos",
					password: "459f85c8"
				},				
				{id: 14, 
					name: "Barcelona, Rae", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "rbarcelona",
					password: "a31fe502"
				},
				{id: 15, 
					name: "Barredo, Odeza", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "obarredo",
					password: "dd24d69d"
				},
				{id: 16, 
					name: "Barte, Jose Ferrer III", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jbarte",
					password: "06ff6e01"
				},				
				{id: 17, 
					name: "Batanay, Nino Paul", 
					voteCount: 0,
					present: false,
					voted: false,
					userName: "nbatanay",
					password: "8529938b"
				},
				{id: 18, 
					name: "Bercero, Gaea Lolanthe", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "gbercero",
					password: "f9591f56"
				},
				{id: 19, 
					name: "Bollozos, Jade Lourdes", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jbollozos",
					password: "7fae0335"
				},
				{id: 20, 
					name: "Bubuli, Chyssa May Yares", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "cbubuli",
					password: "5a7bd2f8"
				},			
				{id: 21, 
					name: "Cadurnigara, Mariane Rose", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mcadurnigara",
					password: "de7ce806"
				},
				{id: 22, 
					name: "Cajigas, Stephen Paul", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "scajigas",
					password: "14551264"
				},
				{id: 23, 
					name: "Caminero, Jay", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jcaminero",
					password: "f3141b93"
				},
				{id: 24, 
					name: "Candia, Jefferson", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jcandia",
					password: "5b6f5075"
				},
				{id: 25, 
					name: "Candia, Ma. Teresa Astillero", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mcandia",
					password: "cf6e1bae"
				},
				{id: 26, 
					name: "Carillo, Jesse Jasper", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jcarillo",
					password: "b419170a"
				},
				{id: 27, 
					name: "Castillo, Vanessa", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "vcastillo",
					password: "ff9ab3fb"
				},
				{id: 28, 
					name: "Catoc-Pulk, Marilou", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mcatoc-pulk",
					password: "15df43b3"
				},
				{id: 29, 
					name: "Ceniza, Neil", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "nceniza",
					password: "164180dd"
				},
				{id: 30, 
					name: "Ceniza, Roselyn", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "rceniza",
					password: "76ff16f5"
				},
				{id: 31, 
					name: "Chua, Riezl Cabanero", 
					voteCount: 0,
					present: false,
					voted: false,
					userName: "rchua",
					password: "b105a921"},
				{id: 32, 
					name: "Coca, Christine Zoilo", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "ccoca",
					password: "70836153"
				},
				{id: 33, 
					name: "Codinera-Yap , Jenny", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jcodinera-yap",
					password: "5d1ecfdb"
				},				
				{id: 34, 
					name: "Coronel, Maria Krista", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mcoronel",
					password: "5edb0e77"
				},
				{id: 35, 
					name: "De Guzman, Jannette", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jdeguzman",
					password: "622bcbd7"
				},
				{id: 36, 
					name: "De Guzman, Natasha", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "ndeguzman",
					password: "f86a6c28"
				},
				{id: 37, 
					name: "Debajo, Marcelino", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mdebajo",
					password: "f3df44f8"
				},
				{id: 38, 
					name: "Deiparine, Marve Eniola", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mdeiparine",
					password: "bf08e361"
				},
				{id: 39, 
					name: "Demetrio, Lynniel Jo", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "ldemetrio",
					password: "e8b5fdb0"
				},
				{id: 40, 
					name: "Desucatan, Bernie", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "bdesucatan",
					password: "0c529f02"
				},
				{id: 41, 
					name: "Mier-Dominise, Jennifer", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jmier-dominise",
					password: "3d7719bc"
				},
				{id: 42, 
					name: "Dulaca, Ryan Ciriaco", 
					voteCount: 0, 					
					present: false,
					voted: false,
					userName: "rdulaca",
					password: "2d4259cd"
				},
				{id: 43, 
					name: "Enriquez, Sunshine", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "senriquez",
					password: "917fb07f"
				},
				{id: 44, 
					name: "Espana, Chris Dale", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "cespana",
					password: "a9a164b6"
				},
				{id: 45, 
					name: "Esperida, Mark Anthony", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mesperida",
					password: "f13bf70c"
				},
				{id: 46, 
					name: "Espiritu-Vizcarra, Emma", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "eespiritu-vizcarra",
					password: "48f83ff3"
				},
				{id: 47, 
					name: "Esteban, Joseph", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jesteban",
					password: "f6a3a0cd"
				},
				{id: 48, 
					name: "Estrera, Lindo Canillas", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "lestrera",
					password: "beb5a848"
				},
				{id: 49, 
					name: "Estrera, Maria Lumerica", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mestrera",
					password: "54ed84fd"
				},
				{id: 50, 
					name: "Fat-Yara, Jacqueline", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jfat-yara",
					password: "7d418981"
				},
				{id: 51, 
					name: "Gabica, Dexter", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "dgabica,",
					password: "8a463dbc"
				},
				{id: 52, 
					name: "Genares, Reynan", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "rgenares",
					password: "8b99045f"
				},
				{id: 53, 
					name: "Go-Nacion, Alice Mae", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "ago-nacion",
					password: "ae300173"
				},
				{id: 54, 
					name: "Gorre-Grecia, Jane Leslie", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jgorre-grecia",
					password: "d58fa4dc"
				},
				{id: 55, 
					name: "Hernandez, Alva", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "ahernandez",
					password: "2e667200"
				},
				{id: 56, 
					name: "Heruela, Marc", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mheruela",
					password: "40c143c0"
				},
				{id: 57, 
					name: "Itumay, Marianyl", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mitumay",
					password: "ba15380d"
				},
				{id: 58, 
					name: "Javier, Antonio", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "ajavier",
					password: "76f0e50e"
				},
				{id: 59, 
					name: "Jimenez, Fritz", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "fjimenez",
					password: "9841b874"
				},
				{id: 60, 
					name: "Lara, Francis", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "flara",
					password: "993afaed"
				},
				{id: 61, 
					name: "Librero, Joseph", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jlibrero",
					password: "e7be575d"
				},
				{id: 62, 
					name: "Limboy, Janine", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jlimboy",
					password: "4d5a6d7c"
				},
				{id: 63, 
					name: "Lipardo, Caren", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "clipardo",
					password: "401e3961"
				},
				{id: 64, 
					name: "Lopez, Rossveth", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "rlopez",
					password: "5555fdab"
				},
				{id: 65, 
					name: "Lubino, Kay", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "klubino",
					password: "bdbc51e7"
				},
				{id: 66, 
					name: "Lui-Ramos, Janet", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jlui-ramos",
					password: "75f00c46"
				},
				{id: 67, 
					name: "Madelo, Edwilyn", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "emadelo",
					password: "c9cbdd5b"
				},
				{id: 68, 
					name: "Magallanes, Philip", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "pmagallanes",
					password: "98f64fe0"
				},
				{id: 69, 
					name: "Manalang, Sheryl", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "smanalang",
					password: "7d5d4ae7"
				},
				{id: 70, 
					name: "Manlangit-Gozon, Jore Jean", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jmanlangit-gozon",
					password: "e75f0ae2"
				},
				{id: 71, 
					name: "Mantilla, Marga", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mmantilla",
					password: "f296470d"
				},
				{id: 72, 
					name: "Maratas, Jeremy", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jmaratas",
					password: "cd3b96ec"
				},
				{id: 73, 
					name: "Matillano, Neil", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "nmatillano",
					password: "86d19e78"
				},
				{id: 74, 
					name: "Melleza, Issa Joanna Ariza", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "imelleza",
					password: "98905d63"
				},
				{id: 75, 
					name: "Mercado, Guia", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "gmercado",
					password: "96c16a10"
				},
				{id: 76, 
					name: "Mercado, Lana", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "lmercado",
					password: "303ab918"
				},
				{id: 77, 
					name: "Merlin, Mavy Nineza", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mmerlin",
					password: "97fbd836"
				},
				{id: 78, 
					name: "Metoda, Christine Marie", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "cmetoda",
					password: "4335a374"
				},
				{id: 79, 
					name: "Minoza, Dancel Marie", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "dminoza",
					password: "9b8253e6"
				},
				{id: 80, 
					name: "Mira, Arim", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "amira",
					password: "e444cc77"
				},
				{id: 81, 
					name: "Miranda-Rago, Cymbeline", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "cmiranda-rago",
					password: "0a23577b"
				},
				{id: 82, 
					name: "Miro, Ryan", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "rmiro",
					password: "ac831796"
				},
				{id: 83, 
					name: "Montajes, Raymund", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "rmontajes",
					password: "9ab93410"
				},
				{id: 84, 
					name: "Bontigao-Nardo, Grecedes", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "gbontigao-nardo",
					password: "5122e4cd"
				},
				{id: 85, 
					name: "Olano, Mafe", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "molano",
					password: "35985955"
				},
				{id: 86, 
					name: "Omerez, Ariel", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "aomerez",
					password: "56370634"
				},
				{id: 87, 
					name: "Palen, Dave", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "dpalen",
					password: "6883a56f"
				},
				{id: 88, 
					name: "Avergonzado-Pangalangan, Malou", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mavergonzado-pangalangan",
					password: "73d2a464"
				},
				{id: 89, 
					name: "Pantoja, Christian", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "cpantoja",
					password: "ed660e5f"
				},
				{id: 90, 
					name: "Patindol, Tigran", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "tpatindol",
					password: "968e0685"
				},
				{id: 91, 
					name: "Penon, Jim Irvin", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jpenon",
					password: "20fe9f37"
				},
				{id: 92, 
					name: "Plenos, Haydee", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "hplenos",
					password: "c47364c8"
				},
				{id: 93, 
					name: "Razonable, Steven", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "srazonable",
					password: "2f4828c8"
				},
				{id: 94, 
					name: "Remirata, Alger", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "aremirata",
					password: "282a9131"
				},
				{id: 95, 
					name: "Reyes, Michelle", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mreyes",
					password: "541e3084"
				},
				{id: 96, 
					name: "Rizal, Reina", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "rrizal",
					password: "b541e934"
				},
				{id: 97, 
					name: "Rodelas-Canama, Ronnie Lynn", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "rrodelas-canama",
					password: "f33e3f43"
				},
				{id: 98, 
					name: "Romeo, Daisy", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "dromeo",
					password: "135954a9"
				},
				{id: 99, 
					name: "Rosell, Joshua", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jrosell",
					password: "723f4918"
				},
				{id: 100, 
					name: "Sagayno-Oplado, Mary Joy", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "msagayno-oplado",
					password: "2bad1c16"
				},
				{id: 101, 
					name: "Salces, Cary", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "csalces",
					password: "b12175b1"
				},
				{id: 102, 
					name: "Samson, Alyssa Lorraine", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "asamson",
					password: "018ce789"
				},
				{id: 103, 
					name: "Sevilla-Esmero, Darlene", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "dsevilla-esmero",
					password: "b7d12b80"
				},
				{id: 104, 
					name: "Sia-Chu, Cherry Joy", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "csia-chu",
					password: "70cf35fc"
				},
				{id: 105, 
					name: "Sicisc, Cyril", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "csicisc",
					password: "27ce769a"
				},
				{id: 106, 
					name: "Solon, Claudine", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "csolon",
					password: "8eeae5e7"
				},
				{id: 107, 
					name: "Soria, Francis", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "fsoria",
					password: "51c9bd47"
				},
				{id: 108, 
					name: "Suico, Celedon Erpurt", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "csuico",
					password: "b7e65ca0"
				},
				{id: 109, 
					name: "Tabornal, Racquel", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "rtabornal",
					password: "f750dd31"
				},
				{id: 110, 
					name: "Talam, Francis", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "ftalam",
					password: "e4413048"
				},
				{id: 111, 
					name: "Tamala, Nelson", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "ntamala",
					password: "bd240ada"
				},
				{id: 112, 
					name: "Tan, Julie Ann", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jtan",
					password: "d8b3dd12"
				},
				{id: 113, 
					name: "Tariman, Kareen", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "ktariman",
					password: "1bcb0037"
				},
				{id: 114, 
					name: "Te, Jennifer", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jte",
					password: "d88eb51f"
				},
				{id: 115, 
					name: "Trompeta-Layosa, Judie Lyn", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "jtrompeta-layosa",
					password: "5069cecd"
				},
				{id: 116, 
					name: "Valmores, Camille", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "cvalmores",
					password: "39ccd113"
				},
				{id: 117, 
					name: "Lumambas-Vasquez, Daisyrie", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "dlumambas-vasquez",
					password: "123938ab"
				},
				{id: 118, 
					name: "Villamora, Giovanni", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "gvillamora",
					password: "c888896d"
				},
				{id: 119, 
					name: "Ya, Marjo", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "mya",
					password: "f8fe640a"
				},
				{id: 120, 
					name: "Yap, Cheryl", 
					voteCount: 0, 
					present: false,
					voted: false,
					userName: "cyap",
					password: "3af03218"}
			],
		});
*/