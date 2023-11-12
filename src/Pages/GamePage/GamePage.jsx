import React, { useCallback, useState } from 'react';
import catUrl from '../../assets/images/cat1_brgfx.jpg';
import MemoryCard from '../../components/MemoryCard/MemoryCard';
import Timer from '../../components/TimerComponent/Timer';
import { createCardsArray } from '../../utils/createCardsArray';
import './GamePage.css';

const data = [
  {name: 'cat', image: catUrl,  }, {name: 'cat', image: catUrl,  }, {  name: '3', image: catUrl}, { name: 'dog', image: catUrl}, { name: 'cat', image: catUrl}, {  name: '4', image: catUrl}, 
  { name: 'mouse', image: catUrl}, {  name: 'cat', image: catUrl}, {  name: 66, image: catUrl}, {  name: '2', image: catUrl}, {  name: 'cat', image: catUrl},
  {  name: 'cat', image: catUrl}, {  name: 'cat', image: catUrl}
];

function GamePage() {  
  const cardsArray = createCardsArray(data, 12);
  const cardsData = cardsArray.map((card, index) => ({...card, isFlipped: false, id: index}));

  const [cards, setCards] = useState(cardsData);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [score, setScore] = useState(0);

  const checkPair = useCallback(() => {
    if (!firstCard || !secondCard) {
      return;
    }

    if (firstCard.name !== secondCard.name) {
      setFirstCard({...firstCard, isFlipped: false});
      setSecondCard({...secondCard, isFlipped: false});
    } else {
      console.log('success!');
    }
  }, [firstCard, secondCard]);
  
  React.useEffect(() => {
    if (firstCard && secondCard) {
      checkPair();
      setFirstCard(null);
      setSecondCard(null);
    }
  }, [firstCard, secondCard]);

  const handleCardClick = (index) => {
    let chosenCard = cards[index];
    if (secondCard) {
      return;
    }

    chosenCard.isFlipped = true;

    if (!firstCard) {
      setFirstCard(chosenCard);
      return;
    } 
    setSecondCard(chosenCard);
    setScore((value) => value + 1);
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
            Игрок: 
            {'name'}
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
            key={index} onClick={handleCardClick} isFlipped={card.isFlipped}
          />)}
        </div>
      </div>

      <button onClick={resetGame} style={{backgroundColor: 'gray'}}>reset</button>
    </div>
  );
}

export default GamePage;