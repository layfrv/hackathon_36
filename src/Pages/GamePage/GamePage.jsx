import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { images } from '../../cards';
import Button from '../../components/Button';
import FinishModal from '../../components/FinishModal';
import FirstModal from '../../components/FirstModal';
import MemoryCard from '../../components/MemoryCard/MemoryCard';
import Timer from '../../components/TimerComponent/Timer';
import { finishGame, startGame } from '../../features/gameSlice';
import { addToLeaderboard, saveScore } from '../../features/resultSlice';
import { createCardsArray } from '../../utils/createCardsArray';
import './GamePage.css';

function GamePage() {
  const cardsData = createCardsArray(images, 12);
  const [isOpenFirstModal, setOpenFirstModal] = useState(false);
  const [isOpenFinishModal, setOpenFinishModal] = useState(false);
  const [cards, setCards] = useState(cardsData);
  const [openedCards, setOpenedCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [score, setScore] = useState(0);
  const [isStartedStopwatch, setStartStopwatch] = useState(false);
  const [resetTime, setResetTime] = useState(false);

  const userName = useSelector(state => state.user.name);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userName) {
      setOpenFirstModal(true);
    } else {
      setOpenFirstModal(false);
      setResetTime(true);
      dispatch(startGame());
      setStartStopwatch(true);
    }
  }, [userName]);

  useEffect(() => {
    if (!firstCard || !secondCard) {
      return;
    }

    if (firstCard.name === secondCard.name) {
      firstCard.isAnimate = true;
      secondCard.isAnimate = true;
      setOpenedCards((prev) => [...prev, firstCard.name]);
    }

    setTimeout(() => {
      setFirstCard(null);
      setSecondCard(null);
    }, 1000);
  }, [firstCard, secondCard]);
  
  useEffect(() => {
    if (openedCards.length === cardsData.length / 2) {
      setStartStopwatch(false);
      dispatch(finishGame());
      dispatch(saveScore(score));
      dispatch(addToLeaderboard(userName));
      setOpenFinishModal(true);
    }
  }, [openedCards]);

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
    setStartStopwatch(false);
    dispatch(finishGame());
    setScore(0);
    setFirstCard(null);
    setSecondCard(null);
    setOpenedCards([]);
    setTimeout(() => {
      setCards(cardsData);
    }, 1000);
    setOpenFinishModal(false);
    setResetTime(true);
    setStartStopwatch(true);
  };

  return (
    <div className='game-page'>
      {isOpenFirstModal && <FirstModal isOpen={isOpenFirstModal} closeModal={() => setOpenFirstModal(false)} />}
      {isOpenFinishModal && <FinishModal isOpen={isOpenFinishModal} closeModal={resetGame} />}
      <div className='game-page__header'>
        <h1>Найди друга 🎈</h1>
        <p>Кликай на карточку и найди ей пару 🙈</p>
      </div>

      <div className='game-page__playground'>
        <div className='game-page__playground_header'>
          <p>
            Игрок:
            {' '}
            {userName}
          </p>
          <Timer isStarted={isStartedStopwatch} resetTime={resetTime} setResetTime={setResetTime}/>
          <p>
            Количество ходов:
            {' '}
            {score}
          </p>
        </div>
        <div className='game-page__playground_cards'>
          {cards.map((card, index) => (
            <MemoryCard
              imageUrl={card.image}
              name={card.name}
              id={card.id}
              key={index}
              onClick={handleCardClick}
              isFlipped={
                firstCard?.id === card.id ||
                secondCard?.id === card.id ||
                openedCards.includes(card.name)
              }
              isAnimate={card.isAnimate}
            />
          ))}
        </div>

        <Button label={'Начать заново'} onClick={resetGame} />
      </div>
    </div>
  );
}

export default GamePage;
