import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import createResultString from '../../utils/createResultString';
import Button from '../Button';
import Loader from '../Loader';
import './FinishModal.css';

function FinishModal({closeModal, isOpen}) {
  const score = useSelector((state) => state.result.score);
  const leaderboard = useSelector((state) => state.result.leaderboard);
  const time = useSelector((state) => state.result.time);
  const sortedResults = leaderboard.length > 0 ? [...leaderboard].sort((a, b) => a.score !== b.score ? a.score - b.score : a.time - b.time) : [];

  const resultStr = createResultString(score);
  
  const minutes = Math.trunc((time / 60));
  const seconds = time % 60;

  const modalRef = useRef(null);
  const modalWrapperRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (modalWrapperRef.current) {
          modalWrapperRef.current.classList.add('wrapper-show');
        }
      }, 1000);
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.classList.add('opened-modal');
        }
      }, 1500);
    }
  }, [isOpen, closeModal]);

  {if (leaderboard === undefined) {
    return <Loader />;
  }}

  return (
    <div ref={modalWrapperRef} className='modal-wrapper'>
      <div ref={modalRef} className='finish-modal'>
        <h1 className='finish-modal__headline'>Поздравляем!</h1>
        <p className='finish-modal__greeting'>
          Ты молодец и прошёл игру за 
          {` ${resultStr} `} 
          и
          {` ${minutes}:${seconds} времени`}
          !
        </p>
        <div className='table-wrapper'>
          <table className='finish-modal__leaderboard'>
            <thead>
              <tr>
                <th className='finish-modal__leaderboard_headline'>Игрок</th>
                <th className='finish-modal__leaderboard_headline'>Кол-во ходов</th>
                <th className='finish-modal__leaderboard_headline'>Время</th>
              </tr>
            </thead>
            <tbody>
              {sortedResults.map((result, i) => (
                <tr key={i}>
                  <td key={`name-${i}`}>{result.name}</td>
                  <td className='finish-modal__leaderboard_score' key={`score-${i}`}>{result.score}</td>
                  <td className='finish-modal__leaderboard_time' key={`time-${i}`}> 
                    {`${Math.trunc(result.time / 60)} : ${result.time % 60}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button label='Играть заново' onClick={closeModal} />
      </div>
    </div>
  );
}

export default FinishModal;