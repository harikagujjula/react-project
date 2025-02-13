import classes from "./URCounter.module.css";
/* useSelector() is used to fetch selected part of the store.

  There is also useStore() hook provided by react-redux that gives access to
  the whole store.
  */
// useDispatch() hook to dispatch actions.
import { useSelector, useDispatch } from "react-redux";
// Importing actions from counter.js.
import { counterActions } from "../../store/counter.js";

const URCounter = () => {
  /* We send a function to the useSelector() that receives state managed  by
    redux and returns the part of store that is needed. This function will be
    executed for us by React-redux. When a component uses this hook, react-redux
    will setup automatically a subscription to the Redux store for that
    component. So our component will be updated and will always receive the
    latest state from Redux each time the store is updated.

    If this component is unmounted from DOM, react-redux will automatically
    unsubscribe to the Store.

    Here all we have is single counter in the store, but we could have tone of
    different objects, arrays/nexted objects, multiple operations in the store.
  */
  // Getting the counter managed by Redux.
  // Updating the variables in state with respect to configureStore() => state.counter.counter
  const counter = useSelector((state) => state.counter.counter);
  // Getting showCounter managed by Redux.
  const showCounter = useSelector((state) => state.counter.showCounter);

  /* Using useDispatch() to dispatch actions.
     Accepts No arguments.
     Returns a function that dispatches an action against Redux store.
  */
  const dispatch = useDispatch();

  // Adding 2 functions for the buttons with dispatch.
  const incrementHandler = () => {
    // Dispatching an action on button click in the click handlers.
    // dispatch({ type: "increment" });

    // Using automatically created action object instead of above code
    // that is created for us by createSlice().
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const increaseBy5Handler = () => {
    // Dispatching an action with extra payload.
    dispatch(counterActions.increase(5));
    /* Redux toolkit creates action object automatically with somethinsg like:
     { type: SOME_UNIQUE_IDENTIFIER, payload }
      Note that the default field name that redux uses for any extra data is payload.
      */
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {/* Show/Hide based on showCounter state managed by Redux. */}
      {showCounter && <div className={classes.value}>{counter}</div>}
      {/* Adding Buttons to Dispatch actions. Note that the button counters here
       are just component specific in this code and we could make use of
       useState(). But assuming these are globally used and so we used Redux. */}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={increaseBy5Handler}>Increase By 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default URCounter;
