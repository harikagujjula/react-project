// This is a Redux store.
import { createStore } from "redux";

const initialState = { counter: 0, showCounter: true };
// Creating Reducer.
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    /*
     * Note: We should always return complete object even though few
     * properties are unchanged, as Reducer do not automatically merge with the
     * previous state. Rather it replaces the whole Redux state/store object
     * with whatever is returned by an action.
     *
     * So, returning state.showCounter in increment, decrement, increase actions
     * is needed.
     */
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "increase") {
    return {
      counter: state.counter + 5,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "toggle") {
    return {
      showCounter: !state.showCounter,
      counter: state.counter,
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
