// This is a Redux store.
import { createStore } from "redux";

// Creating Reducer.
const counterReducer = (state = { counter: 0 }, action) => {
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

  if (action.type === "increase") {
    return {
      counter: state.counter + 5,
    };
  }

  return state;
};

// Creating Redux store.
const store = createStore(counterReducer);

// Connecting React app to this Redux store.
/* How should we connect React and redux store? We export the store and
  provide it to the React app (import at the top most level in the component
  tree(App component), so that all the components in the app can subscribe to
  the store and receive updated store(state)).

  Note: We are importing this store in UsingReduxDemo component, so that this
  is applicable only for the child components of UsingReduxDemo.
  */
export default store;
