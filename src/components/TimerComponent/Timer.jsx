import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveTime } from '../../features/resultSlice';
import './Timer.css';

function Timer({isStarted, resetTime, setResetTime}) {  
  const [seconds, setSeconds] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (resetTime) {
      setSeconds(0);
      setResetTime(false);
    }
  }, [resetTime, setResetTime]);

  useEffect(() => {
    if (isStarted) {
      let timer = setInterval(() => {
        setSeconds((prev) => prev += 1);
      }, 1000);
      dispatch(saveTime(seconds));
      
      return () => {
        clearInterval(timer);
      };
    }
  }, [isStarted, seconds]);

  return (
    <div className='timer'>
      <span className='timer-value'>  
        {Math.trunc(seconds / 60)}
      </span>
      <span className='timer-value'>:</span>
      <span className='timer-value'>      
        {seconds % 60}
      </span> 
    </div>
  );
}
export default Timer;
