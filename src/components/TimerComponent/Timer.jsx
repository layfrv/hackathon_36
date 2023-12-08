import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveTime } from '../../features/resultSlice';
import './Timer.css';

function Timer({isStarted, minutes, seconds, setMinutes, setSeconds}) {  
  const dispatch = useDispatch();

  useEffect(() => {
    if (isStarted) {
      let timer = setInterval(() => {
        setSeconds((prev) => prev += 1);
        if (seconds === 59) {
          setMinutes((prev) => prev += 1);
          setSeconds(0);
        }
      }, 1000);
      dispatch(saveTime({minutes, seconds}));
      
      return () => {
        clearInterval(timer);
      };
    }
  }, [isStarted, seconds, minutes]);

  return (
    <div className='timer'>
      <span className='timer-value'>  
        {minutes}
      </span>
      <span className='timer-value'>:</span>
      <span className='timer-value'>      
        {seconds}
      </span> 
    </div>
  );
}
export default Timer;
