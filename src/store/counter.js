// This is a Redux store using Redux toolkit.
// import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

// Preparing a slice of global state. Example: a slice for counter, a slice for authentication etc.
/* createSlice needs following properties:
    name -> User defined Identifier of the slice.
    initialState -> with all initial values of the state.
    reducers -> Object of all the reducers/methods/actions that are part of or needed by this slice.
      - Each method automatically receive the latest state and action as arguments.
      - These methods will be automatically be called and do not have to write
        the if checks for action type.
      - action argument is needed only when we have payload/data to deal with.
      - In these methods in the reducers map, we are allowed to mutate the state.
        For example: state.counter++ is allowed.
        Eventhough our code looks like we are trying to mutate the state object,
        we are doing it in an immutable way. How?
        Redux toolkit uses an internal package called imgur, which will detect
        code like this and automatically clones existing state, creates a
        new state object, keeps all the state which we're not editing and
        override the state which we are editing in an immutable way. i.e it is
        translating the code to immutable way.
    Returns a slice of state.
 */
const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      // Mutating the state object is allowed with Redux toolkit(Imgur - internal
      // package) which tranlsates this code to immutable way.
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      // Also accepting action parameter as we are dealing with payload/data.
      // Note that the default field name that redux uses for any extra data is payload.
      state.counter += action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// Creating another slice for Authentication.
const initialAuthState = { isAuthenticated: false };
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

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
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

/* Exporting action objects that are automatically created with unique
identifiers for each action by createSlice(). */
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

// Connecting React app to this Redux store.
/* How should we connect React and redux store? We export the store and
  provide it to the React app (import at the top most level in the component
  tree(App component), so that all the components in the app can subscribe to
  the store and receive updated store(state)).

  Note: We are importing this store in UsingReduxDemo component, so that this
  is applicable only for the child components of UsingReduxDemo.
  */
export default store;
