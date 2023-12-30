import React, { useState, useRef } from 'react';
function Stopwatch() {
  const [time, setTime] = useState({ hours: 1, minutes: 10, seconds: 10 }); // Set initial time to 10 seconds
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (isActive) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          let { hours, minutes, seconds } = prevTime;
          if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            return prevTime;
          }
          if (seconds === 0) {
            if (minutes !== 0) {
              minutes--;
              seconds = 59;
            } else {
              hours--;
              minutes = 59;
              seconds = 59;
            }
          } else {
            seconds--;
          }
          return { hours, minutes, seconds };
        });
      }, 1000);
    }
    setIsActive(!isActive);
  };

  const clearStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setTime({ hours: 0, minutes: 0, seconds: 10 }); // Reset to 10 seconds when cleared
  };

  const formatTime = (timeUnit) => {
    return timeUnit < 10 ? `0${timeUnit}` : `${timeUnit}`;
  };

  return (
    <div className="stopwatch">
      <h1 id="display">
        {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
      </h1>
      <button className='start' onClick={startStopwatch}>{isActive ? 'Pause' : 'Start'}</button>
      <button className='clear' onClick={clearStopwatch}>Clear</button>
    </div>
  );
}

export default Stopwatch;
