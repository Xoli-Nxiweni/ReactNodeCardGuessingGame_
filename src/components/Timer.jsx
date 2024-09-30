import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const Timer = ({ timer, setTimer, setGameOver }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        setGameOver(true); // End game when timer hits zero
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [timer, setTimer, setGameOver]);

  // Format the timer as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <h3>Time: {formatTime(timer)}</h3>
    </div>
  );
}

export default Timer;
