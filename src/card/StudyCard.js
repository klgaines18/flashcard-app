import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readCard, readDeck } from "../utils/api";
import Nextbtn from "./NextBtn";


function StudyCard() {
  const [deck, setDeck] = useState({})
  const [cards, setCards] = useState({})
  const [card, setCard] = useState({})
  const [cardNum, setCardNum] = useState(1)
  const [lastCard, setLastCard] = useState(false)
  const [cardFront, setCardFront] = useState(true)
  const [cardText, setCardText] = useState("")
  const { deckId } = useParams(); 
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)

    return () => abortController.abort();
  }, [deckId]);

  useEffect(() => {
    if(deck.id) {
      setCards(deck.cards)
    }
  }, [deck.id])

  useEffect(() => {
    if(cards.length) {
      setCard(cards[cardNum - 1])
    }
    
    if (cardNum === cards.length) {
      setLastCard(true)
    }
  }, [cardNum, cards.length]);

  useEffect(() => {
    if(card.id) {
      if(cardFront) {
        setCardText(card.front)
      } else {
        setCardText(card.back)
      }
    }
  }, [card.id, cardFront])


  const handleFlip = (event) => {
    setCardFront(!cardFront)
  };

  const handleNext  = (event) => {
    if (lastCard) {
      const result = window.confirm("Restart cards? Click cancel to return to the home page");
      if (result) {
        setCardNum(1)
        setLastCard(false)
        setCardFront(true)
      } else {
        history.push("/");
      }
    } else {
      setCardNum(cardNum + 1)
      setCardFront(true)
    }
  }


  if (cards.length < 3) {
    return (
      <div>
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mx-2">Add Cards</Link>
      </div>
    )
  }

  
  return (
    <div class="card" >
      <div class="card-body">
        <h5 class="card-title">Card {cardNum} of {cards.length}</h5>
        <p class="card-text">{cardText}</p>
        <button className="btn btn-secondary mx-2" onClick={handleFlip}>
            Flip
        </button>
        <Nextbtn handleNext={handleNext} cardFront={cardFront} />
      </div>
    </div>
  )

}

export default StudyCard