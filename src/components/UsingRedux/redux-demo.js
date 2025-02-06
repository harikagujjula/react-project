/**
 * node.js file demonstrating the basics of Redux.
 * To see the output of this file:
 * run: node src/components/UsingRedux/redux-demo.js
 */

// Import Redux.
const redux = require("redux");

/* Reducer function:
   - Receives old state(Ensure there should be default value, else will fail for
   first run), dispatched action as arguments.
   - Returns updated state.
   - Note: Reducer function is a pure function i.e for an input, should always
   return same output and should have no side-effects. There should not be any
   http requests or getting something from local storage etc to fetch data.
*/
const reducerCounter = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

/* Create store. It shows deprecated but, still works. We will be exploring
   usage of Redux toolkit to replace this later.
   Store receives Reducer function that is responsible for changing the state.
   */
const store = redux.createStore(reducerCounter);

// Defining subscribe function that is responsible to update the UI.
const counterSubscriber = () => {
  // Fetching the latest state.
  const latestState = store.getState();
  console.log(latestState);
};

// Letting Redux know about the subscribe function, so that it is executed when data changes.
// Note that, we are just pointing to the function but not executing it.
store.subscribe(counterSubscriber);

// Dispatch an action. Action is a javascript object with type property.
store.dispatch({ type: "increment" });
// Dispatching another action.
store.dispatch({ type: "decrement" });
