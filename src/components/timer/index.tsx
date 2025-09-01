import React, { useState, useEffect } from "react";

interface StopwatchProps {
  isStartRunning: boolean;
}

const Stopwatch: React.FC<StopwatchProps> = ({ isStartRunning }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isStartRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isStartRunning]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
  };

  return <>{formatTime(time)}</>;
};

export default Stopwatch;
