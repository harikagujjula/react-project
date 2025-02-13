// File to merge all the slices.

// This is a Redux store using Redux toolkit.
// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import counterReducer from "./counter";

// Creating Redux store.
/* Using the counterSlice.reducer as the reducer.
  Since in this application we have only one slice, it might be easy to pass the
  reducer this way.

  const store = createStore(counterSlice.reducer);

  But if we have multiple slices, with multiple reducers and
  there can be only one reducer passed to the createStore(), We should either
  make use of combineReducers provided by Redux or configureStore() from @reduxjs/toolkit,
  that merges the all the reducers into one single reducer.

  configureStore() -> Creates a store like createStore() and makes merging multiple
    reducers into single one easier.
    Accepts configuration object with properties:
      reducer -> Can be single reducer (single slice) or an object with different
      reducers that will be merged into one.
 */
// const store = configureStore({
//   reducer: counterSlice.reducer,
// });
// Adding multiple slices to configureStore with multiple reducers instead of the above code.
const store = configureStore({
  // reducer will now be an Object of multiple reducers.
  reducer: { counter: counterReducer, auth: authReducer },
});

// Connecting React app to this Redux store.
/* How should we connect React and redux store? We export the store and
  provide it to the React app (import at the top most level in the component
  tree(App component), so that all the components in the app can subscribe to
  the store and receive updated store(state)).

  Note: We are importing this store in UsingReduxDemo component, so that this
  is applicable only for the child components of UsingReduxDemo.
  */
export default store;
