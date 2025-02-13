// This is a Redux store using Redux toolkit.
// import { createStore } from "redux";
import { createSlice } from "@reduxjs/toolkit";

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
export const authActions = authSlice.actions;

// We would need only reducer and merge in the index.js.
export default authSlice.reducer;
