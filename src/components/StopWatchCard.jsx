import React, { useEffect, useState } from 'react';
import style from '../styles/StopWatchCard.module.css';

function StopWatchCard() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [total, setTotal] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleChangeAdd = (info) => {
    if (info === "hour") setHour((prev) => (prev < 23 ? prev + 1 : 0));
    if (info === "minute") setMinute((prev) => (prev < 59 ? prev + 1 : 0));
    if (info === "second") setSecond((prev) => (prev < 59 ? prev + 1 : 0));
  };

  const handleChangeSub = (info) => {
    if (info === "hour") setHour((prev) => (prev > 0 ? prev - 1 : 0));
    if (info === "minute") setMinute((prev) => (prev > 0 ? prev - 1 : 0));
    if (info === "second") setSecond((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleSubmit = () => {
    const totalSeconds = hour * 3600 + minute * 60 + second;
    if (totalSeconds > 0) {
      setTotal(totalSeconds);
      setIsRunning(true);
    }
  };

  useEffect(() => {
    let intervalId;
    if (isRunning && total > 0) {
      intervalId = setInterval(() => {
        setTotal((prev) => prev - 1);
      }, 1000);
    }
    if (total === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, total]);

  const formatTime = (t) => {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className={style.container}>
      <div className={style.timerDisplay}>
        <p>{formatTime(total)}</p>
      </div>

      <div>
        <div className={style.labels}>
          <span>Hours</span>
          <span>Minutes</span>
          <span>Seconds</span>
        </div>

        <div className={style.timeInputs}>
          {["hour", "minute", "second"].map((unit) => (
            <div key={unit} className={style.timeUnit}>
              <img src="changeUp.png" onClick={() => handleChangeAdd(unit)} alt="up" />
              <br />
              <span>
                {
                  unit === "hour"
                    ? String(hour).padStart(2, '0')
                    : unit === "minute"
                    ? String(minute).padStart(2, '0')
                    : String(second).padStart(2, '0')
                }
              </span>
              
              <br />
              <img src="changeDown.png" onClick={() => handleChangeSub(unit)} alt="down" />
            </div>
          ))}
        </div>

        <div>
          <button
            className={style.startButton}
            onClick={handleSubmit}
            disabled={isRunning}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default StopWatchCard;
