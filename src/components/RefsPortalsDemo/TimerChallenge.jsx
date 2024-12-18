import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChalenge({ title, targetTime }) {
  // TargetTime is in secs. hence converting to ms.
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timer = useRef();
  // Creating a ref to access dialog in ResultModal component in Timerchallenge comp.
  const dialog = useRef();

  const timerIsActive = timeRemaining > 0 && timeRemaining < (targetTime * 1000);

  if (timeRemaining <=0 ) {
    // Clearing the interval once it is <=0.
    clearInterval(timer.current);
    // Show modal if timer expired.
    dialog.current.showModal();
  }

  function handleStart() {
    // targetTime is in seconds and setTimeout accepts millisecs.
    // setInterval runs the function for every 10millisecs.
    timer.current = setInterval(() => {
      // State gets updated every 10ms.
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
      // Opening ResultModal dialog using ref with built in showModal method.
    }, 10);
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStop() {
    // Show modal if timer expired.
    dialog.current.showModal();
    // clearInterval() available with js.
    clearInterval(timer.current);
  }
  
  return <>
   <ResultModal 
    ref={dialog} 
    remainingTime={timeRemaining} 
    targetTime={targetTime}
    onReset={handleReset}
    />
    <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>
      <p>
        <button onClick={timerIsActive ? handleStop : handleStart}>
          {timerIsActive ? 'Stop' : 'Start'} Challenge
        </button>
      </p>
      <p className={timerIsActive ? 'active' : undefined}>
        {timerIsActive ? 'Time is running' : 'Timer Inactive'}
      </p>
    </section>
  </>
}