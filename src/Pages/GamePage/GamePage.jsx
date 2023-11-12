import React, { useState } from 'react';
import catUrl from '../../assets/images/cat1_brgfx.jpg';
import MemoryCard from '../../components/MemoryCard/MemoryCard';
import Timer from '../../components/TimerComponent/Timer';
import { createCardsArray } from '../../utils/createCardsArray';
import './GamePage.css';

const data = [
  {name: 'cat', image: catUrl,  }, {name: '3', image: catUrl,  }, {  name: '4', image: catUrl}, { name: 'dog', image: catUrl}, { name: '2', image: catUrl}, {  name: '6', image: catUrl}, 
  { name: 'mouse', image: catUrl}, {  name: '1', image: catUrl}, {  name: 66, image: catUrl}, {  name: '2', image: catUrl}, {  name: '8', image: catUrl},
  {  name: '9', image: catUrl}, {  name: '4', image: catUrl}
];

function GamePage() {  
  const cardsArray = createCardsArray(data, 12);
  const cardsData = cardsArray.map((card, index) => ({...card, isFlipped: false, id: index}));
  const [openedCards, setOpenedCards] = useState([]);
  const [cards, setCards] = useState(cardsData);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [score, setScore] = useState(0);
  
  React.useEffect(() => {
    if (!firstCard || !secondCard) {
      return;
    }

    console.log('check!');

    if (firstCard.name === secondCard.name) {
      setOpenedCards((prev) => [...prev, firstCard.name]);
    }

    setTimeout(() => {
      setFirstCard(null);
      setSecondCard(null);
    }, 1000);
    console.log('success!');
    
  }, [firstCard, secondCard]);

  const handleCardClick = (index) => {
    let chosenCard = cards[index];
    
    chosenCard.isFlipped = true;
    
    if (!firstCard) {
      setFirstCard(chosenCard);
      return;
    } 

    if (!secondCard) {
      setSecondCard(chosenCard);
      setScore((value) => value + 1);
      return;
    }
  };
  
  const resetGame = () => {
    setCards(cardsArray);
    setScore(0);
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
            {' '}
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
      </div>

      <button onClick={resetGame} style={{backgroundColor: 'gray'}}>reset</button>
    </div>
  );
}

export default GamePage;