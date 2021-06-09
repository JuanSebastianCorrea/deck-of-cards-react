import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const API_BASE_URL = 'http://deckofcardsapi.com/api/deck';

const Deck = () => {
	const [ deck, setDeck ] = useState(null);
	const [ drawnCards, setDrawnCards ] = useState([]);

	useEffect(() => {
		async function getData() {
			let d = await axios.get(`${API_BASE_URL}/new/shuffle`);
			setDeck(d.data);
		}
		getData();
	}, []);

	async function drawCard() {
		let { deck_id } = deck;

		try {
			let res = await axios.get(`${API_BASE_URL}/${deck_id}/draw`);
			if (res.data.remaining === 0) {
				throw new Error('No cards left!');
			}
			console.log(res.data);
			console.log(res.data.remaining);

			const card = res.data.cards[0];

			setDrawnCards((d) => [
				...d,
				{
					id: card.code,
					name: card.suit + ' ' + card.value,
					image: card.image
				}
			]);
		} catch (error) {
			alert(error);
		}
	}

	const cards = drawnCards.map((c) => <Card image={c.image} name={c.name} key={c.id} />);

	return (
		<div>
			<button onClick={drawCard}>GIMME A CARD</button>
			<h1>Card</h1>
			<div>{cards}</div>
		</div>
	);
};

export default Deck;
