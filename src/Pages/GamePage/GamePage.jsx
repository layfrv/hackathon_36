import React, { useState } from 'react';
import { images } from '../../assets/cards';
import Button from '../../components/Button';
import MemoryCard from '../../components/MemoryCard/MemoryCard';
import Timer from '../../components/TimerComponent/Timer';
import { createCardsArray } from '../../utils/createCardsArray';
import './GamePage.css';

function GamePage() {  
  const cardsData = createCardsArray(images, 12);
  
  const [cards, setCards] = useState(cardsData);
  const [openedCards, setOpenedCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [score, setScore] = useState(0);
  
  React.useEffect(() => {
    if (!firstCard || !secondCard) {
      return;
    }

    if (firstCard.name === secondCard.name) {
      setOpenedCards((prev) => [...prev, firstCard.name]);
    }

    setTimeout(() => {
      setFirstCard(null);
      setSecondCard(null);
    }, 1000);
  }, [firstCard, secondCard]);

  const handleCardClick = (id) => {
    let chosenCard = cards[id];
    
    if (!firstCard) {
      setFirstCard(chosenCard);
      chosenCard.isFlipped = true;
      return;
    } 

    if (!secondCard) {
      if (chosenCard.id === firstCard.id) {
        return;
      }
      setSecondCard(chosenCard);
      chosenCard.isFlipped = true;
      setScore((value) => value + 1);
      return;
    }
  };
  
  const resetGame = () => {
    setScore(0);
    setFirstCard(null);
    setSecondCard(null);
    setOpenedCards([]);
    setTimeout(() => {
      setCards(cardsData);
    }, 1000);
  };
  
  return (
    <div className='game-page'>
      <div className='game-page__header'>
        <h1>Найди друга 🎈</h1>
        <p>Кликай на карточку и найди ей пару</p>
      </div>

      <div className='game-page__playground'>
        <div className='game-page__playground_header'>
          <p>
            Игрок
          </p>
          <Timer />
          <p>
            Количество ходов: 
            {score}
          </p>
        </div>
        <div className='game-page__playground_cards'>
          {cards.map((card, index) => <MemoryCard imageUrl={card.image}
            name={card.name} id={card.id}
            key={index} onClick={handleCardClick} isFlipped={firstCard?.id === card.id || secondCard?.id === card.id || openedCards.includes(card.name)}
          />)}
        </div>
         
        <Button label={'Начать заново'} onClick={resetGame} />
       
      </div>
    </div>
  );
}

export default GamePage;