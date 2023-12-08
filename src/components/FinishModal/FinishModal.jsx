import { useSelector } from 'react-redux';
import createResultString from '../../utils/createResultString';
import Button from '../Button';
import Loader from '../Loader';
import './FinishModal.css';

function FinishModal({closeModal}) {
  const score = useSelector((state) => state.result.score);
  const leaderboard = useSelector((state) => state.result.leaderboard);
  const time = useSelector((state) => state.result.time);
  const sortedResults = leaderboard.length > 0 ? [...leaderboard].sort((a, b) => a.score !== b.score ? a.score - b.score : a.time.minutes * 60 + a.time.seconds < b.time.minutes * 60 + b.time.seconds) : [];

  console.log(sortedResults);

  const resultStr = createResultString(score);

  {if (leaderboard === undefined) {
    return <Loader />;
  }}

  return (
    <div className='modal-wrapper'>
      <div className='finish-modal '>
        <h1 className='finish-modal__headline'>Поздравляем!</h1>
        <p className='finish-modal__greeting'>
          Ты молодец и прошёл игру за 
          {` ${resultStr} `} 
          и
          {` ${time.minutes}:${time.seconds} времени`}
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
                  <td className='finish-modal__leaderboard_time' key={`time-${i}`}>{`${result.time.minutes} : ${result.time.seconds}`}</td>
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