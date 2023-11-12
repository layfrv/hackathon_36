import './FinishModal.css';

function FinishModal() {
  return (
    <div className='finish-modal'>
      <div className="container">
        <div className="modal">
          <h1 className="modal__headline">Поздравляем!</h1>
          <p className="modal__greeting">Ты молодец и прошёл игру за <span className="modal__moves">_#_</span> ходов!</p>
          <!-- <table className="modal__leaderboard">
            <tr>
              <td>
                <th className="modal__leaderboard_headline">Игрок</th>
              </td>
              <td>
                <th className="modal__leaderboard_headline">Кол-во ходов</th>
              </td>
              <td>
                <th className="modal__leaderboard_headline">Время</th>
              </td>
            </tr>
            <tr>
              <td>Лиза</td>
              <td>5</td>
              <td>20</td>
            </tr>
            <tr>
              <td>Коля</td>
              <td>10</td>
              <td>30</td>
            </tr>
            <tr>
              <td>Коля</td>
              <td>10</td>
              <td>30</td>
            </tr>
          </table> -->
          <button className="__button">Играть заново</button>
        </div>
      </div>
    </div>);
}
export default FinishModal;
