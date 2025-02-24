import { memo, useCallback, useMemo, useState } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from './../log.js';

function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const Counter = memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  /* isPrime() takes in the counter value set in the input. Eventhough this
  initialCount is not changed, this function is re-executed/re-computed
  everytime the Counter component re-executes. To prevent this, use useMemo().

  useMemo() memorizes the result of the computation so that it does not get
  recalculated on every render unless their dependencies change. */
  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

  const [counter, setCounter] = useState(initialCount);

  const handleDecrement = useCallback(function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
    // No dependencies needed as we are just using state updating function here.
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        {/* handleDecrement function is being passed as a prop and so can make
        use of useCallback() to prevent re-execution of the component, as we
        learnt functions in javascript are objects and eventhough there is no
        change with code, they are treated as new. This prevents Iconbuttons and
        Icon to re-execute again on clicking on increment / decrement buttons.*/}
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
});

export default Counter;
