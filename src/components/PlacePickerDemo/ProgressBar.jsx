/* Making use of new component for Progress bar as a separate component. Why?
 Since we are updating the state (interval) for every 10 ms, checking if the
 useEffect() should be executed eachtime, And also re-rendering the
 PPDeleteConfirmation component everytime. This is not a good practice as it
 might lead to performance issues. Hence, we are moving the Progress bar to a
 separate component, so that not all the PPDeleteConfirmation component is
 re-rendered everytime. */
import { useEffect, useState } from 'react';

export default function ProgressBar({ timer }) {
  // Setting a state to keep track of the remaining time.
  const [remainingTime, setRemainingTime] = useState(timer);

  // Wrapping the setInterval() inside useEffect() to avoid infinite loop.
  useEffect(() => {
    // Defines a browser function that will be executed for every given interval.
    const interval = setInterval(() => {
      console.log('Interval');
      // Updating the Remaining time by subtracting 10ms.
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    // Also stopping the interval once modal is closed or interval reaches max.
    return () => {
      // Browser function to clear the interval.
      clearInterval(interval);
    }
  }, []);

  return (
    <>
      {/* Built in progress element. */}
      <progress value={remainingTime} max={timer}/>
    </>
  );
}
