//stopped at 33min

import GameHeader from "./components/GameHeader";
import { Card } from "./components/Card";
import { useEffect, useState } from "react";
import WinMessage from "./components/WinMessage";

const cardValues = [
  "🦁",
  "🐼",
  "🐸",
  "🐙",
  "🦊",
  "🦉",
  "🐧",
  "🦈",
  "🦁",
  "🐼",
  "🐸",
  "🐙",
  "🦊",
  "🦉",
  "🐧",
  "🦈",
];


function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    //SHUFFLE THE CARDS
    const shuffled = shuffleArray(cardValues);

    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    console.log(finalCards);
    setCards(finalCards);
    setIsLocked(false);
    setMoves(0);
    setScore(0);
    setMatchedCards([]);
    setFlippedCards([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    //Dont allow clicking if card is already flipped or matched
    if (
      card.isFlipped ||
      card.isMatched ||
      isLocked ||
      flippedCards.length === 2
    ) {
      return;
    }

    //Update card flipped state
    const newCards = cards.map((c) => {
      //for the card that we clicked
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id]; //array of clicked card's id
    setFlippedCards(newFlippedCards);

    //check for match if two cards are flipped
    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];

      //if the emoji of first card is equal to the emoji of card that we are flipping rn
      if (firstCard.value === card.value) {
        //alert("Match");

        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          setScore((prev) => prev + 1); //increase score

          //Update card matched state

          setCards((prev) =>
            prev.map((c) => {
              //for the card that we clicked
              if (c.id === card.id || c.id === firstCard.id) {
                return { ...c, isMatched: true };
              } else {
                return c;
              }
            }),
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        //flip back card 1, card 2

        setTimeout(() => {
          const flippedBackCard = newCards.map((c) => {
            if (newFlippedCards.includes(c.id)) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });

          setCards(flippedBackCard);
          setIsLocked(false);
          setFlippedCards([]);
        }, 1000);
      }

      setMoves((prev) => prev + 1); //increase moves
    }
  };

  const isGameComplete = matchedCards.length === cardValues.length;

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />

      {isGameComplete && <WinMessage moves={moves} />}

      <div className="cards-grid">
        {cards.map((card) => (
          //each card or fruit is gonna be called ie a total of 16 times. so <Card/> component will be called 16 times with each cardValues or card object.
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
