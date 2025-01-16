import { useState } from 'react';

import Counter from './Counter/Counter.jsx';
import BTSHeader from './BTSHeader.jsx';
import { log } from './log.js';
import './BehindTheScenesDemo.css';

function BehindTheScenesDemo() {
  log('<BehindTheScenesDemo /> rendered');

  const [enteredNumber, setEnteredNumber] = useState(0);
  const [chosenCount, setChosenCount] = useState(0);

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    setChosenCount(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <>
      <BTSHeader />
      <main>
        <section id="configure-counter">
          <h2>Set Counter</h2>
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>
        </section>
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default BehindTheScenesDemo;

