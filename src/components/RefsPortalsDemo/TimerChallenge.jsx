import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChalenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const timer = useRef();

  // Creating a ref to access dialog in ResultModal component in Timerchallenge comp.
  const dialog = useRef();

  function handleStart() {
    setTimerStarted(true);
    // targetTime is in seconds and setTimeout in js accepts millisecs.
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      // Opening ResultModal dialog using ref with built in showModal method.
      dialog.current.showModal();
    }, targetTime*1000);
  }

  function handleStop() {
    clearTimeout(timer.current);
  }
  return <>
    {timerExpired && <ResultModal ref={dialog} result="lost" targetTime={targetTime}/> }
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>
      <p>
        <button onClick={timerStarted ? handleStop : handleStart}>
          {timerStarted ? 'Stop' : 'Start'} Challenge
        </button>
      </p>
      <p className={timerStarted ? 'active' : undefined}>
        {timerStarted ? 'Time is running' : 'Timer Inactive'}
      </p>
    </section>
  </>
}