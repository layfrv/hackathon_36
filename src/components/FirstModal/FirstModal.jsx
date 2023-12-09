import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startGame } from '../../features/gameSlice';
import { saveName } from '../../features/userSlice';
import Button from '../Button';
import './FirstModal.css';

function FirstModal({closeModal, isOpen}) {  
  const dispatch = useDispatch();
  const [nameValue, setNameValue] = useState();
  const changeNameValue = (e) => {
    setNameValue(e.target.value); 
  };
  
  const saveAndCloseHandler = () => {
    if (nameValue.trim().length > 0) {
      dispatch(saveName(nameValue));
      closeModal();
      dispatch(startGame());
    }
  };

  const modalRef = useRef(null);
  const modalWrapperRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      if (modalWrapperRef.current) {
        modalWrapperRef.current.classList.add('wrapper-show');
      }
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.classList.add('opened-modal');
        }
      }, 500);
    }
  }, [isOpen, closeModal]);

  return (
    <div ref={modalWrapperRef} className='modal-wrapper'>
      <div ref={modalRef} className='first-modal'>
        <h2>Приветствуем в игре Найди друга :)</h2>
        <div className='first-modal__input-wrapper'>
          <p>Как тебя зовут?</p>
          <input value={nameValue} onChange={changeNameValue} placeholder='Введи свое имя' className='first-modal__input' type='text'></input>
        </div>
        <Button label='Сохранить и начать игру!' onClick={saveAndCloseHandler}/>
      </div>
    </div>
  );
}

export default FirstModal;
