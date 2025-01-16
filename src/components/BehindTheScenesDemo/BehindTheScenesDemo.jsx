import { useState } from 'react';

import Counter from './Counter/Counter.jsx';
import BTSHeader from './BTSHeader.jsx';
import { log } from './log.js';
import './BehindTheScenesDemo.css';
import ConfigureCounter from './Counter/ConfigureCounter.jsx';

function BehindTheScenesDemo() {
  log('<BehindTheScenesDemo /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  return (
    <>
      <BTSHeader />
      <main>
        <ConfigureCounter onSet={setChosenCount} />
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default BehindTheScenesDemo;

