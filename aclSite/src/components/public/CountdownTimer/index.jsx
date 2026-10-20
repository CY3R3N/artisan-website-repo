import React, { useState, useEffect } from "react";

import "../CountdownTimer/CountdownTimer.css";

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [targetDate]);

  function calculateTimeLeft(targetDate) {
    const now = new Date();
    const difference = new Date(targetDate) - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  return (
    <div className="countdown-timer">
      <div className="time-box">
        <span>{timeLeft.days}</span>
        <p>Days</p>
      </div>
      <div className="time-box">
        <span>{timeLeft.hours}</span>
        <p>Hours</p>
      </div>
      <div className="time-box">
        <span>{timeLeft.minutes}</span>
        <p>Mins</p>
      </div>
      <div className="time-box">
        <span>{timeLeft.seconds}</span>
        <p>Secs</p>
      </div>
    </div>
  );
}

export default CountdownTimer;
