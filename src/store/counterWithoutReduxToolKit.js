// This is a Redux store created with just using Redux. For Reduxtoolkit, refer to index.js / auth.js/counter.js

// Created another store with name "counter.js" which uses Redux toolkit for the same implementation below.
// Hence Renaming this to counterWithoutReduxToolKit.js. To use this file back,
// rename it to counter.js and the other file to a different name.
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

    /*
      Below code works. But
      * Note: We should never mutate/update the redux state directly.
      state.counter++; (Incrementing directly here is wrong.)
      return state;

      (OR)

      state.counter++;
      return {
        counter: state.counter,
      }

      Rather, should always return brand new objects each time by copying any
      nested arrays or objects if you have any and create new values.
      return {
        counter: state.counter + 1,
      }
     */
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
