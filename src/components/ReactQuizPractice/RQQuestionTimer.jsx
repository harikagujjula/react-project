import { useEffect, useState } from "react";

/**
 * Returns Progress bar for the question timer.
 */
export default function RQQuestionTimer( {timeout, onTimeOut, mode} ) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // Using useEffect() to prevent inifinte loop as this might execute everytime
  //  the state is changed by setInterval().
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Set Timeout");
      // On timeout, move to the next question.
      onTimeOut();
    }, timeout);

    return () => {
      clearTimeout(timer);
    }
  }, [timeout, onTimeOut]);

  // Setting interval for the progress bar. To prevent this infinite loop, we use useEffect().
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Set Interval");
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
    // No dependencies required.

    return () => {
      clearInterval(interval);
    }
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} className={mode}/>;
}
