import React, {useState, useEffect, useRef} from "react";
import axios from "axios"

import CardDraw from "./CardDraw";
import Card from "./Card";

const NewDeck = 'https://deckofcardsapi.com/api/deck/new/'

const CardBoard = () =>{
    const deckId = useRef();
    const [cards, setCards] = useState([]);
    useEffect(()=>{
        async function loadCard(){
            const res = await axios.get(NewDeck);
            deckId.current = res.data.deck_id;
        }
        loadCard();
    },[])
    async function Shuffle(){
        await axios.post(`https://deckofcardsapi.com/api/deck/${deckId.current}/shuffle/`)
        setCards([]);
    }
    async function drawCard(){
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`)
        const newCard = res.data.cards[0];
        setCards(cards => [...cards, newCard]);
        console.log(res.data, cards);
    }
    return (
        <div>
            
            <CardDraw drawCard={drawCard}/>
            <button onClick={Shuffle}>Shuffle</button>
            <div>
                {cards.length > 0? (cards.length < 52 ? (cards.map(({id, image})=> 
                <Card key={id} image={image}/>))
                : (alert('Error: no cards remaining!'))):(<p>No Card has drawn</p>)}
                
            </div>
        </div>
    )
}


export default CardBoard;
