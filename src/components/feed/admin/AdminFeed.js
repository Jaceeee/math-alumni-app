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
		this.setState({
			candidates: [
				{id: 1, name: "Abcede, Francis Daryl", voteCount: 0, present: true, userName: "fabcede", password: this.hashFnv32a("Abcede, Francis Daryl", true)},
				{id: 2, name: "Albina, Julius", voteCount: 0, present: true, userName: "jalbina", password: this.hashFnv32a("Albina, Julius", true)},
				{id: 3, name: "Albiso, Romil", voteCount: 0, present: true, userName: "ralbiso", password: this.hashFnv32a("Albiso, Romil", true)},
				{id: 4, name: "Alcoseba, An Vinson", voteCount: 0, present: true, userName: "aalcoseba", password: this.hashFnv32a("Alcoseba, An Vinson", true)},
				{id: 5, name: "Ambrocio-Montajes, Bernadette", voteCount: 0, present: true, userName: "bambrocio-montajes", password: this.hashFnv32a("Ambrocio-Montajes, Bernadette", true)},
				{id: 6, name: "Andal, Zenar", voteCount: 0, present: true, userName: "zandal", password: this.hashFnv32a("Andal, Zenar", true)},
				{id: 7, name: "Ardiente, Kenneth", voteCount: 0, present: true, userName: "kardiente", password: this.hashFnv32a("Ardiente, Kenneth", true)},
				{id: 8, name: "Arias, Crisostomo", voteCount: 0, present: true, userName: "acrisostomo", password: this.hashFnv32a("Arias, Crisostomo", true)},
				{id: 9, name: "Babierra, Mark", voteCount: 0, present: true, userName: "mbabierra", password: this.hashFnv32a("Babierra, Mark", true)},
				{id: 10, name: "Bag-ao Dologan, Gwynn", voteCount: 0, present: true, userName: "gbag-aodologan", password: this.hashFnv32a("Bag-ao Dologan, Gwynn", true)},
				{id: 11, name: "Bagatsing, Jenny", voteCount: 0, present: true, userName: "jbagatsing", password: this.hashFnv32a("Bagatsing, Jenny", true)},
				{id: 12, name: "Balduman, Engelbert", voteCount: 0, present: true, userName: "ebalduman", password: this.hashFnv32a("Balduman, Engelbert", true)},
				{id: 13, name: "Bangos, Cathy", voteCount: 0, present: true, userName: "cbangos", password: this.hashFnv32a("Bangos, Cathy", true)},				
				{id: 14, name: "Barcelona, Rae", voteCount: 0, present: true, userName: "rbarcelona", password: this.hashFnv32a("Barcelona, Rae", true)},
				{id: 15, name: "Barredo, Odeza", voteCount: 0, present: true, userName: "obarredo", password: this.hashFnv32a("Barredo, Odeza", true)},
				{id: 16, name: "Barte, Jose Ferrer III", voteCount: 0, present: true, userName: "jbarte", password: this.hashFnv32a("Barte, Jose Ferrer III", true)},				
				{id: 17, name: "Batanay, Nino Paul", voteCount: 0, present: true, userName: "nbatanay", password: this.hashFnv32a("Batanay, Nino Paul", true)},
				{id: 18, name: "Bercero, Gaea Lolanthe", voteCount: 0, present: true, userName: "gbercero", password: this.hashFnv32a("Bercero, Gaea Lolanthe", true)},
				{id: 19, name: "Bollozos, Jade Lourdes", voteCount: 0, present: true, userName: "jbollozos", password: this.hashFnv32a("Bollozos, Jade Lourdes", true)},
				{id: 20, name: "Bubuli, Chyssa May Yares", voteCount: 0, present: true, userName: "cbubuli", password: this.hashFnv32a("Bubuli, Chyssa May Yares", true)},
				{id: 21, name: "Cadurnigara, Mariane Rose", voteCount: 0, present: true, userName: "mcadurnigara",password: this.hashFnv32a("Cadurnigara, Mariane Rose", true)},
				{id: 22, name: "Cajigas, Stephen Paul", voteCount: 0, present: true, userName: "scajigas", password: this.hashFnv32a("Cajigas, Stephen Paul", true)},
				{id: 23, name: "Caminero, Jay", voteCount: 0, present: true, userName: "jcaminero", password: this.hashFnv32a("Caminero, Jay", true)},
				{id: 24, name: "Candia, Jefferson", voteCount: 0, present: true, userName: "jcandia", password: this.hashFnv32a("Candia, Jefferson", true)},
				{id: 25, name: "Candia, Ma. Teresa Astillero", voteCount: 0, present: true, userName: "mcandia",password: this.hashFnv32a("Candia, Ma. Teresa Astillero", true)},
				{id: 26, name: "Carillo, Jesse Jasper", voteCount: 0, present: true, password: this.hashFnv32a("Carillo, Jesse Jasper", true)},
				{id: 27, name: "Castillo, Vanessa", voteCount: 0, present: true, userName: "vcastillo", password: this.hashFnv32a("Castillo, Vanessa", true)},
				{id: 28, name: "Catoc-Pulk, Marilou", voteCount: 0, present: true, userName: "mcatoc-pulk", password: this.hashFnv32a("Catoc-Pulk, Marilou", true)},
				{id: 29, name: "Ceniza, Neil", voteCount: 0, present: true, userName: "nceniza", password: this.hashFnv32a("Ceniza, Neil", true)},
				{id: 30, name: "Ceniza, Roselyn", voteCount: 0, present: true, userName: "rceniza", password: this.hashFnv32a("Ceniza, Roselyn", true)},
				{id: 31, name: "Chua, Riezl Cabanero", voteCount: 0, present: true, userName: "rchua", password: this.hashFnv32a("Chua, Riezl Cabanero", true)},
				{id: 32, name: "Coca, Christine Zoilo", voteCount: 0, present: true, userName: "ccoca", password: this.hashFnv32a("Coca, Christine Zoilo", true)},
				{id: 33, name: "Codinera-Yap , Jenny", voteCount: 0, present: true, userName: "jcodinera-yap", password: this.hashFnv32a("Codinera-Yap , Jenny", true)},				
				{id: 34, name: "Coronel, Maria Krista", voteCount: 0, present: true, userName: "mcoronel", password: this.hashFnv32a("Coronel, Maria Krista", true)},
				{id: 35, name: "De Guzman, Jannette", voteCount: 0, present: true, userName: "jdeguzman", password: this.hashFnv32a("De Guzman, Jannette", true)},
				{id: 36, name: "De Guzman, Natasha", voteCount: 0, present: true, userName: "ndeguzman", password: this.hashFnv32a("De Guzman, Natasha", true)},
				{id: 37, name: "Debajo, Marcelino", voteCount: 0, present: true, userName: "mdebajo", password: this.hashFnv32a("Debajo, Marcelino", true)},
				{id: 38, name: "Deiparine, Marve Eniola", voteCount: 0, present: true, userName: "mdeiparine", password: this.hashFnv32a("Deiparine, Marve Eniola", true)},
				{id: 39, name: "Demetrio, Lynniel Jo", voteCount: 0, present: true, userName: "ldemetrio", password: this.hashFnv32a("Demetrio, Lynniel Jo", true)},
				{id: 40, name: "Desucatan, Bernie", voteCount: 0, present: true, userName: "bdesucatan", password: this.hashFnv32a("Desucatan, Bernie", true)},
				{id: 41, name: "Mier-Dominise, Jennifer", voteCount: 0, present: true, userName: "jmier-dominise", password: this.hashFnv32a("Mier-Dominise, Jennifer", true)},
				{id: 42, name: "Dulaca, Ryan Ciriaco", voteCount: 0, present: true, userName: "rdulaca", password: this.hashFnv32a("Dulaca, Ryan Ciriaco", true)},
				{id: 43, name: "Enriquez, Sunshine", voteCount: 0, present: true, userName: "senriquez", password: this.hashFnv32a("Enriquez, Sunshine", true)},
				{id: 44, name: "Espana, Chris Dale", voteCount: 0, present: true, userName: "cespana", password: this.hashFnv32a("Espana, Chris Dale", true)},
				{id: 45, name: "Esperida, Mark Anthony", voteCount: 0, present: true, userName: "mesperida", password: this.hashFnv32a("Esperida, Mark Anthony", true)},
				{id: 46, name: "Espiritu-Vizcarra, Emma", voteCount: 0, present: true, userName: "eespiritu-vizcarra", password: this.hashFnv32a("Espiritu-Vizcarra, Emma", true)},
				{id: 47, name: "Esteban, Joseph", voteCount: 0, present: true, userName: "jesteban", password: this.hashFnv32a("Abcede, Francis Daryl", true)},
				{id: 48, name: "Estrera, Lindo Canillas", voteCount: 0, present: true, userName: "lestrera",password: this.hashFnv32a("Estrera, Lindo Canillas", true)},
				{id: 49, name: "Estrera, Maria Lumerica", voteCount: 0, present: true, userName: "mestrera",password: this.hashFnv32a("Estrera, Maria Lumerica", true)},
				{id: 50, name: "Fat-Yara, Jacqueline", voteCount: 0, present: true, userName: "jfat-yara", password: this.hashFnv32a("Fat-Yara, Jacqueline", true)},
				{id: 51, name: "Gabica, Dexter", voteCount: 0, present: true, userName: "dgabica", password: this.hashFnv32a("Gabica, Dexter", true)},
				{id: 52, name: "Genares, Reynan", voteCount: 0, present: true, userName: "rgenares", password: this.hashFnv32a("Genares, Reynan", true)},
				{id: 53, name: "Go-Nacion, Alice Mae", voteCount: 0, present: true, userName: "ago-nacion", password: this.hashFnv32a("Go-Nacion, Alice Mae", true)},
				{id: 54, name: "Gorre-Grecia, Jane Leslie", voteCount: 0, present: true, userName: "jgorre-grecia", password: this.hashFnv32a("Gorre-Grecia, Jane Leslie", true)},
				{id: 55, name: "Hernandez, Alva", voteCount: 0, present: true, userName: "ahernandez", password: this.hashFnv32a("Hernandez, Alva", true)},
				{id: 56, name: "Heruela, Marc", voteCount: 0, present: true, userName: "mheruela", password: this.hashFnv32a("Heruela, Marc", true)},
				{id: 57, name: "Itumay, Marianyl", voteCount: 0, present: true, userName: "mitumay", password: this.hashFnv32a("Itumay, Marianyl", true)},
				{id: 58, name: "Javier, Antonio", voteCount: 0, present: true, userName: "ajavier", password: this.hashFnv32a("Javier, Antonio", true)},
				{id: 59, name: "Jimenez, Fritz", voteCount: 0, present: true, userName: "fjimenez", password: this.hashFnv32a("Jimenez, Fritz", true)},
				{id: 60, name: "Lara, Francis", voteCount: 0, present: true, userName: "flara", password: this.hashFnv32a("Lara, Francis", true)},
				{id: 61, name: "Librero, Joseph", voteCount: 0, present: true, userName: "jlibrero", password: this.hashFnv32a("Librero, Joseph", true)},
				{id: 62, name: "Limboy, Janine", voteCount: 0, present: true, userName: "jlimboy", password: this.hashFnv32a("Limboy, Janine", true)},
				{id: 63, name: "Lipardo, Caren", voteCount: 0, present: true, userName: "clipardo", password: this.hashFnv32a("Lipardo, Caren", true)},
				{id: 64, name: "Lopez, Rossveth", voteCount: 0, present: true, userName: "rlopez", password: this.hashFnv32a("Lopez, Rossveth", true)},
				{id: 65, name: "Lubino, Kay", voteCount: 0, present: true, userName: "klubino", password: this.hashFnv32a("Lubino, Kay", true)},
				{id: 66, name: "Lui-Ramos, Janet", voteCount: 0, present: true, userName: "jlui-ramos", password: this.hashFnv32a("Lui-Ramos, Janet", true)},
				{id: 67, name: "Madelo, Edwilyn", voteCount: 0, present: true, userName: "emadelo", password: this.hashFnv32a("Madelo, Edwilyn", true)},
				{id: 68, name: "Magallanes, Philip", voteCount: 0, present: true, userName: "pmagallanes", password: this.hashFnv32a("Magallanes, Philip", true)},
				{id: 69, name: "Manalang, Sheryl", voteCount: 0, present: true, userName: "smanalang", password: this.hashFnv32a("Manalang, Sheryl", true)},
				{id: 70, name: "Manlangit-Gozon, Jore Jean", voteCount: 0, present: true, userName: "jmanlangit-gozon",  password: this.hashFnv32a("Manlangit-Gozon, Jore Jean", true)},
				{id: 71, name: "Mantilla, Marga", voteCount: 0, present: true, userName: "mmantilla", password: this.hashFnv32a("Mantilla, Marga", true)},
				{id: 72, name: "Maratas, Jeremy", voteCount: 0, present: true, userName: "jmaratas", password: this.hashFnv32a("Maratas, Jeremy", true)},
				{id: 73, name: "Matillano, Neil", voteCount: 0, present: true, userName: "nmatillano", password: this.hashFnv32a("Matillano, Neil", true)},
				{id: 74, name: "Melleza, Issa Joanna Ariza", voteCount: 0, present: true, userName: "imelleza", password: this.hashFnv32a("Melleza, Issa Joanna Ariza", true)},
				{id: 75, name: "Mercado, Guia", voteCount: 0, present: true, userName: "gmercado", password: this.hashFnv32a("Mercado, Guia", true)},
				{id: 76, name: "Mercado, Lana", voteCount: 0, present: true, userName: "lmercado", password: this.hashFnv32a("Mercado, Lana", true)},
				{id: 77, name: "Merlin, Mavy Nineza", voteCount: 0, present: true, userName: "mmerlin", password: this.hashFnv32a("Merlin, Mavy Nineza", true)},
				{id: 78, name: "Metoda, Christine Marie", voteCount: 0, present: true, userName: "cmetoda", password: this.hashFnv32a("Metoda, Christine Marie", true)},
				{id: 79, name: "Minoza, Dancel Marie", voteCount: 0, present: true, userName: "dminoza", password: this.hashFnv32a("Minoza, Dancel Marie", true)},
				{id: 80, name: "Mira, Arim", voteCount: 0, present: true, userName: "amira", password: this.hashFnv32a("Mira, Arim", true)},
				{id: 81, name: "Miranda-Rago, Cymbeline", voteCount: 0, present: true, userName: "cmiranda-rago", password: this.hashFnv32a("Miranda-Rago, Cymbeline", true)},
				{id: 82, name: "Miro, Ryan", voteCount: 0, present: true, userName: "rmiro", password: this.hashFnv32a("Miro, Ryan", true)},
				{id: 83, name: "Montajes, Raymund", voteCount: 0, present: true, userName: "rmontajes", password: this.hashFnv32a("Montajes, Raymund", true)},
				{id: 84, name: "Bontigao-Nardo, Grecedes", voteCount: 0, present: true, userName: "gbontigao-nardo", password: this.hashFnv32a("Bontigao-Nardo, Grecedes", true)},
				{id: 85, name: "Olano, Mafe", voteCount: 0, present: true, userName: "molano", password: this.hashFnv32a("Olano, Mafe", true)},
				{id: 86, name: "Omerez, Ariel", voteCount: 0, present: true, userName: "aomerez", password: this.hashFnv32a("Omerez, Ariel", true)},
				{id: 87, name: "Palen, Dave", voteCount: 0, present: true, userName: "dpalen", password: this.hashFnv32a("Palen, Dave", true)},
				{id: 88, name: "Avergonzado-Pangalangan, Malou", voteCount: 0, present: true, userName: "mavergonzado-pangalangan", password: this.hashFnv32a("Avergonzado-Pangalangan, Malou", true)},
				{id: 89, name: "Pantoja, Christian", voteCount: 0, present: true, userName: "cpantoja", password: this.hashFnv32a("Pantoja, Christian", true)},
				{id: 90, name: "Patindol, Tigran", voteCount: 0, present: true, userName: "tpatindol", password: this.hashFnv32a("Patindol, Tigran", true)},
				{id: 91, name: "Penon, Jim Irvin", voteCount: 0, present: true, userName: "jpenon", password: this.hashFnv32a("Penon, Jim Irvin", true)},
				{id: 92, name: "Plenos, Haydee", voteCount: 0, present: true, userName: "hplenos", password: this.hashFnv32a("Plenos, Haydee", true)},
				{id: 93, name: "Razonable, Steven", voteCount: 0, present: true, userName: "srazonable", password: this.hashFnv32a("Razonable, Steven", true)},
				{id: 94, name: "Remirata, Alger", voteCount: 0, present: true, userName: "aremirata", password: this.hashFnv32a("Remirata, Alger", true)},
				{id: 95, name: "Reyes, Michelle", voteCount: 0, present: true, userName: "mreyes", password: this.hashFnv32a("Reyes, Michelle", true)},
				{id: 96, name: "Rizal, Reina", voteCount: 0, present: true, userName: "rrizal", password: this.hashFnv32a("Rizal, Reina", true)},
				{id: 97, name: "Rodelas-Canama, Ronnie Lynn", voteCount: 0, present: true, userName: "rrodelas-canama", password: this.hashFnv32a("Rodelas-Canama, Ronnie Lynn", true)},
				{id: 98, name: "Romeo, Daisy", voteCount: 0, present: true, userName: "dromeo", password: this.hashFnv32a("Romeo, Daisy", true)},
				{id: 99, name: "Rosell, Joshua", voteCount: 0, present: true, userName: "jrosell", password: this.hashFnv32a("Rosell, Joshua", true)},
				{id: 100, name: "Sagayno-Oplado, Mary Joy", voteCount: 0, present: true, userName: "msagayno-oplado", password: this.hashFnv32a("Sagayno-Oplado, Mary Joy", true)},
				{id: 101, name: "Salces, Cary", voteCount: 0, present: true, userName: "csalces", password: this.hashFnv32a("Salces, Cary", true)},
				{id: 102, name: "Samson, Alyssa Lorraine", voteCount: 0, present: true, userName: "asamson", password: this.hashFnv32a("Samson, Alyssa Lorraine", true)},
				{id: 103, name: "Sevilla-Esmero, Darlene", voteCount: 0, present: true, userName: "dsevilla-esmero", password: this.hashFnv32a("Sevilla-Esmero, Darlene", true)},
				{id: 104, name: "Sia-Chu, Cherry Joy", voteCount: 0, present: true, userName: "csia-chu", password: this.hashFnv32a("Sia-Chu, Cherry Joy", true)},
				{id: 105, name: "Sicisc, Cyril", voteCount: 0, present: true, userName: "csicisc", password: this.hashFnv32a("Sicisc, Cyril", true)},
				{id: 106, name: "Solon, Claudine", voteCount: 0, present: true, userName: "csolon", password: this.hashFnv32a("Solon, Claudine", true)},
				{id: 107, name: "Soria, Francis", voteCount: 0, present: true, userName: "fsoria", password: this.hashFnv32a("Soria, Francis", true)},
				{id: 108, name: "Suico, Celedon Erpurt", voteCount: 0, present: true, userName: "csuico", password: this.hashFnv32a("Suico, Celedon Erpurt", true)},
				{id: 109, name: "Tabornal, Racquel", voteCount: 0, present: true, userName: "rtabornal", password: this.hashFnv32a("Tabornal, Racquel", true)},
				{id: 110, name: "Talam, Francis", voteCount: 0, present: true, userName: "ftalam", password: this.hashFnv32a("Talam, Francis", true)},
				{id: 111, name: "Tamala, Nelson", voteCount: 0, present: true, userName: "ntamala", password: this.hashFnv32a("Tamala, Nelson", true)},
				{id: 112, name: "Tan, Julie Ann", voteCount: 0, present: true, userName: "jtan", password: this.hashFnv32a("Tan, Julie Ann", true)},
				{id: 113, name: "Tariman, Kareen", voteCount: 0, present: true, userName: "ktariman", password: this.hashFnv32a("Tariman, Kareen", true)},
				{id: 114, name: "Te, Jennifer", voteCount: 0, present: true, userName: "jte", password: this.hashFnv32a("Te, Jennifer", true)},
				{id: 115, name: "Trompeta-Layosa, Judie Lyn", voteCount: 0, present: true, userName: "jtrompeta-layosa", password: this.hashFnv32a("Trompeta-Layosa, Judie Lyn", true)},
				{id: 116, name: "Valmores, Camille", voteCount: 0, present: true, userName: "cvalmores", password: this.hashFnv32a("Valmores, Camille", true)},
				{id: 117, name: "Lumambas-Vasquez, Daisyrie", voteCount: 0, present: true, userName: "dlumambas-vasquez", password: this.hashFnv32a("Lumambas-Vasquez, Daisyrie", true)},
				{id: 118, name: "Villamora, Giovanni", voteCount: 0, present: true, userName: "gvillamora", password: this.hashFnv32a("Villamora, Giovanni", true)},
				{id: 119, name: "Ya, Marjo", voteCount: 0, present: true, userName: "mya", password: this.hashFnv32a("Ya, Marjo", true)},
				{id: 120, name: "Yap, Cheryl", voteCount: 0, present: true, userName: "cyap", password: this.hashFnv32a("Yap, Cheryl", true)}
			],
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